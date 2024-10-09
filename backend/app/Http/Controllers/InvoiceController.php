<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            return Invoice::with('payment','client')->get();
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
                // 'client_id' => 'required',
             
            ]);
            $request = Invoice::create($request->all());
            return response()->
            json(['message' => 'invoice created successfully' ],200);
        }catch(ValidationException $e){
            return response()->
            json(['message' => $e->errors() ],422);  
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
            $invoice = Invoice::with(   'payment','client')->findOrFail($id) ;
            return $invoice;
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
             
            ]);
            $invoice = Invoice::with('payment','client')->findOrFail($id);
            $invoice->update($request->all());
            return response()->
            json(['message' => 'invoice updated successfully.']);
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
            $invoice = Invoice::with('payment','client')->findOrFail($id);
            $invoice->delete();
            return response()->json(['message' => 'invoice deleted successfully.']);
        }catch(\Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
