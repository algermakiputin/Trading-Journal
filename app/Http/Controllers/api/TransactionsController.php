<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\Trade;
use Illuminate\Support\Facades\DB;

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
                'gain_loss' => 0
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
        }

        return;
    }

    public function sell(Request $request) {

        DB::beginTransaction();

        
        try {

            $transaction = Transaction::create([
                'date' => $request->date,
                'stock_code' => $request->stock_code,
                'price' => $request->price,
                'shares' => $request->shares,
                'fees' => $request->fees,
                'net' => $request->net,
                'trade_id' => 1,
                'type' => 'sell'
            ]);

            DB::commit();

        }catch (\Exception $e) {
            
            print_r($e);
            DB::rollback();
            echo 0;
        }
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
