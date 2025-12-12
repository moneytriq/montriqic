import nodemailer from "nodemailer";


export const transporter = nodemailer.createTransport({
  host: "mail.monetriq.com", 
  port: 587,
  secure: false,
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
