<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Socialite;
use Auth;
use Exception;
use App\Models\User;
use App\Models\Profile;

class GoogleController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
    
            $user = Socialite::driver('google')->user();  
            $finduser = User::where('google_id', $user->id)->orWhere('email', $user->email)->first();
     
            if($finduser){
     
                Auth::login($finduser);
    
                return redirect('/dashboard');
     
            }else{
                $newUser = User::create([
                    'name' => $user->name,
                    'email' => $user->email,
                    'google_id'=> $user->id,
                    'password' => Hash::make($user->id . strtotime(date('h:i:s')) . $user->name),
                    'email_verified_at' => strtotime(date('Y-m-d h:i:s'))
                ]);

                $newUser->markEmailAsVerified();

                Profile::create([
                    'user_id' => $newUser->id,
                    'name' => $user->name
                ]);
                    
                Auth::login($newUser); 
                $this->setUserSession($newUser);
                return redirect('/dashboard');
            }
    
        } catch (Exception $e) {
            dd($e->getMessage());
        }
    }

    protected function setUserSession($user)
    {
        $user = Auth::user();
        $profile = Profile::where('user_id', $user->id)->first();
        
        session([
            'profile_id' => $profile->id
        ]);
 
    }
}
