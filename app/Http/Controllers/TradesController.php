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
