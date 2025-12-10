import nodemailer from "nodemailer";

// export const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_APP_PASS,
//   },
// });

import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "atlas.myhostlpl.com",
  port: 465, 
  secure: true,
  auth: {
    user: process.env.WEBMAIL_USER,
    pass: process.env.WEBMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export async function sendEmail(name, email, tel, message) {
  const mailOptions = {
    from: process.env.WEBMAIL_USER,
    replyTo: email,
    to: process.env.WEBMAIL_USER,
    subject: `New message from ${name}`,
    text: `Name: ${name} \nEmail: ${email}\nPhone: ${tel}\nMessage: ${message}`,
  };
  const info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info?.messageId);
}
