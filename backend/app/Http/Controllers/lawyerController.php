<?php

namespace App\Http\Controllers;

use App\Models\Lawyer;
use Illuminate\Http\Request;

class lawyerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lawyers = Lawyer::all();
        return $lawyers;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'phone_number' => 'required',
            'nation_id' => 'required',
            'address' => 'required',
        ]);

        Lawyer::create($request->all());
        return response()->json(['message' => 'Lawyer created successfully.']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $lawyer = Lawyer::findOrFail($id);
        return $lawyer;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required',
            'phone_number' => 'required',
            'nation_id' => 'required',
            'address' => 'required',
        ]);
        $lawyer = Lawyer::findOrFail($id);
        $lawyer->update($request->all());
        return response()->json(['message' => 'Lawyer updated successfully.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $lawyer = Lawyer::findOrFail($id);
        $lawyer->delete();
        return response()->json(['message' => 'Lawyer deleted successfully.']);
    }
}
