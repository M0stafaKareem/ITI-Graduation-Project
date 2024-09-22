<?php

use App\Http\Controllers\CaseCategoryController;
use App\Http\Controllers\CaseController;
use App\Http\Controllers\CaseGradeController;
use App\Http\Controllers\CasesPartiesController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\ClientsController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\PartyController;

use App\Http\Controllers\StateController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

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

// Countries
Route::get('/countries', CountryController::class.'@index');
Route::get('/countries/{id}', CountryController::class.'@show');

// States
Route::get('/states', StateController::class.'@index');
Route::get('/states/{id}', StateController::class.'@show');

// Cities
Route::get('/cities', CityController::class.'@index');
Route::get('/cities/{id}', CityController::class.'@show');


