<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class FeedbackController extends Mailable
{
    use Queueable, SerializesModels;
    protected $form;

    public function __construct($form) { 
        $this->form = $form;
    }
    
    public function build() { 
        return $this->subject('New Hero Journals Contact Form Submission')
                    ->from('algerzxc@gmail.com')
                    ->view('email.feedbackform')->with([
                        'name' => $this->form['name'],
                        'email' => $this->form['email'],
                        'rating' => $this->form['rating'],
                        'feedback' => $this->form['feedback'],
                        'details' => $this->form['details']
                    ]);
       
    }

}
