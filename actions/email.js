"use server";
import { welcomeEmail } from "../lib/resend.js";

export async function sendWelcomeEmail(email) {
  try {
    await welcomeEmail(email);
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return {
      success: false,
    };
  }

  return {
    success: true,
  };
}
