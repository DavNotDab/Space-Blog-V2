<?php

use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/status', [UserController::class, 'status'])->name('api.status');
Route::get('/update-last-login', [UserController::class, 'updateLastLogin'])->name('api.update.last.login');

Route::post('/save-favorite-image', [UserController::class, 'saveFavoriteImage'])->name('api.save.favorite.image');
Route::post('/save-favorite-new', [UserController::class, 'saveFavoriteNew'])->name('api.save.favorite.new');
Route::get('/get-user-favorite-images', [UserController::class, 'getFavoriteImages'])->name('api.get.user.favorite.images');
Route::get('/get-user-favorite-news', [UserController::class, 'getFavoriteNews'])->name('api.get.user.favorite.news');
