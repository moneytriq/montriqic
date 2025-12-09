"use server";

import { supabase } from "@/lib/db/supabaseClient";

export async function updateProfileInfo(
  userId,
  fieldName,
  newValue,
  prevState,
  formData
) {
  console.log("v", fieldName, newValue);

  if (fieldName === "phone" && newValue?.trim().length < 7) {
    return {
      success: false,
      error: `${fieldName} number too short.`,
    };
  } else if (newValue?.trim().length < 3) {
    return {
      success: false,
      error: `${fieldName} too short`,
    };
  }
  const value = fieldName === "gender" ? newValue.toLowerCase() : newValue;

  const { data, error } = await supabase
    .from("user_profile")
    .update({ [fieldName]: value })
    .eq("user_id", userId);

  if (error) throw error;
  return { success: true, error: null };
}
