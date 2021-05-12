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

    public function getEquityCurve() {

        $lastHalfQuarter = new \DateTime( date('Y-m-d', strtotime('-12 weeks')) );
		$today = new \DateTime( date('Y-m-d') );
        $equities = Equity::where('date', '>=', $lastHalfQuarter->format('Y-m-d'))
                            ->where('date', '<=', $today->format('Y-m-d'))
                            ->get();

        $data = $this->initDates("weeks", $lastHalfQuarter, $today, 'Y-m-d');

        foreach ( $data as $key => $row ) {

            $start = (new \DateTime($key))->modify('-7 days')->format('Y-m-d');
			$end = date("Y-m-d", strtotime($key));
            
            foreach ( $equities as $equity ) {

                $date = strtotime( $equity->date );

                if ( $date >= strtotime($start) && $date <= strtotime($end) ) 
                    $data[$key] = $equity->total_equity;
            
            }
        }

        return $data = $this->rechartsFormatData($data);
    }

    public function rechartsFormatData($data) {

        $dataset = [];

        if ( $data ) {

            foreach ( $data as $key => $row ) {

                $dataset[] = array(
                    'date' => date('M j', strtotime($key)),
                    'amount' => $row
                );
            }
        }

        return $dataset;
    }

    public function initDates($interval, $from, $to, $format = "M j") {

		$dataset = array(); 
		
		for ( $i = $from; $i <= $to; $i->modify('+1 ' . $interval)) {
 
			$dataset[$i->format($format)] = 0;
			$profit[$i->format($format)] = 0;
		}

		return $dataset;

	}
}
