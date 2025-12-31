"use server";
import { supabase } from "@/lib/db/supabaseClient";
import { revalidatePath } from "next/cache";
import {
  sendApproveUserDepositRequestEmail,
  sendDenyUserDepositRequestEmail,
} from "./email";

export async function approveUserDeposit(userId, transactionId, depositAmount) {
  const { data, error } = await supabase.rpc("approve_user_deposit_rpc", {
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

  await sendApproveUserDepositRequestEmail(userEmail.user_email, depositAmount);

  revalidatePath("/");

  return data;
}

export async function denyUserDeposit(userId, transactionId, depositAmount) {
  const { count, countError } = await supabase
    .from("transactions")
    .select("*", { count: "exact", head: true })
    .eq("id", transactionId)
    .eq("user_id", userId)
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
    .eq("user_id", userId);

  if (error) throw error;

  const { data: userEmail, error: userEmailError } = await supabase
    .from("user_profile")
    .select("user_email")
    .eq("user_id", userId)
    .single();

  if (userEmailError) throw userEmailError;

  await sendDenyUserDepositRequestEmail(userEmail.user_email, depositAmount);

  revalidatePath("/");

  return { success: true, error: null };
}
