<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\Country;
use App\Models\state;
use Illuminate\Http\Request;

class CountryController extends Controller
{

    public function index()
    {
        $countries = Country::all();
        return response()->json($countries);
    }
    //get show

    public function show($id)
    {
        $country = Country::find($id);
        if (!$country) {
            return 'country not found.';
        }
        return response()->json($country);
    }

    public function City($id)
    {
        $country = Country::find($id);
        if (!$country) {
            return 'country not found.';
        }
        //get states of the country States where id of the country in state
        $States = state::where('country_id', $id)->get();
        // get cities of the states
        $cities = City::whereIn('state_id', $States->pluck('id'))->get();
        return response()->json($cities);
    }


}
