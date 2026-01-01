"use server";

import { supabase } from "@/lib/db/supabaseClient";
import { revalidatePath } from "next/cache";

export async function updateAdminWalletAddress(
  actionMode,
  seletedAddress,
  prevState,
  formData
) {
  const address = formData.get("address");
  const network = formData.get("network") || null;
  const type = formData.get("type")?.toLowerCase();

  

  if (address?.trim().length < 8) {
    return {
      success: false,
      error: `Invalid wallet address`,
    };
  }

  if (actionMode !== "update") {
    if (type?.trim().length < 3) {
      return {
        success: false,
        error: `Invalid Wallet Type`,
      };
    }
    // if (type === "usdt" && network?.trim().length < 3) {
    //   return {
    //     success: false,
    //     error: `Invalid Network`,
    //   };
    // }

    const { count, error: countError } = await supabase
      .from("admin_wallet")
      .select("*", { count: "exact", head: true });

    if (countError) throw countError;

    if (count >= 6) {
      return {
        success: false,
        error: `Maximum number of wallets reached. You cannot add more than 6 wallets.`,
      };
    }

    const { data: wallet, error: walletError } = await supabase
      .from("admin_wallet")
      .select("*")
      .eq("type", type)
      .eq("network", network);

    if (walletError) throw walletError;

    if (wallet.length > 0) {
      return {
        success: false,
        error: `You cannot add the same wallet with the same network more than once.`,
      };
    }

    const { data: insertWallet, error: insertWalletError } = await supabase
      .from("admin_wallet")
      .insert({ wallet_address: address, type: type, network: network });

    if (insertWalletError) throw insertWalletError;
    return { success: true, error: null };
  }

  const { data: updateWallet, error: updateWalletError } = await supabase
    .from("admin_wallet")
    .update({ wallet_address: address })
    .eq("id", seletedAddress.id);

  if (updateWalletError) throw updateWalletError;
  revalidatePath("/", "layout");
  return { success: true, error: null };
}

export async function removeWallet(walletId) {
  const { count, error: countError } = await supabase
    .from("admin_wallet")
    .select("*", { count: "exact", head: true })
    .eq("id", walletId);

  if (countError) throw countError;

  if (count < 1) {
    return { success: false, error: "Address does not exist" };
  }

  await supabase.from("admin_wallet").delete().eq("id", walletId);
  revalidatePath("/", "layout");
  return { success: true, error: null };
}
