<?php

namespace App\Http\Controllers;

use App\Http\Controllers\EquitiesController;
use Illuminate\Http\Request;
use App\Models\Trade; 
use App\Models\TradeResult; 
use Illuminate\Support\Facades\DB; 
use Session;

class TradesController extends Controller
{
    
    public function positions(Trade $trade) {

        $position = [];
        $trades = DB::table('trades')
                    ->where('profile_id', '=', session('profile_id'))
                    ->where('trades.status', 0) 
                    ->orderBy('id', 'DESC')
                    ->get();
   
        $trades = $this->group_trades( $trades );
        

        foreach ( $trades as $key => $trade ) {

            $position[] = $this->calculate_position($trade);
        }

        return (array) $position;

    }

    public function group_trades( $trades ) {

        $data = [];

        foreach ( $trades as $trade ) {

            $data[$trade->stock_code][] = $trade;
        } 

        return $data;
    }

    public function calculate_position( $trades ) {

        $row = [];

        $ave_price = 0;
        $total_cost = 0;
        $total_shares = 0;  
  
        foreach ( $trades as $trade ) {
           
            $total_shares += $trade->shares - $trade->sold; 
            $fees = $this->calculateBuyingFees($total_shares, $trade->purchase_price);
            $total_cost += $trade->shares * $trade->purchase_price + $fees; //Need to get fees of transaction $trade->fees; 
         
        }
 
        $ave_price = ($total_cost / $total_shares);
       
        return array(
            'ave_price' => $ave_price,
            'total_cost' => $total_cost,
            'total_shares' => $total_shares,
            'stock_code' => $trades[0]->stock_code
        );
    }

    public function getClosedTrades(Request $request) { 

        $page = $request->page; 
        $recordsPerPage = $request->recordsPerPage;
        $offset = $page * $recordsPerPage - $recordsPerPage;

        $closedTrades = Trade::where('status','=', 1)  
                            ->where('profile_id', '=', session('profile_id'))
                            ->offset($offset)
                            ->limit($recordsPerPage)
                            ->orderBy('purchase_date','DESC')
                            ->orderBy('id', 'DESC')
                            ->get();
        $totalRecords = Trade::where('status', 1) 
                                ->where('profile_id', session('profile_id'))
                                ->count();

        $data = [];
        
        foreach ( $closedTrades as $trade ) {

            $transaction = $this->getTradeTransactions($trade->id);
        
            $avgSellPrice = $transaction->total_price / $transaction->total_records;
            $avgSell = $this->calculateAvgSellPrice( $avgSellPrice, $trade->shares, $transaction->total_fees );
            $avgBuy = $this->calculateAvgBuyPrice( $trade->purchase_price, $trade->shares );
       
            $total_buying_cost = $avgBuy * $trade->shares;
            $total_selling_cost = $avgSell * $trade->shares;
            $gain_loss_percentage = $this->calculateGainLossPercentage($total_buying_cost, $total_selling_cost);
            $profit_loss = $this->calculateProfitLoss($total_buying_cost, $total_selling_cost);
            $result = $gain_loss_percentage >= 0 ? 'win' : 'loss';

            $data[] = array(
                'date' => $trade->purchase_date,
                'stock_code' => $trade->stock_code,
                'avg_buy' => number_format($avgBuy,4),
                'avg_sell' => number_format($avgSell,4),
                'side' => 'Long',
                'result' => $result,
                'profit_loss' => number_format($profit_loss,2),
                'gain_loss_percentage' => number_format($gain_loss_percentage,2) . '%' 
            );
        }  

        return array(
            'trades' => $data,
            'totalRecords' => $totalRecords
        );
        
    } 

