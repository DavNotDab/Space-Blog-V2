<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


Route::get('/', function () {
    return view('space-blog');
})->name('home');

// Route for the login page when the user verifies his email
Route::get('/login', function () {
    return view('space-blog');
})->name('login');

Route::view('/{path?}', 'space-blog')
    ->where('path', '.*')
    ->name('react');
