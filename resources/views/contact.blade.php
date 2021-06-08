@extends('layouts.app')

@section('content')
<div class="container">
    <br/>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Send an email</div>

                <div class="card-body">
                    <form method="POST" action="{{ route('contactSubmit') }}"> 
                        @csrf
                        <div class="form-group">
                            @if (session()->has('message'))
                                <div class="alert alert-success">
                                    <h3>Thank you for contacting us.</h3>
                                    <p>You are very important to us, all information received will remain confidential. We will contact you soon as soon as we review your message.</p>
                                </div>
                            @endif
                        </div>
                        <div class="form-group row"> 
                            <div class="col-md-6">
                                <label>First Name</label>
                                <input id="fname" type="text" class="form-control @error('fname') is-invalid @enderror" name="fname" value="{{ old('email') }}" required autocomplete="email" autofocus>

                                @error('fname')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                            <div class="col-md-6">
                                <label>Last Name</label>
                                <input id="lname" type="text" class="form-control @error('lname') is-invalid @enderror" name="lname" value="{{ old('email') }}" required autocomplete="email" autofocus>

                                @error('lname')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row"> 
                            <div class="col-md-12">
                                <label>Your Email</label>
                                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" required autocomplete="current-password">

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        <div class="form-group row"> 
                            <div class="col-md-12">
                                <label>Subject</label>
                                <input id="subject" type="text" class="form-control @error('subject') is-invalid @enderror" name="subject" required autocomplete="current-password">

                                @error('subject')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        <div class="form-group row"> 
                            <div class="col-md-12">
                                <label>Your Message</label>
                                <textarea class="form-control @error('message') is-invalid @enderror" rows="4" name="message" id="message"></textarea>

                                @error('message')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary">Send Message</button>
                        </div> 
                    </form>
                </div>
            </div>
        </div>
        
    </div>
</div>
 
@endsection
