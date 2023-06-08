<?php

namespace App\Console;

use App\Lib\Email;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // $schedule->command('inspire')->hourly();
        $schedule->call(function () {
            $response = file_get_contents('https://api.spaceflightnewsapi.net/v3/articles?_limit=1');

            $last_publisher = json_decode($response, true)[0]['newsSite'];

            $subscriptions = Subscription::where([
                'publisher' => $last_publisher,
                'active' => true
            ])
                ->get()
                ->toArray();

            $subscribers = array_map(function ($subscription) {
                return User::find($subscription['user_id']);
            }, $subscriptions);

            foreach ($subscribers as $subscriber) {
                $mailer = new Email($subscriber, $last_publisher);
                $mailer->sendNewNoticeNotification();
            }

        })->everyMinute();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
