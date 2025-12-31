"use server";
import {
  approveUserDepositRequestEmail,
  approveUserKycRequestEmail,
  approveUserWithdrawRequestEmail,
  denyUserDepositRequestEmail,
  denyUserKycRequestEmail,
  denyUserWithdrawRequestEmail,
  userDepositRequest,
  userInvestmentEmail,
  userKycRequest,
  userWithdrawRequest,
  welcomeEmail,
} from "../lib/resend.js";

export async function sendWelcomeEmail(email, timeoutMs = 5000) {
  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Email request timed out")), timeoutMs)
    );

    await Promise.race([welcomeEmail(email), timeoutPromise]);

    return { success: true };
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return { success: false };
  }
}

export async function sendUserDepositRequestEmail(
  email,
  amount,
  timeoutMs = 5000
) {
  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Email request timed out")), timeoutMs)
    );

    await Promise.race([userDepositRequest(email, amount), timeoutPromise]);

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false };
  }
}
export async function sendApproveUserDepositRequestEmail(
  email,
  amount,
  timeoutMs = 5000
) {
  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Email request timed out")), timeoutMs)
    );

    await Promise.race([
      approveUserDepositRequestEmail(email, amount),
      timeoutPromise,
    ]);

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false };
  }
}
export async function sendDenyUserDepositRequestEmail(
  email,
  amount,
  timeoutMs = 5000
) {
  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Email request timed out")), timeoutMs)
    );

    await Promise.race([
      denyUserDepositRequestEmail(email, amount),
      timeoutPromise,
    ]);

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false };
  }
}

export async function sendUserInvestmentEmail(
  email,
  amount,
  planName,
  timeoutMs = 5000
) {
  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Email request timed out")), timeoutMs)
    );

    await Promise.race([
      userInvestmentEmail(email, amount, planName),
      timeoutPromise,
    ]);

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false };
  }
}

export async function sendUserWithdrawRequestEmail(
  email,
  amount,
  timeoutMs = 5000
) {
  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Email request timed out")), timeoutMs)
    );

    await Promise.race([userWithdrawRequest(email, amount), timeoutPromise]);

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false };
  }
}
export async function sendApproveUserWithdrawRequestEmail(
  email,
  amount,
  timeoutMs = 5000
) {
  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Email request timed out")), timeoutMs)
    );

    await Promise.race([
      approveUserWithdrawRequestEmail(email, amount),
      timeoutPromise,
    ]);

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false };
  }
}
export async function sendDenyUserWithdrawRequestEmail(
  email,
  amount,
  timeoutMs = 5000
) {
  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Email request timed out")), timeoutMs)
    );

    await Promise.race([
      denyUserWithdrawRequestEmail(email, amount),
      timeoutPromise,
    ]);

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false };
  }
}


export async function sendUserKycRequestEmail(
  email,
  timeoutMs = 5000
) {
  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Email request timed out")), timeoutMs)
    );

    await Promise.race([userKycRequest(email), timeoutPromise]);

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false };
  }
}
export async function sendApproveUserKycRequestEmail(
  email,
  timeoutMs = 5000
) {
  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Email request timed out")), timeoutMs)
    );

    await Promise.race([approveUserKycRequestEmail(email), timeoutPromise]);

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false };
  }
}
export async function sendDenyUserKycRequestEmail(
  email,
  timeoutMs = 5000
) {
  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Email request timed out")), timeoutMs)
    );

    await Promise.race([denyUserKycRequestEmail(email), timeoutPromise]);

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false };
  }
}
// "use server";
// import { welcomeEmail } from "../lib/resend.js";

// export async function sendWelcomeEmail(email) {
//   try {
//     await welcomeEmail(email);
//   } catch (error) {
//     console.error("Error sending welcome email:", error);
//     return {
//       success: false,
//     };
//   }

//   return {
//     success: true,
//   };
// }
