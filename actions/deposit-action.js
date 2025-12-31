"use server";
import { supabase } from "@/lib/db/supabaseClient";
// import { createSupabaseServerClient } from "@/lib/db/supabaseServer";
import { revalidatePath } from "next/cache";
import { sendUserDepositRequestEmail } from "./email";
import { formatNumber } from "@/util/util";

export async function makeDeposit(
  userId,
  userFullName,
  depositAmount,
  walletType,
  userEmail
) {
  const emailAmount = formatNumber(depositAmount);

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

  await sendUserDepositRequestEmail(userEmail, emailAmount);

  revalidatePath("/");

  return { success: true, error: null };
}
