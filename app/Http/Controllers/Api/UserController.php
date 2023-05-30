<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Services\UserStatusService;
use Illuminate\Contracts\Auth\Authenticatable;
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
}
