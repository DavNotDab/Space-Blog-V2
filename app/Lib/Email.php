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
    private PHPMailer $phpmailer;

    public function __construct(User $user, string $publisher) {
        $this->email = $user->email;
        $this->username = $user->name;
        $this->publisher = $publisher;

        $this->phpmailer = new PHPMailer(true);
        $this->phpmailer->isSMTP();
        $this->phpmailer->Host = 'smtp.gmail.com';
        $this->phpmailer->SMTPAuth = true;
        $this->phpmailer->SMTPSecure = 'ssl';
        $this->phpmailer->Port = '465';
        $this->phpmailer->Username = 'SpaceBlogV2@gmail.com';
        $this->phpmailer->Password = 'rduwsqoucvdbgoka';
    }

    public function sendSubscriptionConfirmation(): void
    {
        try {
            $this->phpmailer->setFrom('new.subscription@space-blog.com');
            $this->phpmailer->addAddress($this->email);
            $this->phpmailer->Subject = 'New subscription';

            $this->phpmailer->isHTML();
            $this->phpmailer->CharSet = 'UTF-8';

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

            $this->phpmailer->Body = $content;
            $this->phpmailer->send();
        }
        catch (Exception) {
            echo 'Could not sent the message: ' . $this->phpmailer->ErrorInfo;
            var_dump($this->email); die();
        }
    }

    public function sendNewNoticeNotification(): void
    {
        try {
            $this->phpmailer->setFrom('new.notice@space-blog.com');
            $this->phpmailer->addAddress($this->email);
            $this->phpmailer->Subject = 'New notice from '.$this->publisher;

            $this->phpmailer->isHTML();
            $this->phpmailer->CharSet = 'UTF-8';

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

            $this->phpmailer->Body = $content;
            $this->phpmailer->send();
        }
        catch (Exception) {
            echo 'Could not sent the message: ' . $this->phpmailer->ErrorInfo;
            var_dump($this->email); die();
        }
    }

    public function sendUpgradeEmail(): void
    {
        try {
            $this->phpmailer->setFrom('payments@space-blog.com');
            $this->phpmailer->addAddress($this->email);
            $this->phpmailer->Subject = 'New role assigned';

            $this->phpmailer->isHTML();
            $this->phpmailer->CharSet = 'UTF-8';

            $content = '<html lang="en">
            <head>
                <title>New role</title>

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
                <h1>New role adquired</h1>
                <h2>Hello '.$this->username.'!</h2>
                <h3>Good news! You have successfully purchased the <strong>WRITER</strong> role!</h3>
                <br>
                <p>You can start creating blog entries <a href="http://space-blog#blog">here</a></p>
            </body>
        </html>';

            $this->phpmailer->Body = $content;
            $this->phpmailer->send();
        }
        catch (Exception) {
            echo 'Could not sent the message: ' . $this->phpmailer->ErrorInfo;
            var_dump($this->email); die();
        }
    }

}
