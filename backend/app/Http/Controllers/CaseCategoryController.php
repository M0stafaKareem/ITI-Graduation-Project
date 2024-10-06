<?php

namespace App\Http\Controllers;

use App\Models\CaseCategory;
use Illuminate\Http\Request;

class CaseCategoryController extends Controller
{
    public function index(Request $request)
    {
        // Get all case categories
        $CaseCategories = CaseCategory::all();

        // Extract the search term from the query parameters
        $searchTerm = $request->query('search');

        // If there's a search term, filter the results based on it
        if (!empty($searchTerm)) {
            $CaseCategories = CaseCategory::when($searchTerm, function ($query, $searchTerm) {
                $query->where('name', 'like', "%{$searchTerm}%")
                ->orWhere('description', 'like', "%{$searchTerm}%");
            })->get();
        }

        return $CaseCategories;
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'nullable',
        ]);

        $CaseCategory = CaseCategory::create($request->all());

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