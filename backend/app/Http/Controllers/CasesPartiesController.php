<?php

namespace App\Http\Controllers;

use App\Models\CasesParties;
use App\Models\MCase;
use App\Models\party;
use Illuminate\Http\Request;

class CasesPartiesController extends Controller
{
    public function index()
    {
        $CasesParties= CasesParties::all();
        return $CasesParties;
    }


    public function store(Request $request)
    {
        $request->validate([
            'party_id' => 'required',
            'case_id' => 'required',
            'name' => 'required',
        ]);
        $Case = MCase::find($request->case_id);
        if (!$Case) {
            return 'Case not found.';
        }

        $party = party::find($request->party_id);
        if (!$party) {
            return 'party not found.';
        }

        $CasesParty= CasesParties::create($request->all());

        return $CasesParty;
    }

    public function show($id)
    {
        
        $CasesParty = CasesParties::find($id);
        if (!$CasesParty) {
            return 'CasesParty not found.';
        }
        return $CasesParty;
    }



    public function update(Request $request, $id)
    {
    
        $request->validate([
            'party_id' => 'required',
            'case_id' => 'required',
            'name' => 'required',
        ]);

        $Case = MCase::find($request->case_id);
        if (!$Case) {
            return 'Case not found.';
        }

        $party = party::find($request->party_id);
        if (!$party) {
            return 'party not found.';
        }

        $CasesParty = CasesParties::find($id);

        if (!$CasesParty) {
            return 'CasesParty not found.';
        }

        $CasesParty->update($request->all());

        return 'CasesParty updated successfully.';
    }

    public function destroy($id)
    {
        $CasesParty = CasesParties::find($id);
        if ($CasesParty) {
             $CasesParty->delete();

            return 'CasesParty deleted successfully.';
        }
        return 'CasesParty not found.';

       
    }
}
