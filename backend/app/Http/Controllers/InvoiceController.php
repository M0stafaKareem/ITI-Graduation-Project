<?php

namespace App\Http\Controllers;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class InvoiceController extends Controller
{
   
    public function index()
    {
        try {
            $invoices = Invoice::with(['payment', 'client:id,name'])->get();
            
            return response()->json($invoices);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

   
     //Store a newly created invoice and associate with a client and payments.
     
    public function store(Request $request)
    {
        try {
            $request->validate([
                'client_id' => 'required|exists:clients,id',
                'invoice_number' => 'required',
                'invoice_amount'=> 'required',
                'payments' => 'required|array',
                'payments.*.amount' => 'required'
                        
            ]);
           

            $invoice = Invoice::create([
                'client_id' => $request->client_id,
                'invoice_number' => $request->invoice_number,
                'invoice_amount' => $request->invoice_amount,
            ]);

            foreach ($request->payments as $paymentData) {
                $invoice->payments()->create([
                    'amount' => $paymentData['amount'],
                ]);
            }

            return response()->json([
                'message' => 'Invoice created successfully',
                'invoice' => $invoice->load('payment', 'client:id,name')
            ], 200);
            
        } catch (ValidationException $e) {

            return response()->json(['message' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified invoice with client and payments.
     */
    public function show(string $id)
    {
        try {
            // Find the invoice by ID, including client and payments
            $invoice = Invoice::with(['payment', 'client:id,name'])->findOrFail($id);
            return response()->json($invoice);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified invoice and associated payments.
     */
    public function update(Request $request, string $id)
    {
        try {
            // Validate the incoming request
            $request->validate([
                'client_id' => 'required|exists:clients,id',
                'invoice_number' => 'required',
                'invoice_amount' => 'required',
            ]);
    
            // Retrieve the invoice by ID
            $invoice = Invoice::with(['payment', 'client:id,name'])->findOrFail($id);
    
            // Update invoice with request data
            $invoice->update($request->only(['client_id', 'invoice_number', 'invoice_amount']));
    
            return response()->json([
                'message' => 'Invoice updated successfully',
                'invoice' => $invoice->load('payment', 'client:id,name')
            ], 200);
        } catch (ValidationException $e) {
            return response()->json(['message' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json
            (['error' => $e->getMessage()], 500);
        }
    }

   
    public function destroy(string $id)
    {
        try {
            $invoice = Invoice::with(['payment', 'client:id,name'])->findOrFail($id);

            $invoice->delete();

            return response()->json(['message' => 'Invoice deleted successfully.']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
