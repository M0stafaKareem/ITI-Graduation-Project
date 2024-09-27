<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth,verifed'])->get('/user', function (Request $request) {
    return $request->user();
});
