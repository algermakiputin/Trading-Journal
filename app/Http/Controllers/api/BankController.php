<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\EquitiesController;
use Illuminate\Http\Request;
use App\Models\Bank;
use App\Models\Equity;
use Illuminate\Support\Facades\DB;
use Session;

class BankController extends Controller
{
    //
    public function datatable(Request $request) {

        $page = $request->page; 
        $recordsPerPage = $request->recordsPerPage;
        $offset = $page * $recordsPerPage - $recordsPerPage;
        $totalRecords = Bank::count();
        $transactions = Bank::offset($offset)
                            ->limit($recordsPerPage)
                            ->where('profile_id', session('profile_id'))
                            ->orderBy('date', 'desc')
                            ->orderBy('id', 'desc')
                            ->get();

        return array(
            'totalRecords' => $totalRecords,
            'transactions' => $transactions
        );
    }

    public function store(Request $request) {
       
        $date = $request['data']['date'];
        $amount = $request['data']['amount'];
        $action = $request['data']['action'];
        $totalEquity = $amount;
        $remainingCash = $amount; 
    
        if ( $equity && $request->action == "deposit" ) {
            $totalEquity += $request->totalEquity;
            $remainingCash += $request->availableCash;

        }else if ( $equity && $request->action =="withdraw") { 
            
            $availableCash = $equity->remaining_cash; 
            if ( $availableCash > $amount ) { 
                $totalEquity = $request->totalEquity - $amount;
                $remainingCash = $request->availableCash - $amount;
            
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

    public function destroy(Request $request) {

        $equitiesController = new EquitiesController();
        $equity = $equitiesController->getEquities();
        $remainingCash = $equity->remaining_cash;
        $totalEquity = $equity->total_equity;
        $amount = $request->amount;
        
        if ($remainingCash < $amount)
            return "Opps! Remaining balance will be zero if you delete this bank transactions.";

        Bank::where('id', $request->id)->delete();
        Equity::create([
            'date' => date('Y-m-d'),
            'total_equity' => $totalEquity - $amount,
            'remaining_cash' => $remainingCash - $amount,
            'action' => 'delete',
            'action_reference_id' => $request->id,
            'profile_id' => session('profile_id')
        ]);
    }
}
