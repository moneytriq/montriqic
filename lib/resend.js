import { Resend } from "resend";

export const resend = new Resend("re_5z8qbXt4_2czZMVHgN1arNoZA4pBE2321");
// export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(name, email, tel, message) {
  const response = await resend.emails.send({
    from: process.env.WEBMAIL_USER,
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

export async function welcomeEmail(email) {
  console.log("sending mail", email);

  const response = await resend.emails.send({
    from: process.env.WEBMAIL_USER,
    to: email,
    subject: "Welcome to Monetriq!",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        
        <!-- Header -->
        <div style="background-color: #007bff; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">Welcome to Monetriq!</h1>
        </div>

        <!-- Body -->
        <div style="padding: 30px; text-align: center;">
          <p style="font-size: 16px;">Hi there,</p>
          <p style="font-size: 16px;">
            Your account has been successfully created. We're thrilled to have you on board!
          </p>
          <p style="font-size: 16px;">
            Please go and verify your email address to get started and unlock all the amazing features Monetriq has to offer.
          </p>

        </div>

        <!-- Footer -->
        <div style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #777;">
          &copy; ${new Date().getFullYear()} Monetriq Inc. All rights reserved.<br>
        
        </div>
      </div>
    `,
  });

  console.log("Email Response:", response);
}
