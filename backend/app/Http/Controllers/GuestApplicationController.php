<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GuestApplication;
use Illuminate\Validation\ValidationException;

class GuestApplicationController extends Controller
{
    //
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            return GuestApplication::all();
        } catch (\Exception $e) {
            return response()->json(['error' => 'application not found '], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {

            $request->validate([
                "name" => "required",
                "email" => "required|email",
                "message" => "required",
                "subject" => "required"

            ]);

            $response = GuestApplication::create($request->all());
            return response()->json($response);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'validaition failed',
                'errors' => $e->errors()
            ], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'application not created '], 404);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {

            $application = GuestApplication::findOrFail($id);
            return $application;
        } catch (\Exception $e) {
            return response()->json(['error' => 'application not found '], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {

            $request->validate([
                "name" => "required",
                "email" => "required|email",
                "message" => "required",
                "subject" => "required"
            ]);
            $application = GuestApplication::findOrFail($id);
            $application->update($request->all());
            return response()->json(['message' => 'application updated successfully.']);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'validaition failed ',
                'errors' => $e->errors()
            ], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'application not updated '], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {

            $application = GuestApplication::findOrFail($id);
            $application->delete();
            return response()->json(['message' => 'application deleted successfully.']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'application not deleted '], 404);
        }
    }
}
