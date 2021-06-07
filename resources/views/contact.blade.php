@extends('layouts.app')

@section('content')
<div class="container">
    <br/>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Send an email</div>

                <div class="card-body">
                    <form method="POST" action="{{ route('login') }}"> 
                        @csrf
                        <div class="form-group">
                            @if (session()->has('message'))
                                <div class="alert alert-success">
                                    {!! session('message') !!}
                                </div>
                            @endif
                        </div>
                        <div class="form-group row"> 
                            <div class="col-md-6">
                                <label>First Name</label>
                                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                            <div class="col-md-6">
                                <label>Last Name</label>
                                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row"> 
                            <div class="col-md-12">
                                <label>Your Email</label>
                                <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">

                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        <div class="form-group row"> 
                            <div class="col-md-12">
                                <label>Your Message</label>
                                <textarea class="form-control" rows="4">

                                </textarea>

                                @error('password')
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
        <div class="col-md-4">
            <div class="card">
                <div class="card-header">Contact Info</div>

                <div class="card-body">
                    <div>
                    <div><bold>Email</bold></div>
                    support@herojournals.net
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
 
@endsection
