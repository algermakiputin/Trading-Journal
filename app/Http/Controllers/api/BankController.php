<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Bank;
use App\Models\Equity;
use Illuminate\Support\Facades\DB;

class BankController extends Controller
{
    //

    public function store(Request $request) {
        
        DB::beginTransaction();

        try { 

            Bank::create([
                'date' => $request->date,
                'amount' => $request->amount,
                'action' => $request->action
            ]);

            Equity::create([
                'date' => $request->date,
                'total_equity' => $request->amount,
                'remaining_cash' => $request->amount,
                'action' => 'deposit',
                'action_reference_id' => 1
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
