<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       return Task::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'is_completed' => 'required',

        ]);
         Task::create($request->all());

        return response()->json(['message' => 'task created successfully.']);
    }

    /**
     * Display the specified resource.
     */
    public function show( $id)
    {
        return Task::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,Task  $task)
    {
       $request->validate([
        'title' => 'required',
        'description' => 'required',
        'is_completed' => 'required',
            
        ]) ;
        $task->update($request->all());
        return response()->json(['message' => 'task updated successfully.']);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $task=Task::findOrFail($id);
        $task->delete();
        return response()->json(['message' => 'task deleted successfully.']);
    }
}
