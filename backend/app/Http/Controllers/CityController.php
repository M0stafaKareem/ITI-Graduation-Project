<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;

class CityController extends Controller
{
    
    public function index()
    {
        $city = City::all();
        return response()->json($city);
    }

    //get

    public function show($id)
    {
        $city = City::findOrFail($id);
        return response()->json($city);
    }
}
