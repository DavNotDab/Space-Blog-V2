<?php

namespace App\Http\Controllers\Api;

use App\Lib\Email;
use App\Models\FavoriteImage;
use App\Models\FavoriteNew;
use App\Models\Subscription;
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
        if (Auth::check()) {
            $user = Auth::user();
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

    /**
     * Stores the id of an new as favorite for the user.
     */
    public function saveFavoriteNew(Request $request): bool|array
    {
        $user = Auth::user();

        if ($user) {
            // Check if the new has been already saved as favorite
            $fav_new = FavoriteNew::where([
                'user_id' => $user->id,
                'new_id' => $request->new_id
            ])
                ->first();

            // If it has not been saved, save it
            if (!$fav_new) {
                $fav_new = FavoriteNew::create([
                    'user_id' => $user->id,
                    'new_id' => $request->new_id
                ]);
            }
            else {
                // If it has been saved, delete it
                $fav_new->delete();

                return [$fav_new, false];
            }

            return [$fav_new, $this->subscribeToPublisher($request->publisher)];
        }

        return false;
    }

    /**
     * Returns the news saved as favorite by the user.
     */
    public function getFavoriteNews()
    {
        $user = Auth::user();

        if ($user) {
            return FavoriteNew::where('user_id', $user->id)
                ->get();
        }

        return false;
    }

    /**
     * Subscribes the user to the publisher.
     */
    public function subscribeToPublisher(string $publisher): bool
    {
        $user = Auth::user();

        if ($user) {
            $user = User::find($user->id);

            $publishers = $this->getUserSubscriptions()->pluck('publisher')->toArray();

            if (!in_array($publisher, $publishers)) {
                $subscription = new Subscription();
                $subscription->user_id = $user->id;
                $subscription->publisher = $publisher;
                $subscription->save();

                $this->sendSubscriptionEmail($publisher);

                return true;
            }
        }

        return false;
    }

    /**
     * Get all the publishers the user is subscribed to.
     */
    public function getUserSubscriptions()
    {
        $user = Auth::user();

        if ($user) {
            return Subscription::where([
                'user_id' => $user->id
            ])
                ->get();
        }

        return false;
    }

    /**
     * Sends an email to the user with the subscription information.
     */
    public function sendSubscriptionEmail($publisher): bool
    {
        $user = Auth::user();

        if ($user) {
            $user = User::find($user->id);

            $mailer = new Email($user, $publisher);
            $mailer->sendSubscriptionConfirmation();

            return true;
        }

        return false;
    }

    /**
     * Toggle the user's subscription to a publisher.
     */
    public function toggleSubscription(Request $request): bool
    {
        $user = Auth::user();

        if ($user) {
            $user = User::find($user->id);

            $subscription = Subscription::where([
                'user_id' => $user->id,
                'publisher' => $request->publisher
            ])
                ->first();

            if ($subscription) {
                $subscription->active = !$subscription->active;
                $subscription->save();

                return true;
            }
            else {
                return false;
            }
        }

        return false;
    }

    /**
     * Returns the user's information.
     */
    public function getUserInfo(): bool|array
    {
        $user = Auth::user();

        if ($user) {
            $user->hasRole('reader') ? $role = 'reader' : $role = 'writer';

            $user = User::find($user->id);

            return [
                'name' => $user->name,
                'email' => $user->email,
                'role' => $role,
                'last_login' => $user->last_login
            ];
        }

        return false;
    }

    /**
     * Sets the user's role to writer.
     */
    public function setWriterRole(): bool
    {
        $user = Auth::user();

        if ($user) {
            $user = User::find($user->id);

            $user->removeRole('reader');
            $user->assignRole('writer');

            $email = new Email($user, "null");
            $email->sendUpgradeEmail();

            return true;
        }

        return false;
    }

}
