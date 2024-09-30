<?php

use App\Http\Controllers\CaseCategoryController;
use App\Http\Controllers\CaseController;
use App\Http\Controllers\CaseGradeController;
use App\Http\Controllers\CasesPartiesController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\ClientCategoryController;
use App\Http\Controllers\ClientsController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\PartyController;
use App\Http\Controllers\StateController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourtController;
use App\Http\Controllers\OpposingLawyerController;
use App\Http\Controllers\lawyerController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group(['prefix' => 'case'], function () {

    Route::get('/get', [App\Http\Controllers\CaseController::class, 'get']);

    Route::post('/create', [App\Http\Controllers\CaseController::class, 'create']);

    Route::post('/update', [App\Http\Controllers\CaseController::class, 'update']);

    Route::post('/delete', [App\Http\Controllers\CaseController::class, 'delete']);
});

// Route::resource('users', 'UsersController');

// Gives you these named routes:

// Verb          Path                        Action  Route Name
// GET           /users                      index   users.index
// // GET           /users/create               create  users.create
// POST          /users                      store   users.store
// GET           /users/{user}               show    users.show
// GET           /users/{user}/edit          edit    users.edit
//  //PUT|PATCH     /users/{user}               update  users.update
// DELETE        /users/{user}               destroy users.destroy
Route::apiResource('CaseCategories', CaseCategoryController::class);
Route::apiResource('CaseGrades', CaseGradeController::class);
Route::apiResource('parties', PartyController::class);
Route::apiResource('CasesParties', CasesPartiesController::class);
Route::apiResource('Cases',CaseController::class);
Route::apiResource('Clients', ClientsController::class);
Route::apiResource('ClientCategories',ClientCategoryController::class);


// Countries
Route::get('/Countries', CountryController::class.'@index');
Route::get('/Countries/{id}', CountryController::class.'@show');
Route::get('/Countries/{id}/Cities', CountryController::class.'@City');

// States
Route::get('/States', StateController::class.'@index');
Route::get('/States/{id}', StateController::class.'@show');

// Cities
Route::get('/Cities', CityController::class.'@index');
Route::get('/Cities/{id}', CityController::class.'@show');

// Court 
Route::apiResource('courts',CourtController::class);

//lawyers
Route::apiResource('lawyers',lawyerController::class);

//opposing lawyers
Route::apiResource('opposinglawyers',OpposingLawyerController::class);


