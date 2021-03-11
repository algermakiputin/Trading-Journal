<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Trade; 

class TradesController extends Controller
{
    
    public function positions(Trade $trade) {

        $trades =  $trade->find(2)->transactions()->get();
 
      
    }
}
