<?php

  // Only process POST reqeusts.
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form fields and remove whitespace.
    $name = strip_tags(trim($_POST["name"]));
    $name = str_replace(array("\r","\n"),array(" "," "),$name);
    $mail = filter_var(trim($_POST["mail"]), FILTER_SANITIZE_EMAIL);
    $content = strip_tags(trim($_POST["content"]));

    // Check that data was sent to the mailer.
    //if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    if ( empty($name) OR empty($mail) OR empty($content) ) {
      // Set a 400 (bad request) response code and exit.
      http_response_code(400);
      echo "400 bad request";
      exit;
    }

    // ------------------------------------
    // For Common
    // ------------------------------------
    // Build the email content.
    $email_content = "";
    $email_content .= "name: $name\n";
    $email_content .= "email: $mail\n";
    $email_content .= "content:\n$content\n";

    // ------------------------------------
    // For Admin
    // ------------------------------------
    // Set the recipient email address.
    // FIXME: Update this to your desired email address.
    $recipient_admin = "info@tplh.net";

    // Set the email subject.
    $subject_admin = "[www.tplh.net] message from $name";

    // Build the email content.
    $email_content_admin .= "you received a new message from the website.\n\n";
    $email_content_admin .= $email_content;

    // Build the email headers.
    $email_headers_admin = "From: $name <$mail>";

    // ------------------------------------
    // For User
    // ------------------------------------
    // Set the recipient email address.
    // FIXME: Update this to your desired email address.
    $recipient_user = $mail;

    // Set the email subject.
    $subject_user = "[www.tplh.net] thanks for message.";

    // Build the email content.
    $email_content_user .= "Dear $name.\n\nyou sent message successfully.\n\n";
    $email_content_user .= "$email_content\n";

    // Build the email headers.
    $email_headers_user = "From: yoichi kobayashi <info@tplh.net>";

    // Send the email.
    if (
      mail($recipient_admin, $subject_admin, $email_content_admin, $email_headers_admin) &&
      mail($recipient_user, $subject_user, $email_content_user, $email_headers_user)
    ) {
      // Set a 200 (okay) response code.
      http_response_code(200);
      echo "200 send mail";
    } else {
      // Set a 500 (internal server error) response code.
      http_response_code(500);
      echo "500 internal server error";
    }

  } else {
    // Not a POST request, set a 403 (forbidden) response code.
    http_response_code(403);
    echo "403 forbidden";
  }

?>
