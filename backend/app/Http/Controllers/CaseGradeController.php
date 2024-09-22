<?php

namespace App\Http\Controllers;

use App\Models\CaseGrade;
use Illuminate\Http\Request;

class CaseGradeController extends Controller
{
    public function index()
    {
        $CaseGrades = CaseGrade::all();
        return $CaseGrades;
    }


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'nullable',
        ]);

        $CaseGrade= CaseGrade::create($request->all());

        return $CaseGrade;
    }

    public function show($id)
    {
        
        $CaseGrade = CaseGrade::find($id);
        if (!$CaseGrade) {
            return 'CaseGrade not found.';
        }
        return $CaseGrade;
    }



    public function update(Request $request, $id)
    {
    
        $request->validate([
            'name' => 'required',
            'description' => 'nullable',
        ]);

        $CaseGrade = CaseGrade::find($id);

        if (!$CaseGrade) {
            return 'CaseGrade not found.';
        }

        $CaseGrade->update($request->all());

        return 'CaseGrade updated successfully.';
    }

    public function destroy($id)
    {
        $CaseGrade = CaseGrade::find($id);
        if ($CaseGrade) {
             $CaseGrade->delete();

            return 'CaseGrade deleted successfully.';
        }
        return 'CaseGrade not found.';

       
    }
}
