<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\Trade;
use App\Models\Equity;
use Illuminate\Support\Facades\DB;

class TransactionsController extends Controller
{ 

    public function index()
    {
        //
    }
 
    public function store(Request $request)
    {

        DB::beginTransaction(); 

        try {

            $remainingCash = $request['availableCash'] - $request['data']['net'];
            $totalEquity = $request['totalEquity'];

            $trade = Trade::create([
                'shares' => $request['data']['shares'],
                'status' => 0,
                'stock_code' => $request['data']['stock_code'],
                'date' => $request['data']['date'],
                'gain_loss' => 0
            ]);

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
            echo 1;

        } catch ( \Exception $e ) {

            DB::rollback();
            throw $e;
            echo 0;
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

            $gainLoss = $this->gainLossCalculator((float)$request->price, (float)$trade->purchase_price);
            $totalSold = $trade->sold + $request->shares;
            $status = 0;

            if ( $totalSold == $trade->shares )
                $status = 1;

            $trade_position = Trade::where('id', $trade->id)
                            ->update([
                                'status' => $status,
                                'sold' => $totalSold,
                                'gain_loss' => $gainLoss
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

            DB::commit();
 
        } catch (\Exception $e) {
            //throw $th;
            DB::rollback(); 
            throw $e;
        }
    }

    // Gain / Loss Formula
    // ( PRICE SOLD - PURCHASE PRICE ) / PURCHASE PRICE * 100
    private function gainLossCalculator( float $priceSold, float $purchasePrice) {
        
        echo $priceSold . "<br>";
        echo $purchasePrice . "<br>";
        return (( $priceSold - $purchasePrice ) / $purchasePrice) * 100;
    }

 
    public function show($id)
    {
        //
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