    public function getTopGainers() {

        $trades = DB::table('trade_results')
                    ->join('trades', 'trades.id', '=', 'trade_results.trade_id')
                    ->select(
                            DB::raw('SUM(trade_results.gain_loss_percentage) as gain_loss_percentaige'), 
                            DB::raw('SUM(trade_results.gain_loss_amount) as Gain'), 
                            'trades.stock_code'
                            )
                    ->where('trade_results.win', '=', '1')
                    ->where('trade_results.profile_id', '=', session('profile_id'))
                    ->orderBy('gain_loss_percentage', 'ASC')
                    ->groupBy('trades.stock_code')
                    ->limit(5)
                    ->get();
        return $trades;
    }
    
    public function getTopLosers() {

        $topLosers = DB::table('trade_results')
                    ->join('trades', 'trades.id', '=', 'trade_results.trade_id')
                    ->select(
                        DB::raw('SUM(trade_results.gain_loss_percentage) as gain_loss_percentage'),
                        DB::raw('SUM(trade_results.gain_loss_amount)  as Loss'), 
                        'trades.stock_code')
                    ->where('trade_results.win', '=', '0') 
                    ->groupBy('trades.stock_code')
                    ->orderBy('gain_loss_percentage', 'DESC')
                    ->limit(5)
                    ->get();

        foreach ( $topLosers as $loser) {

            $loser->Loss = $loser->Loss * -1;
        }

        return $topLosers;
    }

    public function getTradeTransactions( $trade_id ) {

        return $transaction = DB::table('transactions')
                                ->select(
                                    DB::raw('SUM(price) as total_price'),
                                    DB::raw('COUNT(id) as total_records'),
                                    DB::raw('SUM(fees) as total_fees')
                                )
                                ->where('trade_id', '=', $trade_id)
                                ->where('type','=','sell')
                                ->first();
    }

    public function calculateProfitLoss( $buyPrice, $sellPrice ) {

        return $sellPrice - $buyPrice;
    }

    public function calculateAvgSellPrice( $price, $shares, $fees) {
 
        $sellAmount = ($price * $shares) - $fees;
        $avgSell = $sellAmount / $shares; 
        
        return $avgSell;
    } 

    public function calculateAvgBuyPrice( $price, $shares ) {
        
        $fees = $this->calculateBuyingFees( $shares, $price );  
      
        $avgPrice = $price * $shares + $fees;

        return $avgPrice / $shares;
        
    }

    public function calculateGainLossPercentage( $totalBuy, $totalSold ) {

        $percentageGain = ($totalSold - $totalBuy) / $totalBuy;
        return $percentageGain * 100;
    }

    public function calculateBuyingFees( $shares, $price ) {
    
        // BUYING FEES CALCULATION
        // Commission = ( TOTAL SHARES * PRICE ) * .25% 
        // VAT = Commission * 12%
        // PSE Trans Fee = ( TOTAL SHARES * PRICE ) * 0.005%
        // SCCP = ( TOTAL SHARES * PRICE ) * 0.01%
        
        $commission = ( $shares * $price ) * 0.0025;
        $vat = $commission * 0.12;
        $trans_fee = ( $shares * $price ) * 0.00005;
        $sccp = ( $shares * $price ) * 0.0001; 
        $fees = $commission + $vat + $trans_fee + $sccp;
        
        return $fees; 
      
    }

    public function getAccountPerformanceSummary() {

        $today = date('Y-m-d');
        $pastMonth = date('Y-m-d', strtotime('-30 days'));
        $totalTradesTaken = $this->getTotalTradesTaken($pastMonth, $today);
        $winningPercentage = $this->getWinningPercentage($pastMonth, $today) * 100;
        $averageWins = $this->calculateAverageGain($pastMonth, $today);
        $averageLosses = $this->calculateAverageLosses($pastMonth, $today);
        $winLossRatio = $this->getWinLossRatio($pastMonth, $today);
        $appt = $this->calculateAverageProfitabilityPerTrade($pastMonth, $today);

        return array(
            'totalTrades' => $totalTradesTaken,
            'winningPercentage' => $winningPercentage,
            'averageWins' => $averageWins,
            'averageLosses' => $averageLosses,
            'winLossRatio' => $winLossRatio,
            'adjustedWinLossRatio' => number_format($appt,2)
        );

    }

