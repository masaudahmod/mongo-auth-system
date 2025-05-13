export default function otpVerifyMail(userName, otp) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Email Verification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        padding: 30px;
        margin: 0;
      }

      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      .email-header {
        text-align: center;
        color: #333333;
      }

      .email-body {
        font-size: 16px;
        color: #555555;
        line-height: 1.6;
      }

      .otp-box {
        margin: 30px 0;
        text-align: center;
      }

      .otp-code {
        display: inline-block;
        background-color: #111827;
        color: #ffffff;
        font-size: 28px;
        font-weight: bold;
        letter-spacing: 8px;
        padding: 12px 24px;
        border-radius: 6px;
      }

      .email-footer {
        margin-top: 40px;
        font-size: 14px;
        color: #aaaaaa;
        text-align: center;
      }

      @media (max-width: 600px) {
        .otp-code {
          font-size: 22px;
          padding: 10px 20px;
          letter-spacing: 5px;
        }
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <h2 class="email-header">🔐 Email Verification</h2>
      <div class="email-body">
        <p>Hi ${userName},</p>
        <p>
          You requested to verify your email address. Please use the following
          One-Time Password (OTP) to complete your verification:
        </p>
        <div class="otp-box">
          <span class="otp-code">${otp}</span>
        </div>
        <p>
          This OTP is valid for 10 minutes. If you didn’t request this, please
          ignore this email or contact support.
        </p>
      </div>
      <p class="email-footer">
        MERN Auth System • Developed by Masaud Ahmod, ${new Date().getFullYear()}
      </p>
    </div>
  </body>
</html>
`;
}
