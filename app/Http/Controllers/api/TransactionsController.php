<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\Trade;
use App\Models\Equity;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\TradesController;

class TransactionsController extends Controller
{ 

    public function index()
    {
        //
    }

    public function datatable() {

        return Transaction::all();
    }

    public function storeTrade($request) {

        return Trade::create([
            'shares' => $request['data']['shares'],
            'status' => 0,
            'stock_code' => $request['data']['stock_code'],
            'date' => $request['data']['date'],
            'purchase_price' => $request['data']['price'],
            'sold' => 0,
            'win' => 0
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
                'type' => 'long'
            ]);

            Equity::create([
                'date' => $request['data']['date'],
                'total_equity' => $totalEquity,
                'remaining_cash' => $remainingCash,
                'action' => 'buy',
                'action_reference_id' => $trade->id
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

    public function storeSell($request, $trade) {
        
        try {
            DB::beginTransaction(); 

            $totalSold = $trade->sold + $request->shares; 
            $buyNetAmount = $this->calculateNetBuyingAmount($request->shares, $trade->purchase_price); 
            $sellNetAmount = $request->net;
            $availableCash = $request->availableCash + $request->net; 
            $status = 0;
        
            if ( $sellNetAmount < $buyNetAmount) { 
                
                $totalEquity = $request->totalEquity + ( $request->net - $buyNetAmount );
            
            }else { 
                $totalEquity = $request->totalEquity - ( $buyNetAmount - $request->net );
            
            }   

            if ( $totalSold == $trade->shares )
                $status = 1;

            Trade::where('id', $trade->id)
                            ->update([
                                'status' => $status,
                                'sold' => $totalSold
                            ]);

            $transaction = Transaction::create([
                'date' => $request->date,
                'stock_code' => $request->stock_code,
                'price' => $request->price,
                'shares' => $request->shares,
                'fees' => $request->fees,
                'net' => $request->net,
                'trade_id' => $trade->id, 
                'type' => 'sell'
            ]); 

            Equity::create([
                'date' => $request->date,
                'total_equity' => $totalEquity,
                'remaining_cash' => $availableCash,
                'action' => 'sell',
                'action_reference_id' => $trade->id
            ]);

            //Update Trade Result ( Win or Loss )

            if ( $status == 1) {

                Trade::where('id', $trade->id)
                            ->update([
                                'win' => $this->getResult( $trade->id)
                            ]);
            }
                

            DB::commit();
 
        } catch (\Exception $e) {
            //throw $th;
            DB::rollback(); 
            throw $e;
        }
    } 

    public function getResult( $trade_id = 7 ) {
 
        $tradesController = new TradesController();
        $trade = DB::table('trades')->find($trade_id);
        
        $transaction = $tradesController->getTradeTransactions($trade_id);
        $avgSellPrice = $transaction->total_price / $transaction->total_records;
        $avgSell = $tradesController->calculateAvgSellPrice( $avgSellPrice, $trade->shares, $transaction->total_fees );
        $avgBuy = $tradesController->calculateAvgBuyPrice( $trade->purchase_price, $trade->shares );
        
        $total_buying_cost = $avgBuy * $trade->shares;
        $total_selling_cost = $avgSell * $trade->shares;
        
        $result = $tradesController->calculateProfitLoss($total_buying_cost, $total_selling_cost);
    
        return $result > 0 ? 1 : 0;
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
