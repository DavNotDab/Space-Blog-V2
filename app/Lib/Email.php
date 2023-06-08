<?php
namespace App\Lib;
use App\Models\User;
use Exception;
use PHPMailer\PHPMailer\PHPMailer;

class Email
{
    private string $email;
    private string $username;

    public function __construct(User $user, ) {
        $this->email = $user->email;
        $this->username = $user->name;
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
            </head>
            <body>
                <h1>Subscription confirmation</h1>
                <p>Hello '.$this->username.'</p>
                <p>You have been successfully subscribed to </p>
                <a href="/public/confirmarCuenta/' . $this->    token . '">Confirmar cuenta</a>
            </body>
        </html>';

            $phpmailer->Body = $content;
            $phpmailer->send();
        }
        catch (Exception) {
            echo 'Error al enviar el correo: ' . $phpmailer->ErrorInfo;
            var_dump($this->email); die();
        }
    }

}
