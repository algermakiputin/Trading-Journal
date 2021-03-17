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
                        ->orderBy('trades.id', 'DESC')
                        ->leftJoin('transactions', 'tradeS.id', '=', 'transactions.trade_id')
                        ->get();
        
        $trades = $this->group_trades( $trades );
        

        foreach ( $trades as $key => $trade ) {

            $position[] = $this->calculate_position($trade);
        }

        return $position;

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
        $currency = config('app.currency');

        foreach ( $trades as $trade ) {

            $total_shares += $trade->shares;
            $total_cost += $trade->net; 
        }

        $ave_price = number_format( ($total_cost / $total_shares), 2 );

        return array(
            'ave_price' => $currency . $ave_price,
            'total_cost' => $currency . number_format($total_cost, 2),
            'total_shares' => $total_shares,
            'stock_code' => $trades[0]->stock_code
        );
    }
}
