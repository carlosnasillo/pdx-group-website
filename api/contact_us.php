<?php
require '../vendor/autoload.php';

$name           = $_REQUEST['name'];
$email_address  = $_REQUEST['email'];
$message        = $_REQUEST['message'];

$email_body =   "You have received a new message from your website contact form.\n\n".
                "Here are the details:\n
                    Name: $name\n
                    Email: $email_address\n\n
                    Message:\n\n$message
                ";


$sendgrid = new SendGrid('app47789609@heroku.com', 'qdspdyet7858');

$message = new SendGrid\Email();
$message->addTo('hello@latticemarkets.com')->
          setFrom('web_query@pdx.technology')->
          setSubject('<PDX contact form: New Enquiry>')->
          setText("$email_body")->
          setHtml(nl2br($email_body));

try {
    $sendgrid->send($message);
} catch(SendGrid\Exception $e) {
    echo $e->getCode();
    foreach($e->getErrors() as $er) {
        echo $er;
    }
}

return true;
?>
