<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Bank;

class BankController extends Controller
{
    //

    public function store(Request $request) {
  
        $bank = Bank::create([
            'date' => $request->date,
            'amount' => $request->amount,
            'action' => $request->action
        ]);

        if ( $bank ) {

            echo 1;
            return;
        }

        echo 0;
        return;
        
    }
}
