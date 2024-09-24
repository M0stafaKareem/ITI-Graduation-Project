<?php

namespace App\Http\Controllers;

use App\Models\Court;
use Illuminate\Http\Request;

class CourtController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $courts= Court::all();
        return $courts ;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "name" => "required",
            "location" => "required",
        ]);
        $court = Court::create($request->all());
        return $court;
    }

    /**
     * Display the specified resource.
     */
    public function show(Court $court)
    {
        return $court;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Court $court)
    {
        $request->validate([
            "name" => "required",
            "location" => "required",
        ]);
        $court->update($request->all());
        return $court;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Court $court)
    {
        $court->delete();
        return "deleted successfuly";
    }
}
