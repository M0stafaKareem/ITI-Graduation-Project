<?php

namespace App\Http\Middleware;

use App\Models\User;
use Auth;
use Closure;
use Cookie;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetHeadersMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        
        //get the id param
        $id = $request->route('id');
        //get the user with that id from db
        $user =User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        //set the user in the request
        $request->user = $user;
        
        
        
        
        return $next($request);


    }
}
