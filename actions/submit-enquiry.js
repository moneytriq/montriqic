"use server";
import { sendEmail } from "@/lib/nodemailer";
import xss from "xss";
export default async function submitEnquiry(prevState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const tel = formData.get("tel");
  const message = xss(formData.get("message"));
  const checkBox = formData.get("checkbox");

  console.log(name, email, tel, checkBox, message);

  let errors = {};

  if (!checkBox) {
    errors.check = true;
    return { errors };
  }

  if (!name || name.trim().length < 3) {
    errors.name = "First name must be atleast 3 characters";
  }
  if (!email || !email.includes("@")) {
    errors.email = "Please enter a valid email address";
  }

  if (!tel || tel.trim().length < 7) {
    errors.tel = "Phone number too short digits.";
  }

  if (!message || message.trim().length < 3) {
    errors.message = "Message is too short";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  try {
    await sendEmail(
      name,
      email,
      tel,
      message
    );
  } catch (error) {
    throw Error("Error sending mail");
  }

  return { success: true, errors: null };
}