    public function calculateAverageProfitabilityPerTrade($startingDate, $endingDate) {
 
        $lossingProbability = $this->getLossingPercentage($startingDate, $endingDate); 
        $winnningProbability = $this->getWinningPercentage($startingDate, $endingDate);
        $averageWinAmount = $this->getAverageWinAmount($startingDate, $endingDate);
        $averageLossAmount = $this->getAverageLossAmount($startingDate, $endingDate);
     
        return ( $winnningProbability * $averageWinAmount) - ( $lossingProbability * $averageLossAmount );
    }

    public function getAverageWinAmount($startingDate, $endingDate) {

        $winTrades = DB::table('trades')
                        ->join('trade_results', 'trade_results.trade_id', '=', 'trades.id')
                        ->select(
                            DB::raw('SUM(trade_results.gain_loss_amount) as total'),
                            DB::raw('COUNT(trades.id) as total_rows'),
                        )
                        ->where('trade_results.win', '=', 1)
                        ->whereDate('trades.purchase_date', '>=', $startingDate)
                        ->whereDate('trades.purchase_date', '<=', $endingDate)
                        ->first();
        
        if ( $winTrades->total && $winTrades->total_rows )
            return $winTrades->total / $winTrades->total_rows;
    }

    public function getAverageLossAmount($startingDate, $endingDate) {

        $lossTrades = DB::table('trades')
                        ->join('trade_results', 'trade_results.trade_id', '=', 'trades.id')
                        ->select(
                            DB::raw('SUM(trade_results.gain_loss_amount) as total'),
                            DB::raw('COUNT(trades.id) as total_rows'),
                        )
                        ->where('trade_results.win', '=', 0)
                        ->whereDate('trades.purchase_date', '>=', $startingDate)
                        ->whereDate('trades.purchase_date', '<=', $endingDate)
                        ->first();
    
        if ( $lossTrades->total && $lossTrades->total_rows )
            return $lossTrades->total / $lossTrades->total_rows;
        
        return 0;
    }

    public function getTotalTradesTaken($startingDate, $endingDate) {

        return Trade::where('status', '=' , 1) 
                    ->where('profile_id', '=', session('profile_id'))
                    ->whereDate('created_at', '>=', $startingDate)
                    ->whereDate('created_at', '<=', $endingDate)
                    ->count();
    }

    public function getTotalLossTrades( $startingDate, $endingDate) {

        return TradeResult::where('win', '=', 0)
                        ->where('profile_id', '=', session('profile_id'))
                        ->whereDate('created_at', '>=', $startingDate)
                        ->whereDate('created_at', '<=', $endingDate)
                        ->count();
    }

    public function getTotalWinTrades( $startingDate, $endingDate ) { 

        return TradeResult::where('win', '=', 1)
                        ->where('profile_id', '=', session('profile_id'))
                        ->whereDate('created_at', '>=', $startingDate)
                        ->whereDate('created_at', '<=', $endingDate)
                        ->count();
    }

    //calculate trade winning percentage
    public function getWinningPercentage($startingDate, $endingDate) {

        $totalTrades = $this->getTotalTradesTaken($startingDate, $endingDate); 
        $winTrades = $this->getTotalWinTrades($startingDate, $endingDate);  
   
        if ( $totalTrades && $winTrades)
            return $winTrades / $totalTrades;

        return 0;
    }

    public function getLossingPercentage($startingDate, $endingDate) {

        $totalTrades = $this->getTotalTradesTaken($startingDate, $endingDate); 
        $losses = $this->getTotalLossTrades($startingDate, $endingDate); 

        if ( $totalTrades && $losses)
            return $losses / $totalTrades;

        return 0;
    }

