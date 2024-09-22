<?php

namespace App\Http\Controllers;

use App\Models\CaseCategory;
use Illuminate\Http\Request;

class CaseCategoryController extends Controller
{
    public function index()
    {
        $CaseCategories = CaseCategory::all();
        return $CaseCategories;
    }


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'nullable',
        ]);

        $CaseCategory= CaseCategory::create($request->all());

        return $CaseCategory;
    }

    public function show($id)
    {
        
        $CaseCategory = CaseCategory::find($id);
        if (!$CaseCategory) {
            return 'CaseCategory not found.';
        }
        return $CaseCategory;
    }



    public function update(Request $request, $id)
    {
    
        $request->validate([
            'name' => 'required',
            'description' => 'nullable',
        ]);

        $CaseCategory = CaseCategory::find($id);
        if (!$CaseCategory) {
            return 'CaseCategory not found.';
        }

        $CaseCategory->update($request->all());

        return 'CaseCategory updated successfully.';
    }

    public function destroy($id)
    {
        $CaseCategory = CaseCategory::find($id);
        if (!$CaseCategory) {
            return 'CaseCategory not found.';
        }

        $CaseCategory->delete();

        return 'CaseCategory deleted successfully.';
    }
}
