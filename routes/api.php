<?php

use App\Http\Controllers\Api\ArticleController;
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

Route::get('/get-user-info', [UserController::class, 'getUserInfo'])->name('api.get.user.info');

Route::get('/status', [UserController::class, 'status'])->name('api.status');
Route::get('/update-last-login', [UserController::class, 'updateLastLogin'])->name('api.update.last.login');

Route::post('/save-favorite-image', [UserController::class, 'saveFavoriteImage'])->name('api.save.favorite.image');
Route::post('/save-favorite-new', [UserController::class, 'saveFavoriteNew'])->name('api.save.favorite.new');
Route::get('/get-user-favorite-images', [UserController::class, 'getFavoriteImages'])->name('api.get.user.favorite.images');
Route::get('/get-user-favorite-news', [UserController::class, 'getFavoriteNews'])->name('api.get.user.favorite.news');

Route::get('/get-user-subscriptions', [UserController::class, 'getUserSubscriptions'])->name('api.get.user.subscriptions');
Route::post('/toggle-subscription', [UserController::class, 'toggleSubscription'])->name('api.toggle.subscription');

Route::get('/set-writer-role', [UserController::class, 'setWriterRole'])->name('api.set.writer.role');
Route::post('/save-article', [ArticleController::class, 'saveArticle'])->name('api.save.article');
Route::get('/get-articles', [ArticleController::class, 'index'])->name('api.get.articles');
