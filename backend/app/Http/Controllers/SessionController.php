<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Session;
use Illuminate\Validation\ValidationException;

class SessionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            return Session::all();
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
                'case_id' => 'required',
                'session_number' => 'nullable',
                'session_date' => 'required',
                'happened'=>'nullable',
                'requirements'=>'nullable'

            ]);
            $request = Session::create($request->all());
            return response()->json(['message' => 'session created successfully' ],200);
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

            $session = Session::findOrFail($id) ;
            return $session;
        }catch(\Exception $e){
            return response()->json(['error' => 'session not found'], 500);
        }
    }

     public function getSessionsByCaseId($caseId)
    {
        // Fetch all sessions where case_id matches the provided caseId
        $sessions = Session::where('case_id', $caseId)->get();

        // Return the sessions as a JSON response
        return response()->json($sessions);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try{

            $request->validate([
                'session_number' => 'nullable',
                'session_date' => 'required',
                'happened'=>'nullable',
                'requirements'=>'nullable'

            ]);
            $session = Session::findOrFail($id);
            $session->update($request->all());
            return response()->json(['message' => 'session updated successfully.']);
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
            $session = Session::findOrFail($id);
            $session->delete();
            return response()->json(['message' => 'session deleted successfully.']);
        }catch(\Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
