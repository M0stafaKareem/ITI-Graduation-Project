<?php

namespace App\Http\Controllers;

use App\Models\CaseCategory;
use App\Models\CaseGrade;
use App\Models\Client;
use App\Models\MCase;
use Illuminate\Http\Request;

class CaseController extends Controller
{
    public function index(Request $request)
    {
        $Cases = MCase::all();
        
        // Extract the search term from the query parameters
        $searchTerm = $request->query('search');
        if (!empty($searchTerm)) {
            $Cases = MCase::when($searchTerm, function ($query, $searchTerm) {
                // Filter cases by case name or case date
                $query->where('case_name', 'like', "%{$searchTerm}%")
                      ->orWhere('case_date', 'like', "%{$searchTerm}%") // Search by case_date
                      ->orWhereIn('client_id', function ($subQuery) use ($searchTerm) {
                          // Search clients table for matching client details (like name, email, or mobile)
                          $subQuery->select('id')
                                   ->from('clients')
                                   ->where('name', 'like', "%{$searchTerm}%")
                                   ->orWhere('email', 'like', "%{$searchTerm}%")
                                   ->orWhere('mobile', 'like', "%{$searchTerm}%");
                      });
            })->get();
        }
    
        // Return the filtered or complete list of cases
        return $Cases;
    }

    public function store(Request $request)
    {
        $request->validate([
            'case_name' => 'required',
            'client_id' => 'required',
            'case_date' => 'required',
            'first_session_date' => 'required',
            'case_category_id' => 'required',
            'case_grade_id' => 'required',
            'court_id' => 'required',
            'status' => 'required'
        ]);

        $client = Client::find($request->client_id);
        if (!$client) {
            return 'Client not found.';
        }

        $case_category = CaseCategory::find($request->case_category_id);
        if (!$case_category) {
            return 'Case category not found.';
        }

        $case_grade = CaseGrade::find($request->case_grade_id);
        if (!$case_grade) {
            return 'Case grade not found.';
        }

        $Case = MCase::create($request->all());

        return $Case;
    }

    public function show($id)
    {
        $Case = MCase::find($id);
        if (!$Case) {
            return 'Case not found.';
        }
        return $Case;
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'case_name' => 'required',
            'client_id' => 'required',
            'case_date' => 'required',
            'first_session_date' => 'required',
            'case_category_id' => 'required',
            'case_grade_id' => 'required',
            'court_id' => 'required',
            'status' => 'required',
        ]);

        $client = Client::find($request->client_id);
        if (!$client) {
            return 'Client not found.';
        }

        $case_category = CaseCategory::find($request->case_category_id);
        if (!$case_category) {
            return 'Case category not found.';
        }

        $case_grade = CaseGrade::find($request->case_grade_id);
        if (!$case_grade) {
            return 'Case grade not found.';
        }

        $Case = MCase::find($id);
        if (!$Case) {
            return 'Case not found.';
        }

        $Case->update($request->all());

        return 'Case updated successfully.';
    }

    public function destroy($id)
    {
        $Case = MCase::find($id);
        if ($Case) {
            $Case->delete();
            return 'Case deleted successfully.';
        }
        return 'Case not found.';
    }
}