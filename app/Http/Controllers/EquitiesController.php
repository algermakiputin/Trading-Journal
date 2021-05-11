<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Equity;
use Illuminate\Support\Facades\DB;

class EquitiesController extends Controller
{
    //

    public function getEquities() {

        $equity = Equity::orderBy('id', 'DESC')
                        ->limit(1)
                        ->first();
                        
    
        $equity->gainLossPercentage = $this->monthlyGainLoss()['percentage'];
        $equity->gainLossAmount = $this->monthlyGainLoss()['amount'];
        return $equity;
    }

    public function monthlyGainLoss() {

        $today = date('Y-m-d');
        $pastMonth = date('Y-m-d', strtotime('-30 days'));
        $equity = DB::table("equities")
                        ->select(DB::raw('MIN(date) as min, MAX(date) as max'))
                        ->where('date', '>=', $pastMonth)
                        ->where('date', '<=', $today)
                        ->first();
        
        $startingEquity = DB::table('equities')
                                ->where('date', '=', $equity->min)
                                ->orderBy('id', 'ASC')
                                ->first(); 
        
        $endingEquity = DB::table('equities')
                                ->where('date', '=', $equity->max)
                                ->orderBy('id', 'DESC')
                                ->first();

        return $this->gainLossCalculator( $endingEquity->total_equity, $startingEquity->total_equity );
        
    }

    private function gainLossCalculator( float $endingEquity, float $startingEquity) {
        
        $percentage = number_format((( $endingEquity - $startingEquity ) / $startingEquity) * 100,2);
        $amount = $endingEquity - $startingEquity;

        return array(
            'percentage' => $percentage,
            'amount' => $amount
        );
    }
}
