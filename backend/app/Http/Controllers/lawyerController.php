<?php

namespace App\Http\Controllers;

use App\Models\Lawyer;
use Illuminate\Http\Request;

class lawyerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $lawyers = Lawyer::all();

        // Extract the search term from the query parameters
        $searchTerm = $request->query('search');
    
        if (!empty($searchTerm)) {
            $lawyers = Lawyer::when($searchTerm, function ($query, $searchTerm) {
                $query->where('name', 'like', "%{$searchTerm}%")
                      ->orWhere('phone_number', 'like', "%{$searchTerm}%")
                      ->orWhere('nation_id', 'like', "%{$searchTerm}%")
                      ->orWhere('address', 'like', "%{$searchTerm}%");
            })->get();
        }
    
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

        $laywer =  Lawyer::create($request->all());
        return response()->json($laywer);
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
