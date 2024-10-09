<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class BudgetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            return Budget::with('expenses')->get();
        }catch(\Exception $e){
            return $e->getMessage();
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
            $request->validate([
                'budget_name' => 'required',
                'amount' => 'required',
                'spent' => 'required',
            ]);
            $request = Budget::create($request->all());
            return response()
            ->json(['message' => 'budget created successfully' ],200);
        }
        catch(ValidationException $e){
            return response()->
            json(['message' => $e->getMessage()], 400);  
        }
        catch(\Exception $e){
            return response()->
            json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try{
            $budget = Budget::with('expenses')->findOrFail($id) ;
            return $budget;
        }catch(\Exception $e){
            return $e->getMessage();
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try{

            $request->validate([
                'budget_name' => 'required',
                'amount' => 'required',
                'spent'=> 'required'
            ]);
            $budget = Budget::with('expenses')->findOrFail($id);
            $budget->update($request->all());
            return response()->
            json(['message' => 'budget updated successfully.']);
        }catch(ValidationException $e){
            return response()->
            json(['message' => $e->getMessage()], 400);  
        }catch(\Exception $e){
            return response()->
            json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try{
        $budget = Budget::with('expenses')->findOrFail($id);
            $budget->delete();
            return response()->json(['message' => 'budget deleted successfully.']);
        }catch(\Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
