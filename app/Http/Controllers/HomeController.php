<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\FeedbackController;
use Mail;

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
        $this->middleware('auth')->except('verify'); 
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

    public function contactFormValidate(array $data) {

        return Validator::make($data, [
            'fname' => 'required|max:55',
            'lname' => 'required|max:55',
            'email' => 'required|email|max:99',
            'subject' => 'required|max:99',
            'message' => 'required|max:199'
        ]);
 
    }

    public function contactFormSubmit(Request $request) {

        $validate = $this->contactFormValidate($request->all());
        if ( $validate->fails() ) {
            return redirect('/contact')->withErrors($validate);
        }
        
        Mail::to('algerzxc@gmail.com')
                ->send(new ContactController($request->all()));
        
        return redirect('contact')->with('message', 1);
    }

    public function feedbackFormSubmit(Request $request) {

        $data = [
            'name' => Auth()->user()->name,
            'email' => Auth()->user()->email,
            'rating' => $request->rating,
            'feedback' => $request->feedback,
            'details' => $request->details
        ];

        return Mail::to('algerzxc@gmail.com')
            ->send(new FeedbackController($data));

        
    }
}
