<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Equity;

class EquitiesController extends Controller
{
    //

    public function getEquities() {

        $quity = Equity::orderBy('id', 'DESC')
                        ->limit(1)
                        ->first();
        
        return $quity;
    }
}
