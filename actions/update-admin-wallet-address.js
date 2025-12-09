"use server";

import { supabase } from "@/lib/db/supabaseClient";

export async function updateAdminWalletAddress(
  fieldName,
  newValue,
  prevState,
  formData
) {
  if (newValue?.trim().length < 8) {
    return {
      success: false,
      error: `${fieldName} too short`,
    };
  }
  const value = newValue;

  const { data: walletData, error: walletDataError } = await supabase
    .from("admin_wallet")
    .select("*");
  if (walletDataError) throw walletDataError;

  if (walletData.length < 1) {
    const { data: insertWallet, error: insertWalletError } = await supabase
      .from("admin_wallet")
      .insert({ [fieldName]: value });

    if (insertWalletError) throw insertWalletError;
    return { success: true, error: null };
  }

  const { data: updateWallet, error: updateWalletError } = await supabase
    .from("admin_wallet")
    .update({ [fieldName]: value })
    .eq("id", walletData[0].id);

  if (updateWalletError) throw updateWalletError;
  return { success: true, error: null };
}
