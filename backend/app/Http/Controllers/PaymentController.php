<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payment;
use Illuminate\Validation\ValidationException;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            return Payment::all();
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
                'amount' => 'required',
                'description' => 'required',
            ]); 
            $request = Payment::create($request->all());
            return response()->
            json(['message' => 'payment created successfully' ],200);
        }catch(ValidationException $e){
            return response()->
            json(['message' => $e->getMessage()], 400);  
        }catch(\Exception $e){
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
            $payment = Payment::findOrFail($id) ;
            return $payment;
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
                'amount' => 'required',
                'description' => 'required',
            ]);
            $payment = Payment::findOrFail($id);
            $payment->update($request->all());
            return response()->
            json(['message' => 'payment updated successfully.']);
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
            $payment = Payment::findOrFail($id);
            $payment->delete();
            return response()->
            json(['message' => 'payment deleted successfully.']);
        }catch(\Exception $e){
            return response()->
            json(['error' => $e->getMessage()], 500);
        }
    }
}
