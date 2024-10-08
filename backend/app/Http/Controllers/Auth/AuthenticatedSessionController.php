<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Mail\OtpEmail;
use App\Models\Otp;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Mail;
use Ramsey\Uuid\Uuid;
use Redirect;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(Request $request)
    {
        $request->validate([
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid login credentials'], 401);
        }
        // Generate OTP code with lettters and numbers
        $otpCode = substr(Uuid::uuid4()->toString(), 0, 6);

    // Store OTP code in OTP table with email as key
    $otp = Otp::updateOrCreate(['email' => $request->email], ['otp' => $otpCode ,'expire_at' => now()->addMinutes(30)]);

    Mail::to($request->email)->send(new OtpEmail($otpCode));
    
    
    return response()->json(['message'=> 'OTP code sent'],200);

        
        // $user = Auth::user();
        // $token = $user->createToken('auth_token')->plainTextToken;

        // return response()->json([
        //     'access_token' => $token,
        //     'token_type' => 'Bearer',
        //     'user' => $user,
        //     'status' => 'Login successful',
        // ]);
    }

    public function destroy(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logout successful']);
    }
    public function create(Request $request): JsonResponse
    {

        return response()->json(['message' => 'Not Authenticated'], 401);
    }
    public function verificationOtp(Request $request)
    {
        $request->validate([
            'otp' => ['required', 'string'],
            'email'=> ['required', 'string'],
        ]);
        $otp = Otp::where('email', $request->email)->first();
        if ($otp == null) {
            return response()->json(['message' => 'Please login to get OTP'], 401);
        }
        if ($otp->expire_at < now()->addSeconds(1)) {
            $otp->delete();
            return response()->json(['message' => 'OTP expired'], 401);
        }
        if ($otp->otp == $request->otp && Auth::attempt($request->only('email','password'))) {
            $user = Auth::user();

            

            $otp->delete();
            
            return response()->json(['user' => $user], 200);
        } else {
            return response()->json(['message' => 'Invalid OTP code'], 401);
        }
    }

}
