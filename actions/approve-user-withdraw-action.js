"use server";
import { supabase } from "@/lib/db/supabaseClient";
import { revalidatePath } from "next/cache";
import {
  sendApproveUserWithdrawRequestEmail,
  sendDenyUserWithdrawRequestEmail,
} from "./email";

export async function approveUserWithdraw(
  userId,
  transactionId,
  withdrawAmount
) {
  const { data, error } = await supabase.rpc("approve_user_withdraw_rpc", {
    p_user_id: userId,
    p_transaction_id: transactionId,
  });

  if (error) throw error;
  const { data: userEmail, error: userEmailError } = await supabase
    .from("user_profile")
    .select("user_email")
    .eq("user_id", userId)
    .single();

  if (userEmailError) throw userEmailError;

  await sendApproveUserWithdrawRequestEmail(
    userEmail.user_email,
    withdrawAmount
  );
  revalidatePath("/");

  return data;
}

export async function denyUserWithdraw(userId, transactionId, withdrawAmount) {
  const { count, countError } = await supabase
    .from("transactions")
    .select("*", { count: "exact", head: true })
    .eq("id", transactionId)
    .eq("user_id", userId)
    .eq("transaction_type", "withdraw")
    .eq("status", "pending");

  if (countError) throw countError;

  const isTransactionExist = count > 0;

  if (!isTransactionExist) {
    return { success: true, error: "Transaction not found or already denied." };
  }

  const { data, error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", transactionId)
    .eq("user_id", userId)
    .eq("transaction_type", "withdraw")
    .eq("status", "pending");

  if (error) throw error;

  const { data: userEmail, error: userEmailError } = await supabase
    .from("user_profile")
    .select("user_email")
    .eq("user_id", userId)
    .single();

  if (userEmailError) throw userEmailError;

  await sendDenyUserWithdrawRequestEmail(userEmail.user_email, withdrawAmount);

  revalidatePath("/");

  return { success: true, error: null };
}
