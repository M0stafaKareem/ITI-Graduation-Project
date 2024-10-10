<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Otp;
use Auth;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(Request $request): JsonResponse
    {
        
        if ($request->user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Already verified.'], 409);
        }
        if ($request->user->markEmailAsVerified()) {
            event(new Verified($request->user));
        }

        return response()->json(['message'=> 'Email address verified.'],200);
    }
    public function verificationOtp(Request $request)
    {
        $request->validate([
            'otp' => ['required', 'string'],
            'email'=> ['required', 'string'],
        ]);
        $otp = Otp::where('email', $request->email)->first();
        if ($otp->otp == $request->otp) {
            $user = Auth::user();
            $user->email_verified_at = now();
            $user->save();
            return response()->json(['message' => 'Email verified successfully'], 200);
        } else {
            return response()->json(['message' => 'Invalid OTP code'], 401);
        }
    }
}
