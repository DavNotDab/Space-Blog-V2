<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserStatusService
{
    /**
     * provides data about the current user's state
     */
    public function getCurrentState(): array
    {
        if (Auth::check()) {
            $user = Auth::user();

            return [
                'user' => $user
            ];
        }

        return [
            'user' => null
        ];
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
