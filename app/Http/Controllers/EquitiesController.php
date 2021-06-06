<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Equity;
use Illuminate\Support\Facades\DB;
use Session;

class EquitiesController extends Controller
{
    //

    public function getEquities() {

        $equity = Equity::orderBy('id', 'DESC')
                        ->where('profile_id', '=', session('profile_id'))
                        ->limit(1)
                        ->first();
                        
        if ( $equity ) { 
            $equity->gainLossPercentage = $this->monthlyGainLoss()['percentage'];
            $equity->gainLossAmount = $this->monthlyGainLoss()['amount'];
        }
 
         
        return $equity;
    } 

    public function profitLoss($startingDate, $endingDate) {

        $startingEquity = $this->getStartingEquity($startingDate);
        $endingEquity = $this->getEndingEquity($endingDate);

        return $this->gainLossCalculator($startingEquity, $endingEquity);
    }

    public function monthlyGainLoss() {

        $today = date('Y-m-d');
        $pastMonth = date('Y-m-d', strtotime('-30 days'));
        $count = DB::table('equities')->count();
        $startingEquity = 0;
        $endingEquity = 0;

        // Get the first and last recoreded date of the month 
        // to query the starting equity and ending equity

        $equity = DB::table("equities")
                        ->select(DB::raw('MIN(date) as min, MAX(date) as max'))
                        ->where('profile_id', '=', session('profile_id'))
                        ->where('date', '>=', $pastMonth) 
                        ->where('date', '<=', $today)
                        ->first(); 
        
        if ( Equity::count() !== 1)
            $startingEquity = $this->getStartingEquity($equity->min);
         
        $endingEquity = $this->getEndingEquity($equity->max);
  
        return $this->gainLossCalculator( $startingEquity, $endingEquity );
        
    }

    private function getStartingEquity($date) {

        $equity =  DB::table('equities')
                    ->select('total_equity as total')
                    ->where('profile_id', '=', session('profile_id'))
                    ->where('date', '>=', $date)
                    ->orderBy('id', 'ASC')
                    ->first(); 
        
        return $equity->total ?? 0;
    }

    private function getEndingEquity($date) {
        
        $date = $date ? $date : date('Y-m-d');
        $equity = DB::table('equities')
                    ->select('total_equity as total')
                    ->where('profile_id', '=', session('profile_id'))
                    ->where('date', '<=', $date)
                    ->orderBy('id', 'DESC')
                    ->first();

        return $equity->total ?? 0;
    } 

    private function gainLossCalculator( $startingEquity,  $endingEquity) {
     
        $amount = $endingEquity - $startingEquity;  
        
        $percentage = 100;

        if ( $startingEquity != 0)
            $percentage = ( ($endingEquity - $startingEquity ) / $startingEquity) * 100;
        
        $percentage = number_format($percentage,2); 
      
            
        return array(
            'percentage' => $percentage,
            'amount' => $amount
        );
    }

    public function getEquityCurve() {

        $lastHalfQuarter = new \DateTime( date('Y-m-d', strtotime('-30 weeks')) );
		$today = new \DateTime( date('Y-m-d') );
        $equities = Equity::where('profile_id', '=', session('profile_id'))
                            ->where('date', '>=', $lastHalfQuarter->format('Y-m-d'))
                            ->where('date', '<=', $today->format('Y-m-d'))
                            ->get();

        $data = $this->initDates("weeks", $lastHalfQuarter, $today, 'Y-m-d');
        $total_equity = 0; 
        $lastDate = "";
        $equity = 0; 
        foreach ( $data as $key => $row ) {

            $start = (new \DateTime($key))->modify('-7 days')->format('Y-m-d');
			$end = date("Y-m-d", strtotime($key));
             
            foreach ( $equities as $equity ) {

                $date = strtotime( $equity->date );

                if ( $date >= strtotime($start) && $date <= strtotime($end) ) {
                    $equity = $equity->total_equity;
                    $data[$key] = $equity;
                    $lastDate = $date;
                }  
                     
            }
 
        }
 
        return $data = $this->rechartsFormatData($data);
    }

    public function rechartsFormatData($data) {
      
        $dataset = [];
        $lastEquity = 0;
        if ( $data ) {

            foreach ( $data as $key => $row ) {

                if ( $lastEquity && $row == 0) 
                    $row = $lastEquity;

                $dataset[] = array(
                    'date' => date('M j', strtotime($key)),
                    'amount' => $row
                );

                $lastEquity = $row;
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
