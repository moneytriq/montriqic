"use server";

import { supabase } from "@/lib/db/supabaseClient";
import { revalidatePath } from "next/cache";

export async function adminUpdateUserDetails(
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

  if (fieldName === "available_balance") {
    const { data: updateWalletBalance, error: updateWalletBalanceError } =
      await supabase
        .from("wallet")
        .update({ [fieldName]: newValue })
        .eq("user_id", userId);
    if (updateWalletBalanceError) throw updateWalletBalanceError;
      revalidatePath("/admin/manage-users", "layout");
    return { success: true, error: null };
  }

  const value =
    fieldName === "gender" || fieldName === "role" || fieldName === "kyc_status"
      ? newValue.toLowerCase()
      : newValue;

  const { data, error } = await supabase
    .from("user_profile")
    .update({ [fieldName]: value })
    .eq("user_id", userId);

  if (error) throw error;
  revalidatePath("/admin/manage-users", "layout");
  return { success: true, error: null };
}
