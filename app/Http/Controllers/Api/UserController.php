<?php

namespace App\Http\Controllers\Api;

use App\Models\FavoriteImage;
use App\Models\User;
use App\Services\UserStatusService;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController
{
    public function index(): ?Authenticatable
    {
        return Auth::user();
    }

    /**
     * Returns the app's status.
     */
    public function status(UserStatusService $userStatusService): array
    {
        return $userStatusService->getCurrentState();
    }

    /**
     * Updates the last login date of the user in the database.
     */
    public function updateLastLogin()
    {
        $user = Auth::user();

        if ($user) {
            $user = User::find($user->id);

            $date = date('Y-m-d H:i:s');

            $user->last_login = $date;
            $user->save();

            return $user;
        }

        return false;
    }

    /**
     * Stores the id of an image as favorite for the user.
     */
    public function saveFavoriteImage(Request $request)
    {
        $user = Auth::user();

        if ($user) {
            // Check if the image has been already saved as favorite
            $fav_img = FavoriteImage::where([
                'user_id' => $user->id,
                'image_id' => $request->image_id
            ])
                ->first();

            // If it has not been saved, save it
            if (!$fav_img) {
                $fav_img = FavoriteImage::create([
                    'user_id' => $user->id,
                    'image_id' => $request->image_id
                ]);
            }
            else {
                // If it has been saved, delete it
                $fav_img->delete();
            }

            return $fav_img;
        }

        return false;
    }

    /**
     * Returns the images saved as favorite by the user.
     */
    public function getFavoriteImages()
    {
        $user = Auth::user();

        if ($user) {
            return FavoriteImage::where('user_id', $user->id)
                ->get();
        }

        return false;
    }
}
