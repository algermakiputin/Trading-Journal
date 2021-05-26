<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\Trade;
use App\Models\Equity;
use App\Models\TradeResult;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\TradesController;

class TransactionsController extends Controller
{ 

    public function index()
    {
        //
    }

    public function datatable(Request $request) {

        $page = $request->page; 
        $recordsPerPage = $request->recordsPerPage;
        $offset = $page * $recordsPerPage - $recordsPerPage;
        $totalRecords = Transaction::count();
        $transactions = Transaction::offset($offset)
                                    ->limit($recordsPerPage)
                                    ->orderBy('date', 'desc')
                                    ->orderBy('id', 'desc')
                                    ->get();
        //calculate avg buy amount
        foreach ( $transactions as $transaction) {

            $total = $transaction->price * $transaction->shares + $transaction->fees;
            $transaction->price = number_format($total / $transaction->shares,4);
        }

        return array(
            'total_records' => $totalRecords,
            'transactions' => $transactions
        );
    }

    public function storeTrade($request) {

        return Trade::create([
            'shares' => $request['data']['shares'],
            'status' => 0,
            'stock_code' => $request['data']['stock_code'],
            'purchase_date' => $request['data']['date'],
            'sell_date' => 0,
            'purchase_price' => $request['data']['price'],
            'sold' => 0,
            'profile_id' => session('profile_id')
        ]);
    }
 
    public function store(Request $request)
    {

        DB::beginTransaction(); 

        try {

            $remainingCash = $request['availableCash'] - $request['data']['net'];
            $totalEquity = $request['totalEquity'];

            $trade = $this->storeTrade($request);

            Transaction::create([
                'date' => $request['data']['date'],
                'stock_code' => $request['data']['stock_code'],
                'price' => $request['data']['price'],
                'shares' => $request['data']['shares'],
                'fees' => $request['data']['fees'],
                'net' => $request['data']['net'],
                'trade_id' => $trade->id,
                'type' => 'long',
                'profile_id' => session('profile_id')
            ]);
                
            Equity::create([
                'date' => $request['data']['date'],
                'total_equity' => $totalEquity,
                'remaining_cash' => $remainingCash,
                'action' => 'buy',
                'action_reference_id' => $trade->id,
                'profile_id' => session('profile_id')
            ]);

            DB::commit();
            return 1;

        } catch ( \Exception $e ) {

            DB::rollback();
            throw $e;
            return 0;
        }

        return;
    }

    public function sell(Request $request) {
        
        $shares = $request->shares; 
        $trades = Trade::orderBy('id', 'DESC')
                ->where([
                    'stock_code' => $request->stock_code,
                    'status' => 0
                ]) 
                ->get();
                
        foreach ( $trades as $trade ) { 
            
            // If shares to sell is greather than the trade shares
            if ( $shares > $trade->shares) {
 
                $this->storeSell($request, $trade);
                $shares -= $trade->shares; 
                
            // Else if shares is lesser or equal to current trade shares, no need to update other trades
            // and exit the loop
            }else if ( $shares <= $trade->shares ) {
              
                $this->storeSell($request, $trade); 
                return;
                
            } 
        }  
    }

    public function updateTotalEquity($sellNetAmount, $buyNetAmount, $net, $totalEquity) {

        if ( $sellNetAmount < $buyNetAmount) 
            return $totalEquity = $totalEquity + ( $net - $buyNetAmount );
        
        return $totalEquity = $totalEquity - ( $buyNetAmount - $net );
        
    }

    public function storeSell($request, $trade) {
        
        try {
            DB::beginTransaction(); 

            $totalSold = $trade->sold + $request->shares; 
            $buyNetAmount = $this->calculateNetBuyingAmount($request->shares, $trade->purchase_price); 
            $sellNetAmount = $request->net;
            $availableCash = $request->availableCash + $request->net; 
            $status = 0;
            $totalEquity = $this->updateTotalEquity( $sellNetAmount, $buyNetAmount, $request->net, $request->totalEquity );
         
            if ( $totalSold == $trade->shares )
                $status = 1;

            Trade::where('id', $trade->id)
                    ->update([
                        'status' => $status,
                        'sold' => $totalSold,
                        'sell_date' => $request->date,
                        'profile_id' => session('profile_id')
                    ]);

            $transaction = Transaction::create([
                'date' => $request->date,
                'stock_code' => $request->stock_code,
                'price' => $request->price,
                'shares' => $request->shares,
                'fees' => $request->fees,
                'net' => $request->net,
                'trade_id' => $trade->id, 
                'type' => 'sell',
                'profile_id' => session('profile_id')
            ]); 

            Equity::create([
                'date' => $request->date,
                'total_equity' => $totalEquity,
                'remaining_cash' => $availableCash,
                'action' => 'sell',
                'action_reference_id' => $trade->id,
                'profile_id' => session('profile_id')
            ]);

            //Update Trade Result ( Win or Loss )
            if ( $status == 1) {

                $result = $this->getResult($trade->id);
                $win = $result['gainLossAmount'] > 0 ? 1 : 0;

                TradeResult::create([
                    'win' => $win,
                    'gain_loss_percentage' => $result['gainLossPercentage'],
                    'gain_loss_amount' => $result['gainLossAmount'],
                    'trade_id' => $trade->id,
                    'profile_id' => session('profile_id')
                ]);
            }
                
            DB::commit();
 
        } catch (\Exception $e) {
            //throw $th;
            DB::rollback(); 
            throw $e;
        }
    } 

    public function getResult( $trade_id ) {
 
        $tradesController = new TradesController();
        $trade = DB::table('trades')->find($trade_id);
        
        $transaction = $tradesController->getTradeTransactions($trade_id);
        $avgSellPrice = $transaction->total_price / $transaction->total_records;
        $avgSell = $tradesController->calculateAvgSellPrice( $avgSellPrice, $trade->shares, $transaction->total_fees );
        $avgBuy = $tradesController->calculateAvgBuyPrice( $trade->purchase_price, $trade->shares );
        
        $total_buying_cost = $avgBuy * $trade->shares;
        $total_selling_cost = $avgSell * $trade->shares;
        
        $gainLossAmount = $tradesController->calculateProfitLoss($total_buying_cost, $total_selling_cost);
        $gainLossPercentage = $tradesController->calculateGainLossPercentage($total_buying_cost, $total_selling_cost);
        
        return array(
            'gainLossAmount' => $gainLossAmount,
            'gainLossPercentage' => $gainLossPercentage
        );
    } 
 
    public function show($id)
    {
        //
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

    public function calculateNetBuyingAmount( $shares, $price ) {

        return $netBuyAmount = ( $shares * $price ) + $this->calculateBuyingFees($shares, $price);
    } 

 
    public function update(Request $request, $id)
    {
        //
    }

  
    public function destroy($id)
    {
        //
    }

    public function fetch_all() {

        return null;
    }
}
