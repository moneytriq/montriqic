"use server";
import { supabase } from "@/lib/db/supabaseClient";
// import { createSupabaseServerClient } from "@/lib/db/supabaseServer";
import { revalidatePath } from "next/cache";

import { formatNumber } from "@/util/util";
import { sendUserWithdrawRequestEmail } from "./email";

export async function makeWithdrawal(userId, userFullName, withdrawAmount) {
  const amount = formatNumber(withdrawAmount);
  const { data: walletBalance, error: walletBalanceError } = await supabase
    .from("wallet")
    .select("available_balance")
    .eq("user_id", userId)
    .single();

  if (walletBalanceError) throw walletBalanceError;

  const isInsufficientFunds = walletBalance.available_balance < withdrawAmount;

  if (isInsufficientFunds) {
    return {
      success: false,
      error:
        "You do not have sufficient funds in your wallet to make this withdrawal.",
    };
  }

  const { data: kycStatus, error: kycStatusError } = await supabase
    .from("user_profile")
    .select("kyc_status, wallet_address, user_email")
    .eq("user_id", userId)
    .single();

  if (kycStatusError) throw kycStatusError;

  const hasWalletAddress = kycStatus.wallet_address !== null;

  if (!hasWalletAddress) {
    return {
      success: false,
      error: "You can only withdraw funds after you add a wallet address.",
    };
  }

  const isUserVerified = kycStatus.kyc_status === "verified";

  if (!isUserVerified) {
    return {
      success: false,
      error: "You can only withdraw funds after you complete your KYC.",
    };
  }
  const { data, error } = await supabase.from("transactions").insert({
    user_id: userId,
    initiator: userFullName,
    amount: withdrawAmount,
    transaction_type: "withdraw",
    description: `Withdrawal request`,
  });

  if (error) throw error;

  await sendUserWithdrawRequestEmail(kycStatus.user_email, amount);

  revalidatePath("/");

  return { success: true, error: null };
}