    public function getWinLossRatio($startingDate, $endingDate) {

        $wins = $this->getTotalWinTrades($startingDate, $endingDate);
        $losses = $this->getTotalLossTrades($startingDate, $endingDate);
      
        if ( $wins && $losses)
            return $wins / $losses;
        
        return 0;
    }

    public function calculateAverageGain($startingDate, $endingDate ) {
        
        $gains = TradeResult::select(
                                DB::raw('SUM(gain_loss_percentage) as totalGains'), 
                                DB::raw('count(id) as numRows') 
                            )
                            ->where('win', '=', 1)  
                            ->where('profile_id', '=', session('profile_id'))
                            ->whereDate('created_at', '>=', $startingDate)
                            ->whereDate('created_at', '<=', $endingDate)
                            ->first(); 
        
        if ( $gains->totalGains )
            return number_format($gains->totalGains / $gains->numRows,2);
        
        return 0;

    }

    public function calculateAverageLosses($startingDate, $endingDate) {
 
        $trades = TradeResult::select(
                                    DB::raw('SUM(gain_loss_percentage) as totalGains'), 
                                    DB::raw('count(id) as numRows'))
                            ->where('win', '=', 0)
                            ->where('profile_id', '=', session('profile_id'))
                            ->whereDate('created_at', '>=', $startingDate)
                            ->whereDate('created_at', '<=', $endingDate)
                            ->first();
        
        if ( $trades->totalGains)
            return number_format($trades->totalGains / $trades->numRows,2);  
            
        return 0;
    }

    public function calculateAdjustedWinLossRatio() {

        //Average Gain * % Of winning Trades / average loss * % of losing Trades

        $averageGain = $this->calculateAverageGain();

    }

    public function tradeSummary() {
        $pastYear = date('Y-m-d', strtotime('-12 months'));
        $today = date('Y-m-d');
        $equitiesController = new EquitiesController();
        $netPL = $equitiesController->profitLoss($pastYear, $today);
        $averageGain = $this->calculateAverageGain($pastYear, $today);
        $averageLoss = $this->calculateAverageLosses($pastYear, $today);
        $winLossRatio = $this->getWinLossRatio($pastYear, $today);

        return array(
            'netPL' => number_format($netPL['amount'],2),
            'averageGain' => $averageGain . '%',
            'averageLoss' => $averageLoss . '%',
            'winLossRatio' => $winLossRatio
        );
    }



    public function monthlyTracker() {

        $pastYear = date('Y-m-d', strtotime('-12 months'));
        $today = date('Y-m-d');
        $trades = $this->getTradesByMonth($pastYear, $today); 
        $startingDate = new \DateTime($pastYear);
        $endingDate = new \DateTime($today);
        $data = []; 

        for ( $start = $startingDate; $start <= $endingDate; $start->modify('+1 month')) {

            $summary = array(
                'avgGain' => 0,
                'avgLoss' => 0,
                'totalTrades' => 0,
                'winPercentage' => 0,
                'largestGain' => 0,
                'largestLoss' => 0,
                'winHoldingDays' => 0,
                'lossHoldingDays' => 0
            );

            foreach ( $trades as $key => $trade ) {
                
                $tradeDate = $key;  
                $tradeCount = count($trade);  
                if ( $tradeDate === $start->format('Y-m')) {
                     
                    $summary['avgGain'] = number_format($this->averageGain($trade),2) . '%';
                    $summary['avgLoss'] = number_format($this->averageLoss($trade),2) . '%';
                    $summary['totalTrades'] = $tradeCount;
                    $summary['winPercentage'] = number_format($this->winPercenrage($trade),2) . '%'; 
                    $summary['largestGain'] = number_format($this->largestGain($trade),2) . '%';
                    $summary['largestLoss'] = number_format($this->largestLoss($trade) ,2) . '%';
                    $summary['winHoldingDays'] = $this->getWinHoldingDays($trade);
                    $summary['lossHoldingDays'] = $this->getLossHoldingDays($trade); 
                    continue;
                }

            }

            $data[$start->format('F, Y')] = $summary;
        }

        return array_reverse($data);
    }  

