<?php

namespace App\Http\Controllers;

use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;
use App\Models\Expense;
use App\Models\Budget;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            return Expense::all();
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
            'expense_name' => 'required',
            'amount' => 'required',
        ]);
        $request = Expense::create($request->all());
        return response()->json(['message' => 'expense created successfully' ],200);
    }catch(ValidationException $e){
        return response()->json(['message' => $e->getMessage()], 400);  
    }catch(\Exception $e){
        return response()->json(['error' => $e->getMessage()], 500);
    } 
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try{

            $expense = Expense::findOrFail($id) ;
            return $expense;
        }catch(\Exception $e){
            return response()->json(['error' => 'expense not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try{
            $request->validate([
                'expense_name' => 'required',
                'amount' => 'required',
            ]);
            $expense = Expense::findOrFail($id);
            $expense->update($request->all());
            return response()->json(['message' => 'expense updated successfully.']);
        }catch(ValidationException $e){
            return response()->json(['message' => $e->getMessage()], 400);  
        }catch(\Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try{
            $expense = Expense::findOrFail($id);
            $expense->delete();
            return response()->json(['message' => 'expense deleted successfully.']);
        }catch(\Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
