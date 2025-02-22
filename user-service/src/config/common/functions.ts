export const otpHtml=(OTP:number)=>{
return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            text-align: center;
            padding: 20px;
        }
        .container {
            background: #ffffff;
            max-width: 400px;
            margin: 0 auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #2d89ff;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>OTP Verification</h2>
        <p>Your One-Time Password (OTP) for verification is:</p>
        <p class="otp">${OTP}</p>
        <p>This OTP is valid for 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <div class="footer">
            <p>© 2025 FOS Social. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`}