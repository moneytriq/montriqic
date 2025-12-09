"use server";
import { supabase } from "@/lib/db/supabaseClient";
import { revalidatePath } from "next/cache";

export async function approveUserKyc(userId) {
  const { data: userKycStatus, error: userKycStatusError } = await supabase
    .from("user_profile")
    .select("kyc_status")
    .eq("user_id", userId)
    .single();

  if (userKycStatusError) throw userKycStatusError;

  if (userKycStatus.kyc_status !== "pending") {
    return {
      success: false,
      error: "User's KYC details has already been processed",
    };
  }

  const { data: updateUser, error: updateUserError } = await supabase
    .from("user_profile")
    .update({ kyc_status: "verified" })
    .eq("kyc_status", "pending")
    .eq("user_id", userId);

  if (updateUserError) throw updateUserError;

  revalidatePath("/");

  return { success: true, error: null };
}

export async function denyUserKyc(userId) {
  const { data: userKycStatus, error: userKycStatusError } = await supabase
    .from("user_profile")
    .select("kyc_status")
    .eq("user_id", userId)
    .single();

  if (userKycStatusError) throw userKycStatusError;

  if (userKycStatus.kyc_status !== "pending") {
    return {
      success: false,
      error: "User's KYC details has already been processed",
    };
  }

  const { data: updateUser, error: updateUserError } = await supabase
    .from("user_profile")
    .update({ kyc_status: "not verified" })
    .eq("kyc_status", "pending")
    .eq("user_id", userId);

  if (updateUserError) throw updateUserError;

  const { data: deleteRecord, error: deleteRecordError } = await supabase
    .from("kyc")
    .delete()
    .eq("user_id", userId);

  if (deleteRecordError) throw deleteRecordError;

  revalidatePath("/");

  return { success: true, error: null };
}
