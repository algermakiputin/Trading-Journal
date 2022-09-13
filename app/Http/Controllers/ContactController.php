<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactController extends Mailable
{
    use Queueable, SerializesModels;
    protected $form;

    public function __construct($form) { 
        $this->form = $form;
    }

    public function build() {
        return $this->subject('New Hero Journals Contact Form Submission')
                    ->from('algerzxc@gmail.com')
                    ->view('email.contact')->with([
                        'fname' => $this->form['fname'],
                        'lname' => $this->form['lname'],
                        'email' => $this->form['email'],
                        'subject' => $this->form['subject'],
                        'msg' => $this->form['message']
                    ]);
    }

}
