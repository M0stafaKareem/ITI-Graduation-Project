<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{

            return Task::all();
        }catch(\Exception $e) {
            return response()->json(['error'=> 'task not found '] , 404);
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
            'user_id' => 'required',
                'description' => 'required',
                'is_completed' => 'required',
            'due_date' => 'required',
    
            ]);
             Task::create($request->all());
    
            return response()->json(['message' => 'task created successfully.']);
        }catch(ValidationException $e) {
            return response()->
            json(['message'=> 'validaition failed ' 
              ,'errors'=> $e->errors()], 404);
        }catch (\Exception $e) {
            return response()->json(['error'=> 'task not created '] , 404);
        }
            
    }

    /**
     * Display the specified resource.
     */
    public function show( $id)
    {
        try{
            $task=Task::findOrFail($id);
            return $task;

        }catch (\Exception $e) {
            return response()->json(['error'=> 'task not found '] , 404);
    }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,Task  $task)
    {
        try{

            $request->validate([
              'title' => 'required',
        'user_id' => 'required',
              'description' => 'required',
              'is_completed' => 'required',
              'due_date' => 'required',
              ]) ;
              $task->update($request->all());
               return response()->json(['message' => 'task updated successfully.']);
        }catch(ValidationException $e) {
            return response()->
            json(['message'=> 'validaition failed ' 
              ,'errors'=> $e->errors()], 404);  
        }catch(\Exception $e) {
            return response()->json(['error'=> 'task not updated '] , 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try{

            $task=Task::findOrFail($id);
            $task->delete();
            return response()->json(['message' => 'task deleted successfully.']);
        }catch (\Exception $e) {
            return response()->json(['error'=> 'task not deleted '] , 404);
        }
    }
}
