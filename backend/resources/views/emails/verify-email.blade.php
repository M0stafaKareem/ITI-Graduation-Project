<!-- resources/views/auth/otp.blade.php -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
            color: #4A90E2;
            text-align: center;
        }

        .verification-link {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            margin: 20px 0;
        }

        .link {
            display: inline-block;
            background-color: #4A90E2;
            color: white !important;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
            margin-top: 10px;
        }

        .link:visited {
            color: white !important;
        }

        .note {
            margin-top: 20px;
            text-align: center;
            font-size: 14px;
            color: #666;
        }
    </style>
</head>

<body>

    <div class="container">
        <h2>Verify Your Email Address</h2>

        <div class="verification-link">
            <h3>Your Verification Link:</h3>
            <a href="{{ $verificationUrl }}" class="link">Click Here to Verify Your Email</a>
        </div>

        <p class="note">If you did not request this email, please ignore it.</p>

        <p style="text-align: center;">Thanks,<br>{{ config('app.name') }}</p>
    </div>

</body>

</html>