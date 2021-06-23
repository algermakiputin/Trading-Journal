<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PagesController extends Controller
{
    // 
    public function sitemap() {
        return response()->view('sitemap')->header('Content-Type', 'text/xml');
    }
}