    private function getWinHoldingDays($trades) {
    
        if ( $trades ) {

            $winTrades = $this->winTrades($trades); 
            $days = 0; 
            $totalTrades = count($winTrades);

            foreach ( $winTrades as $trade ) {
              
                $days += $this->getDaysDifference( $trade->purchase_date, $trade->sell_date);
             
            }
        
            return $days > 1 ? $days / $totalTrades : $days;
        }

        return 0;
        
    }

    public function getDaysDifference($date1, $date2) {

        $startingDate = new \DateTime( $date1 );
        $endingDate = new \DateTime( $date2 );
        $dateDifference = $startingDate->diff($endingDate); 
        $days = $dateDifference->d;
        return  $days == 0 ? 1 : $days;

    }
    private function getLossHoldingDays($trades) {

        if ( $trades ) {
            
            $lossTrades = $this->lossTrades($trades);
            $days = 0;
            $totalTrades = count($lossTrades);

            foreach ( $lossTrades as $trade ) {
              
                $days += $this->getDaysDifference( $trade->purchase_date, $trade->sell_date);

            }
         
            return $days > 1 ? $days / $totalTrades : $days;
        }

        return 0;
        
    }

    public function winTrades($trades) {

        $wins = [];
        foreach ( $trades as $trade) {

            if ( $trade->win )
                array_push($wins, $trade);
        }

        return $wins;
    }

    public function lossTrades($trades) {

        $losses = [];
        foreach ( $trades as $trade) {

            if ( !$trade->win )
                array_push($losses, $trade);
        }

        return $losses;
    }

    private function winPercenrage($trade) {

        $winTrades = count($this->winTrades($trade));
        $totalTrades = count($trade);

        return $winTrades / $totalTrades * 100;
    }

    public function largestGain($trade) {
      
        if ( $trade ) { 
            $gains = array_column($trade,'gain_loss_percentage');
            return max($gains);
        }

        
    }

    public function largestLoss($trade) {

        if ( $trade ) {

            $gains = array_column($trade,'gain_loss_percentage');
            return min($gains);
        }

        return 0;
    } 

    public function averageGain($trades) {
       
        $wins = 0;
        $totalTrades = 0; 
        foreach ( $trades as $trade ) {

            if ( $trade->win ) {

                $wins += $trade->gain_loss_percentage;
                $totalTrades++;
            }
        }

        return $wins / $totalTrades;
    }

    public function averageLoss($trades) {

        if ( $trades ) {

            $losses = 0;
            $totalTrades = 0;
    
            foreach ( $trades as $trade ) {

                if ( !$trade->win ) {

                    $losses += $trade->gain_loss_percentage;
                    $totalTrades++;
                }
            }

            if ( $losses && $totalTrades )
                return $losses / $totalTrades; 
            
        } 

        return 1;
    }

    //This function will accept 2 parameters starting date and ending date and will return monthly trades
    // base on passed date periods
    public function getTradesByMonth($startingDate, $endingDate) {

        $data = [];
        $trades = DB::table('trades')
                    ->join('trade_results', 'trade_results.trade_id', '=', 'trades.id')
                    ->select(
                        'trades.stock_code', 
                        'trades.purchase_date',
                        'trades.sell_date',
                        'trade_results.win', 
                        'trade_results.gain_loss_percentage', 
                        'trade_results.gain_loss_amount'
                    )
                    ->where('trades.status', '=', 1)
                    ->where('trades.profile_id', '=', session('profile_id'))
                    ->whereDate('trades.purchase_date', '>=', $startingDate)
                    ->whereDate('trades.purchase_date', '<=', $endingDate)
                    ->get();
                    
        foreach ( $trades as $trade ) {

            $data[date('Y-m', strtotime($trade->purchase_date))][] = $trade;
        }
        
        return $data;
    }
}
