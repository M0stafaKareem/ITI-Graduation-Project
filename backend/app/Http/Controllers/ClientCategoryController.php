<?php

namespace App\Http\Controllers;

use App\Models\ClientCategory;
use Illuminate\Http\Request;

class ClientCategoryController extends Controller
{
    public function index()
    {
        $ClientCategory = ClientCategory::all();
        return $ClientCategory;
    }


    public function store(Request $request)
    {
        $request->validate([
              'category_name' => 'required',
              'description'=> 'nullable',
              
        ]);
       

        $ClientCategory= ClientCategory::create($request->all());

        return $ClientCategory;
    }

    public function show($id)
    {
        
        $ClientCategory= ClientCategory::find($id);
        if (!$ClientCategory) {
            return 'Client Category not found.';
        }
        return $ClientCategory;
    }



    public function update(Request $request, $id)
    {
    
        $request->validate([
            'category_name' => 'required',
            'description'=> 'nullable',
        ]);
       
        $ClientCategory = ClientCategory::find($id);

        if (!$ClientCategory) {
            return 'Client Category not found.';
        }

        $ClientCategory->update($request->all());

        return 'Client Category updated successfully.';
    }

    public function destroy($id)
    {
        $ClientCategory= ClientCategory::find($id);
        if ($ClientCategory) {
             $ClientCategory->delete();

            return 'Client Category deleted successfully.';
        }
        return 'Client Category not found.';

       
    }
}
