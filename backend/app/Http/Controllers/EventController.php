<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Validation\ValidationException;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            return Event::all();
        }catch (\Exception $e) {
            return response()->json(['error'=> 'event not found '] , 404); 
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{

            $request->validate([
                'title' => 'required',
                'description' => 'required',
                'event_date'=>'required',
               
            ]);
    
            Event::create($request->all());
            return response()->json(['message' => 'event created successfully.']);

        }catch (ValidationException $e) {
            return response()->
            json(['message'=> 'validaition failed' 
              ,'errors'=> $e->errors()], 404);
        }catch (\Exception $e) {
            return response()->json(['error'=> 'event not created '] , 404);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show( $id)
    {
        try{

            $event = Event::findOrFail($id);
            return $event;
        }catch (\Exception $e) {
            return response()->json(['error'=> 'event not found '] , 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try{
            
            $request->validate([
                'title' => 'required',
                'description' => 'required',
                'event_date'=>'required',
            ]);
            $event = Event::findOrFail($id);
            $event->update($request->all());
            return response()->json(['message' => 'event updated successfully.']);
            
        }catch(ValidationException $e) {
            return response()->
            json(['message'=> 'validaition failed ' 
              ,'errors'=> $e->errors()], 404);
        }catch (\Exception $e) {
            return response()->json(['error'=> 'event not updated '] , 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try{

            $event = Event::findOrFail($id);
            $event->delete();
            return response()->json(['message' => 'event deleted successfully.']);
     }  catch (\Exception $e) {
        return response()->json(['error'=> 'event not deleted '] , 404);
     } 
    }
}
