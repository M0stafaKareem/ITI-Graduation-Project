<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\Client;
use App\Models\ClientCategory;
use App\Models\Country;
use App\Models\state;
use Illuminate\Http\Request;

class ClientsController extends Controller
{
    public function index()
    {
        $Clients = Client::all();
        return $Clients;
    }


    public function store(Request $request)
    {
       
 
        $request->validate([
            "name"=> "required",
            "country_id"=> "required",
            "city_id"=> "required",
            // "state_id"=> "required",
            "role"=> "required",
            "mobile"=> "required",
            "email"=> "required|unique:clients,email",
            "gender"=> "required",
            "address"=> "required",
            "description"=> "required",
            "client_category"=> "required",
        ]);
        $client_category = ClientCategory::find($request->client_category);
        if ($client_category) {
            return "Client Category not found.";
        }

        $country = Country::findOrFail($request->country_id);
        
       
        $city = City::findOrFail($request->city_id);
        
       
        // $state = state::findOrFail($request->state_id);
    
       

        $Client= Client::create($request->all());

        return $Client;
    }

    public function show( $id)
    {
        
        $Client = Client::find($id);
        if (!$Client) {
            return 'Client not found.';
        }
        return $Client;
    }



    public function update(Request $request,  $id)
    {
    
        $request->validate([
            "name"=> "required",
            "country_id"=> "required",
            "city_id"=> "required",
            // "state_id"=> "required",
            "role"=> "required",
            "mobile"=> "required",
            "email"=> "required|email",
            "gender"=> "required",
            "address"=> "required",
            "description"=> "required",
            "client_category"=> "required",
        ]);
        $client_category = ClientCategory::find($request->client_category);
        if ($client_category) {
            return "Client Category not found.";
        }
        

        $country = Country::findOrFail($request->country_id);
       
        $city = City::findOrFail($request->city_id);
       
        // $state = state::findOrFail($request->state_id);
    

        $Client = Client::find($id);

        if (!$Client) {
            return 'Client not found.';
        }

        $Client->update($request->all());

        return 'Client updated successfully.';
    }

    public function destroy( $id)
    {
        $Client = Client::find($id);
        if ($Client) {
             $Client->delete();

            return 'Client deleted successfully.';
        }
        return 'Client not found.';

       
    }
}
