export default function accountVerifiedMail(userName) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Account Verified</title>
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
        color: #10b981;
      }

      .email-body {
        font-size: 16px;
        color: #444444;
        line-height: 1.6;
        text-align: center;
      }

      .success-icon {
        font-size: 48px;
        color: #10b981;
        text-align: center;
        margin-bottom: 10px;
      }

      .email-footer {
        margin-top: 40px;
        font-size: 14px;
        color: #aaaaaa;
        text-align: center;
      }

      @media (max-width: 600px) {
        .email-body {
          font-size: 15px;
        }
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="success-icon">✅</div>
      <h2 class="email-header">Account Successfully Verified</h2>
      <div class="email-body">
        <p>Hi ${userName},</p>
        <p>
          Your email has been successfully verified! 🎉<br />
          You're now fully onboarded. Enjoy using our platform with full access.
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
