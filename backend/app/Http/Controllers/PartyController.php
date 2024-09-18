<?php

namespace App\Http\Controllers;

use App\Models\Party;
use Illuminate\Http\Request;

class PartyController extends Controller
{
    public function index()
    {
        $parties = Party::all();
        return $parties;
    }


    public function store(Request $request)
    {
        $request->validate([
            'involvment' => 'required',
        ]);

        $party= Party::create($request->all());

        return $party;
    }

    public function show(int $id)
    {
        
        $party = Party::find($id);
        if (!$party) {
            return 'party not found.';
        }
        return $party;
    }



    public function update(Request $request, int $id)
    {
    
        $request->validate([
            'involvment' => 'required',
        ]);

        $party = Party::find($id);

        if (!$party) {
            return 'party not found.';
        }

        $party->update($request->all());

        return 'party updated successfully.';
    }

    public function destroy(int $id)
    {
        $party = Party::find($id);
        if ($party) {
             $party->delete();

            return 'party deleted successfully.';
        }
        return 'party not found.';

       
    }
}
