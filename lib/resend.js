import { Resend } from "resend";

// export const resend = new Resend("re_5z8qbXt4_2czZMVHgN1arNoZA4pBE2321");
export const resend = new Resend(process.env.RESEND_API_KEY);

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

              <p style="font-size: 14px; margin-top: 3rem; text-align: center;">
           If you have any questions or need assistance, feel free to reach out to our support team at Info@monetriq.com or via or in app chat.
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

export async function userDepositRequest(email, amount) {
  console.log("sending mail", email);
  let subject = `Deposit Request!`;
  let title = `Monetriq`;
  let firstP = `You have successfully made a ${amount} USD deposit request!`;
  let lastP =
    "Your request has been recieved and will be processed within 1 hour. Thank you for choosing Monetriq!";

  const response = await resend.emails.send({
    from: process.env.WEBMAIL_USER,
    to: email,
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        
        <!-- Header -->
        <div style="background-color: #007bff; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">${title}</h1>
        </div>

        <!-- Body -->
        <div style="padding: 30px; text-align: center;">
          <p style="font-size: 16px;">Hi there,</p>
          <p style="font-size: 16px;">
           ${firstP}
          </p>
          <p style="font-size: 16px;">
           ${lastP}
          </p>

              <p style="font-size: 14px; margin-top: 3rem; text-align: center;">
           If you have any questions or need assistance, feel free to reach out to our support team at Info@monetriq.com or via or in app chat.
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

export async function approveUserDepositRequestEmail(email, amount) {
  console.log("sending mail", email);
  let subject = `Deposit Confirmed!`;
  let title = `Monetriq`;
  let firstP = `Deposit of ${amount} USD has been confirmed!`;
  let lastP = `${amount} USD has been credited to your wallet on Monetriq. Kindly visit your dashboard to check your available balance. Thank you for choosing Monetriq!`;

  const response = await resend.emails.send({
    from: process.env.WEBMAIL_USER,
    to: email,
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        
        <!-- Header -->
        <div style="background-color: #007bff; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">${title}</h1>
        </div>

        <!-- Body -->
        <div style="padding: 30px; text-align: center;">
          <p style="font-size: 16px;">Hi there,</p>
          <p style="font-size: 16px;">
           ${firstP}
          </p>
          <p style="font-size: 16px;">
           ${lastP}
          </p>

              <p style="font-size: 14px; margin-top: 3rem; text-align: center;">
           If you have any questions or need assistance, feel free to reach out to our support team at Info@monetriq.com or via or in app chat.
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
export async function denyUserDepositRequestEmail(email, amount) {
  console.log("sending mail", email);
  let subject = `Deposit Denied!`;
  let title = `Monetriq`;
  let firstP = `Deposit request of ${amount} USD was denied!`;
  let lastP = `This is because your deposit was not recieved. Kindly contact us via email @ Info@monetriq.com or contact support in app for any compliants. Thank you for choosing Monetriq!`;

  const response = await resend.emails.send({
    from: process.env.WEBMAIL_USER,
    to: email,
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        
        <!-- Header -->
        <div style="background-color: #007bff; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">${title}</h1>
        </div>

        <!-- Body -->
        <div style="padding: 30px; text-align: center;">
          <p style="font-size: 16px;">Hi there,</p>
          <p style="font-size: 16px;">
           ${firstP}
          </p>
          <p style="font-size: 16px;">
           ${lastP}
          </p>

              <p style="font-size: 14px; margin-top: 3rem; text-align: center;">
           If you have any questions or need assistance, feel free to reach out to our support team at Info@monetriq.com or via or in app chat.
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

export async function userInvestmentEmail(email, amount, planName) {
  console.log("sending mail", email);
  let subject = `Investment in ${planName} plan`;
  let title = `Monetriq`;
  let firstP = `You have successfully made an investment of ${amount} USD into the ${planName} plan!`;
  let lastP =
    "Kindly check your investment dashboard for more info. Thank you for choosing Monetriq!";

  const response = await resend.emails.send({
    from: process.env.WEBMAIL_USER,
    to: email,
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        
        <!-- Header -->
        <div style="background-color: #007bff; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">${title}</h1>
        </div>

        <!-- Body -->
        <div style="padding: 30px; text-align: center;">
          <p style="font-size: 16px;">Hi there,</p>
          <p style="font-size: 16px;">
           ${firstP}
          </p>
          <p style="font-size: 16px;">
           ${lastP}
          </p>

              <p style="font-size: 14px; margin-top: 3rem; text-align: center;">
           If you have any questions or need assistance, feel free to reach out to our support team at Info@monetriq.com or via or in app chat.
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

export async function userWithdrawRequest(email, amount) {
  console.log("sending mail", email);
  let subject = `Withdrawal Request!`;
  let title = `Monetriq`;
  let firstP = `You have successfully made a ${amount} USD withdrawal request!`;
  let lastP =
    "Your request has been recieved and will be processed within 1 hour. Thank you for choosing Monetriq!";

  const response = await resend.emails.send({
    from: process.env.WEBMAIL_USER,
    to: email,
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        
        <!-- Header -->
        <div style="background-color: #007bff; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">${title}</h1>
        </div>

        <!-- Body -->
        <div style="padding: 30px; text-align: center;">
          <p style="font-size: 16px;">Hi there,</p>
          <p style="font-size: 16px;">
           ${firstP}
          </p>
          <p style="font-size: 16px;">
           ${lastP}
          </p>

              <p style="font-size: 14px; margin-top: 3rem; text-align: center;">
           If you have any questions or need assistance, feel free to reach out to our support team at Info@monetriq.com or via or in app chat.
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

export async function approveUserWithdrawRequestEmail(email, amount) {
  console.log("sending mail", email);
  let subject = `Withdrawal Confirmed!`;
  let title = `Monetriq`;
  let firstP = `Withdrawal of ${amount} USD has been confirmed!`;
  let lastP = `Congratulations! ${amount} USD has been credited to your provided USDT wallet . Kindly visit your dashboard for more info. Thank you for choosing Monetriq!`;

  const response = await resend.emails.send({
    from: process.env.WEBMAIL_USER,
    to: email,
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        
        <!-- Header -->
        <div style="background-color: #007bff; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">${title}</h1>
        </div>

        <!-- Body -->
        <div style="padding: 30px; text-align: center;">
          <p style="font-size: 16px;">Hi there,</p>
          <p style="font-size: 16px;">
           ${firstP}
          </p>
          <p style="font-size: 16px;">
           ${lastP}
          </p>

              <p style="font-size: 14px; margin-top: 3rem; text-align: center;">
           If you have any questions or need assistance, feel free to reach out to our support team at Info@monetriq.com or via or in app chat.
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

export async function denyUserWithdrawRequestEmail(email, amount) {
  console.log("sending mail", email);
  let subject = `Withdrawal Denied!`;
  let title = `Monetriq`;
  let firstP = `Withdrawal request of ${amount} USD was denied!`;
  let lastP = `This is because you have not met with the required terms and conditions to be eligible for this withdrawal. Kindly contact support at Info@monetriq.com or via in app chat for more information and further assistance. Thank you for choosing Monetriq!`;

  const response = await resend.emails.send({
    from: process.env.WEBMAIL_USER,
    to: email,
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        
        <!-- Header -->
        <div style="background-color: #007bff; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">${title}</h1>
        </div>

        <!-- Body -->
        <div style="padding: 30px; text-align: center;">
          <p style="font-size: 16px;">Hi there,</p>
          <p style="font-size: 16px;">
           ${firstP}
          </p>
          <p style="font-size: 16px;">
           ${lastP}
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

export async function userKycRequest(email) {
  console.log("sending mail", email);
  let subject = `KYC Verification in Review!`;
  let title = `Monetriq`;
  let firstP = `You have successfully submitted you KYC information and is currently under review!`;
  let lastP =
    "You will be notified after we review your information. Thank you for choosing Monetriq!";

  const response = await resend.emails.send({
    from: process.env.WEBMAIL_USER,
    to: email,
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        
        <!-- Header -->
        <div style="background-color: #007bff; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">${title}</h1>
        </div>

        <!-- Body -->
        <div style="padding: 30px; text-align: center;">
          <p style="font-size: 16px;">Hi there,</p>
          <p style="font-size: 16px;">
           ${firstP}
          </p>
          <p style="font-size: 16px;">
           ${lastP}
          </p>

              <p style="font-size: 14px; margin-top: 3rem; text-align: center;">
           If you have any questions or need assistance, feel free to reach out to our support team at Info@monetriq.com or via or in app chat.
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
export async function approveUserKycRequestEmail(email) {
  console.log("sending mail", email);
  let subject = `KYC Verification Approved!`;
  let title = `Monetriq`;
  let firstP = `We are happy to inform you that your KYC verification has been successfully approved.`;
  let lastP =
    "You now have full access to all features on Monetriq. Thank you for completing the verification process!";

  const response = await resend.emails.send({
    from: process.env.WEBMAIL_USER,
    to: email,
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        
        <!-- Header -->
        <div style="background-color: #007bff; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">${title}</h1>
        </div>

        <!-- Body -->
        <div style="padding: 30px; text-align: center;">
          <p style="font-size: 16px;">Hi there,</p>
          <p style="font-size: 16px;">
           ${firstP}
          </p>
          <p style="font-size: 16px;">
           ${lastP}
          </p>
          <p style="font-size: 14px; margin-top: 3rem; text-align: center;">
           If you have any questions or need assistance, feel free to reach out to our support team at Info@monetriq.com or via or in app chat.
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
export async function denyUserKycRequestEmail(email) {
  console.log("sending mail", email);
  let subject = `KYC Verification Denied!`;
  let title = `Monetriq`;
  let firstP = `We regret to inform you that your KYC verification has been denied.`;
  let lastP =
    "Please ensure you provide valid informations. Also, ensure that you upload clear documents. Thank you for chossing Monetriq!";

  const response = await resend.emails.send({
    from: process.env.WEBMAIL_USER,
    to: email,
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        
        <!-- Header -->
        <div style="background-color: #007bff; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">${title}</h1>
        </div>

        <!-- Body -->
        <div style="padding: 30px; text-align: center;">
          <p style="font-size: 16px;">Hi there,</p>
          <p style="font-size: 16px;">
           ${firstP}
          </p>
          <p style="font-size: 16px;">
           ${lastP}
          </p>
          <p style="font-size: 14px; margin-top: 3rem; text-align: center;">
           If you have any questions or need assistance, feel free to reach out to our support team at Info@monetriq.com or via or in app chat.
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
