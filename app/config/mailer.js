import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const CONTACT_MESSAGE_FIELDS = {
  name: "Name",
  email: "Email",
  subject: "Subject",
  message: "Message",
};

const generateEmailContent = (data) => {
  const stringData = Object.entries(data).reduce(
    (str, [key, val]) =>
      (str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${val} \n\n`),
    ""
  );
  const htmlData = Object.entries(data).reduce((str, [key, val]) => {
    return (str += `
      <div class="form-row">
        <h3 class="form-heading">${CONTACT_MESSAGE_FIELDS[key]}</h3>
        <p class="form-answer">${val}</p>
      </div>
    `);
  }, "");

  return {
    text: stringData,
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Contact Message</title>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f9f9f9;
          color: #333;
        }
        .email-container {
          max-width: 600px;
          margin: 30px auto;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .email-header {
          background: #4caf50;
          color: white;
          text-align: center;
          padding: 20px;
          font-size: 24px;
          font-weight: bold;
        }
        .email-body {
          padding: 20px;
        }
        .form-row {
          margin-bottom: 20px;
        }
        .form-heading {
          font-size: 18px;
          color: #555;
          margin-bottom: 5px;
          font-weight: bold;
        }
        .form-answer {
          font-size: 16px;
          color: #333;
          margin: 0;
        }
        .email-footer {
          background: #f1f1f1;
          text-align: center;
          padding: 10px;
          font-size: 14px;
          color: #777;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          New Contact Message
        </div>
        <div class="email-body">
          ${htmlData}
        </div>
        <div class="email-footer">
          Thank you for reaching out to us. We'll get back to you shortly.
        </div>
      </div>
    </body>
    </html>
    `,
  };
};


export default async function send(name, email, subject, message) {
  const info = await transporter.sendMail({
    from: process.env.MAIL_USER, // sender address
    to: process.env.MAIL_USER,
    subject: subject, // Subject line
    ...generateEmailContent({ name, email, subject, message }),
  });

  console.log("Message sent: %s", info.messageId);
}