"use server";
import { supabase } from "@/lib/db/supabaseClient";
// import { createSupabaseServerClient } from "@/lib/db/supabaseServer";
import { revalidatePath } from "next/cache";

export async function makeDeposit(
  userId,
  userFullName,
  depositAmount,
  walletType
) {
  const walletName = walletType?.toUpperCase();
  const { data: adminWallet, error: adminWalletError } = await supabase
    .from("admin_wallet")
    .select("*");

  if (adminWalletError) throw adminWalletError;

  if (adminWallet.length < 1) {
    return { success: false, error: "No deposit address Found" };
  }

  const { data, error } = await supabase.from("transactions").insert({
    user_id: userId,
    initiator: userFullName,
    amount: depositAmount,
    description: `Initial deposit to ${walletName} wallet`,
  });

  if (error) throw error;

  revalidatePath("/");

  return { success: true, error: null };
}
