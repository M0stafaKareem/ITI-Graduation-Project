<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
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
}
