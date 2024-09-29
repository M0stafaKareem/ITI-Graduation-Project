<?php

namespace App\Http\Controllers;

use App\Models\OpposingLawyer;
use Illuminate\Http\Request;

class OpposingLawyerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $opposingLawyers = OpposingLawyer::all();
        return $opposingLawyers;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'phone_number' => 'required',   
            'national_id' => 'required',
            'address' => 'required',
        ]);

        OpposingLawyer::create($request->all());
        return response()->json(['message' => 'Opposing Lawyer created successfully.']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $opposingLawyer = OpposingLawyer::findOrFail($id);
        return $opposingLawyer;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required',
            'phone_number' => 'required',
            'national_id' => 'required',
            'address' => 'required',
        ]);
        $opposingLawyer = OpposingLawyer::findOrFail($id);
        $opposingLawyer->update($request->all());
        return response()->json(['message' => 'Opposing Lawyer updated successfully.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $opposingLawyer = OpposingLawyer::findOrFail($id);
        $opposingLawyer->delete();
        return response()->json(['message' => 'Opposing Lawyer deleted successfully.']);
    }
}
