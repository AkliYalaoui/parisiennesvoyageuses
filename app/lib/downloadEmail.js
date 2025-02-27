import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, //  Ignore self-signed certificate errors
  },
});

const generateEmailContent = (name, link) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Guide is Ready!</title>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); }
        .header { text-align: center; padding: 20px; }
        .header img { max-width: 100px; }
        .content { text-align: center; color: #333; }
        .content h1 { color: #007bff; font-size: 24px; }
        .content p { font-size: 16px; margin-bottom: 20px; }
        .btn { display: inline-block; padding: 12px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold; }
        .btn:hover { background: #0056b3; }
        .footer { text-align: center; font-size: 14px; color: #777; padding-top: 20px; border-top: 1px solid #ddd; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="${
            process.env.NEXT_PUBLIC_SERVER_URL
          }/ig/profile.jpg" alt="Company Logo">
        </div>
        <div class="content">
          <h1>Your Guide is Ready!</h1>
          <p>Hi <strong>${name}</strong>,</p>
          <p>Thank you for your purchase! Click the button below to download your guide:</p>
          <a href="${link}" class="btn">Download Now</a>
          <p><small>This link is valid for 24 hours. If you have any issues, contact us at <a href="mailto:info@parisiennesvoyageuses.com">info@parisiennesvoyageuses.com</a>.</small></p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Parisiennes Voyageuses. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;
};

export default async function sendEmail(name, email, subject, link) {
  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_USER, // sender address
      to: email,
      subject: subject, // Subject line
      html: generateEmailContent(name, link),
    });

    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.error(err);
  }
}
