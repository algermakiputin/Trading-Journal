<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Bank;

class BankController extends Controller
{
    //

    public function store(Request $request) {
  
        return Bank::create([
            'date' => $request->date,
            'amount' => $request->amount,
            'action' => $request->action
        ]);
        
    }
}
