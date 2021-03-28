<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\Trade;
use Illuminate\Support\Facades\DB;
use App\Models\Bank;

class TransactionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        DB::beginTransaction();
        
        try {

            $trade = Trade::create([
                'shares' => $request->shares,
                'status' => 0,
                'stock_code' => $request->stock_code,
                'date' => $request->date,
                'gain_loss' => 0,
                'sold' => 0,
                'purchase_price' => $request->price
            ]);

            $transaction = Transaction::create([
                'date' => $request->date,
                'stock_code' => $request->stock_code,
                'price' => $request->price,
                'shares' => $request->shares,
                'fees' => $request->fees,
                'net' => $request->net,
                'trade_id' => $trade->id,
                'type' => 'long'
            ]);

            DB::commit();
            echo 1;

        } catch ( \Exception $e ) {
            
            DB::rollback();
            echo 0;
            throw $e;
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

            $trade_position = Trade::where('id', $trade->id)
                ->update([
                    'status' => 1,
                    'sold' => $trade->shares,
                    'gain_loss' => $this->gainLossCalculator((float)$request->price, (float)$trade->purchase_price)
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
    
        return (( $priceSold - $purchasePrice ) / $purchasePrice) * 100;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function fetch_all() {

        return null;
    }
 

    
}
