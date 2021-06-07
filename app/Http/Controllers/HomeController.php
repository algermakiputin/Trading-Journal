<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $this->middleware('auth'); 
        return view('welcome');
    }

    public function home() {

        return view('home');
    }

    public function contact() {

        return view('contact');
    }

    public function about() {

        return view('about');     
    }

    public function donate() {

        return view('donate');     
    }
}
