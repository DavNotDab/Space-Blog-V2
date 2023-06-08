<?php
namespace App\Lib;
use App\Models\User;
use Exception;
use PHPMailer\PHPMailer\PHPMailer;

class Email
{
    private string $email;
    private string $username;
    private string $publisher;

    public function __construct(User $user, string $publisher) {
        $this->email = $user->email;
        $this->username = $user->name;
        $this->publisher = $publisher;
    }

    public function sendSubscriptionConfirmation(): void
    {
        $phpmailer = new PHPMailer();
        $phpmailer->isSMTP();
        $phpmailer->Host = $_ENV['MAIL_HOST'];
        $phpmailer->SMTPAuth = true;
        $phpmailer->Port = $_ENV['MAIL_PORT'];
        $phpmailer->Username = $_ENV['MAIL_USERNAME'];
        $phpmailer->Password = $_ENV['MAIL_PASSWORD'];

        try {
            $phpmailer->setFrom($_ENV['MAIL_FROM_ADDRESS']);
            $phpmailer->addAddress($this->email);
            $phpmailer->Subject = 'New subscription';

            $phpmailer->isHTML();
            $phpmailer->CharSet = 'UTF-8';

            $content = '<html lang="en">
            <head>
                <title>Subscription confirmation</title>

                <style>
                    body {
                        margin-top: 10%;
                        font-family: Arial, Helvetica, sans-serif;
                        background-color: #1D1A1D;
                        color: #F7F6EF;
                        text-align: center;
                    }
                    a {
                        color: #DB9562;
                    }
                </style>

            </head>
            <body>
                <h1>Subscription confirmation</h1>
                <h2>Hello '.$this->username.'</h2>
                <h3>You have been successfully subscribed to '.$this->publisher.'\'s newsletter!</h3>
                <p>You will receive an email each time a new notice from your publisher get published</p>
                <br>
                <a href="http://space-blog/profile">See my subscriptions</a>
            </body>
        </html>';

            $phpmailer->Body = $content;
            $phpmailer->send();
        }
        catch (Exception) {
            echo 'Could not sent the message: ' . $phpmailer->ErrorInfo;
            var_dump($this->email); die();
        }
    }

    public function sendNewNoticeNotification(): void
    {
        $phpmailer = new PHPMailer();
        $phpmailer->isSMTP();
        $phpmailer->Host = $_ENV['MAIL_HOST'];
        $phpmailer->SMTPAuth = true;
        $phpmailer->Port = $_ENV['MAIL_PORT'];
        $phpmailer->Username = $_ENV['MAIL_USERNAME'];
        $phpmailer->Password = $_ENV['MAIL_PASSWORD'];

        try {
            $phpmailer->setFrom($_ENV['MAIL_FROM_ADDRESS']);
            $phpmailer->addAddress($this->email);
            $phpmailer->Subject = 'New notice from '.$this->publisher;

            $phpmailer->isHTML();
            $phpmailer->CharSet = 'UTF-8';

            $content = '<html lang="en">
            <head>
                <title>New notice</title>

                <style>
                    body {
                        margin-top: 10%;
                        font-family: Arial, Helvetica, sans-serif;
                        background-color: #1D1A1D;
                        color: #F7F6EF;
                        text-align: center;
                    }
                    a {
                        color: #DB9562;
                    }
                </style>

            </head>
            <body>
                <h1>New notice from '.$this->publisher.'</h1>
                <h2>Hello '.$this->username.'!</h2>
                <h3>Good news! A new notice from one of your subscribed publishers has been added to our web</h3>
                <br>
                <p>You can check it out <a href="http://space-blog/news">here</a></p>
            </body>
        </html>';

            $phpmailer->Body = $content;
            $phpmailer->send();
        }
        catch (Exception) {
            echo 'Could not sent the message: ' . $phpmailer->ErrorInfo;
            var_dump($this->email); die();
        }
    }

}
