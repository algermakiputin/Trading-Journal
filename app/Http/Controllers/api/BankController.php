<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Bank;
use App\Models\Equity;
use Illuminate\Support\Facades\DB;
use Session;

class BankController extends Controller
{
    //

    public function store(Request $request) {
   
        $date = $request['data']['date'];
        $amount = $request['data']['amount'];
        $action = $request['data']['action'];
        $totalEquity = $amount;
        $remainingCash = $amount;
        $equity = Equity::where('date', '<=', $date) 
                        ->where('profile_id', '=', session('profile_id'))
                        ->orderBy('id', 'DESC')
                        ->first();
    
        if ( $equity && $request->action == "deposit" ) {
            $totalEquity += $equity->total_equity;
            $remainingCash += $equity->remaining_cash;

        }else if ( $equity && $request->action =="withdraw") { 
            
            $availableCash = $equity->remaining_cash; 
            if ( $availableCash > $amount ) { 
                $totalEquity = $equity->total_equity - $amount;
                $remainingCash = $equity->remaining_cash - $amount;
            
            }else {
                echo "not enough cash";
                return false;
            }
        }

        DB::beginTransaction();

        try { 

            $bank = Bank::create([
                'date' => $date,
                'amount' => $amount,
                'action' => $action,
                'profile_id' => session('profile_id')
            ]);
            
            Equity::create([
                'date' => $date,
                'total_equity' => $totalEquity,
                'remaining_cash' => $remainingCash,
                'action' => $action,
                'action_reference_id' => $bank->id,
                'profile_id' => session('profile_id')
            ]);

            DB::commit();
            return 1;

        } catch (\Exception $e) {
            
            DB::rollBack();
            throw $e;
            return 0;
        }
          
    }
}
