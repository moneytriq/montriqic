"use server";

import { supabase } from "@/lib/db/supabaseClient";

export async function resetPassword(prevState, formData) {
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  let errors = {};

  if (!password || password.trim().length < 8) {
    errors.password = "Password must be atleast 8 characters long.";
  }
  if (password?.trim() !== confirmPassword?.trim()) {
    errors.confirmPassword = "Passwords must match.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    console.log(error);

    return {
      success: false,
      authError: "Failed to change password",
    };
  }

  return {
    success: true,
    authError: null,
  };
}
