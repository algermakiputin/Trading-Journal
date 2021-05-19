<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Trade; 
use Illuminate\Support\Facades\DB; 

class TradesController extends Controller
{
    
    public function positions(Trade $trade) {

        $position = [];
        $trades = DB::table('trades')
                        ->where('trades.status', 0) 
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
            $total_cost += $total_shares * $trade->purchase_price + $this->calculateBuyingFees($total_shares, $trade->purchase_price); //Need to get fees of transaction $trade->fees; 
        
        }
 
        $ave_price = ($total_cost / $total_shares);

        return array(
            'ave_price' => $ave_price,
            'total_cost' => $total_cost,
            'total_shares' => $total_shares,
            'stock_code' => $trades[0]->stock_code
        );
    }

    public function getClosedTrades() {

        $closedTrades = Trade::where('status','=', 1)  
                                ->orderBy('date','DESC')
                                ->orderBy('id', 'DESC')
                                ->get();
        $data = [];
        
        foreach ( $closedTrades as $trade ) {

            $transaction = $this->getTradeTransactions($trade->id);
            $avgSellPrice = $transaction->total_price / $transaction->total_records;
            $avgSell = $this->calculateAvgSellPrice( $avgSellPrice, $trade->shares, $transaction->total_fees );
            $avgBuy = $this->calculateAvgBuyPrice( $trade->purchase_price, $trade->shares );
            
            $total_buying_cost = $avgBuy * $trade->shares;
            $total_selling_cost = $avgSell * $trade->shares;
            $gain_loss_percentage = $this->calculateGainLoss($total_buying_cost, $total_selling_cost);
            $profit_loss = $this->calculateProfitLoss($total_buying_cost, $total_selling_cost);
            $result = $gain_loss_percentage >= 0 ? 'win' : 'loss';

            $data[] = array(
                'date' => $trade->date,
                'stock_code' => $trade->stock_code,
                'avg_buy' => number_format($avgBuy,4),
                'avg_sell' => number_format($avgSell,4),
                'side' => 'Long',
                'result' => $result,
                'profit_loss' => number_format($profit_loss,2),
                'gain_loss_percentage' => number_format($gain_loss_percentage,2) . '%',
                'action' => ''
            );
        }  

        return $data;
        
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

    public function getTotalTradesTaken() {

        return Trade::where('status', 1)->count();
    }

    public function calculateAvgSellPrice( $price, $shares, $fees) {
 
        $avegSellingPrice = ($price * $shares) + $fees;
        
        return $avegSellingPrice / $shares;
    } 

    public function calculateAvgBuyPrice( $price, $shares ) {

        $fees = $this->calculateBuyingFees( $shares, $price );
        $avgPrice = $price * $shares + $fees;

        return $avgPrice / $shares;
        
    }

    public function calculateGainLoss( $totalBuy, $totalSold ) {

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

        return $fees = $commission + $vat + $trans_fee + $sccp;
      
    }
}
