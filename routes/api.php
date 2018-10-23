<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/users', 'API\UserController@index');
Route::post('/users', 'API\UserController@store');
Route::delete('/users/{id}', 'API\UserController@destroy');
Route::put('/users/{id}', 'API\UserController@update');
