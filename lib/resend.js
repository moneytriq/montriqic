import { Resend } from "resend";

// export async function sendEmail(name, email, tel, message) {
//   await resend.emails.send({
//     from: process.env.WEBMAIL_USER,
//     to: "support@monetriq.com",
//     subject: `New message from ${name}`,
//     text: `Name: ${name}\nEmail: ${email}\nPhone: ${tel}\nMessage: ${message}`,
//   });
// }

import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(name, email, tel, message) {
  const response = await resend.emails.send({
    from: process.env.WEBMAIL_USER, // your Webmail address
    to: [process.env.WEBMAIL_USER],
    reply_to: email,
    subject: `New message from ${name}`,
    text: `Name: ${name}
Email: ${email}
Phone: ${tel}
Message: ${message}`,
  });

  console.log("Email Response:", response);
}
