"use server";
import { supabase } from "@/lib/db/supabaseClient";
// import { createSupabaseServerClient } from "@/lib/db/supabaseServer";
import { revalidatePath } from "next/cache";

export async function makeInvestment(
  userId,
  userFullName,
  planId,
  planName,
  investmentAmount
) {
//   const supabase = createSupabaseServerClient();

  const { data, error } = await supabase.rpc("make_investment_rpc", {
    p_user_id: userId,
    p_user_full_name: userFullName,
    p_plan_id: planId,
    p_plan_name: planName,
    p_investment_amount: investmentAmount,
  });

  if (error) throw error;

  // revalidate cache
  revalidatePath("/");

  return data; // { success: true/false, error: "..."}
}

// import { createSupabaseServerClient } from "@/lib/db/supabaseServer";
// import { formatNumber } from "@/util/util";
// import { revalidatePath } from "next/cache";

// export async function makeInvestment(
//   userId,
//   userFullName,
//   planId,
//   planName,
//   investmentAmount
// ) {
//   const supabase = createSupabaseServerClient();
//   const { data: count, error: countError } = await supabase
//     .from("investments")
//     .select("*", { count: "exact", head: true })
//     .eq("user_id", userId)
//     .eq("status", "ongoing");

//   if (countError) throw countError;

//   const ongoingInvestmentExists = count > 0;

//   if (ongoingInvestmentExists) {
//     return {
//       success: false,
//       error: "You currently have an ongoing investment.",
//     };
//   }

//   const { data: walletBalance, error: walletBalanceError } = await supabase
//     .from("wallet")
//     .select("available_balance")
//     .eq("user_id", userId)
//     .single();

//   if (walletBalanceError) throw walletBalanceError;

//   const balance = walletBalance.available_balance;

//   if (balance < investmentAmount) {
//     return {
//       success: false,
//       error: `You don't have enough funds to complete this transaction.`,
//     };
//   }

//   const { data: updateWallet, error: updateWalletError } = await supabase
//     .from("wallet")
//     .update({ available_balance: balance - investmentAmount })
//     .eq("user_id", userId);

//   if (updateWalletError) throw updateWalletError;

//   const { data: insertInvestment, error: insertInvestmentError } =
//     await supabase
//       .from("investments")
//       .insert({
//         user_id: userId,
//         plan_id: planId,
//         invested_amount: investmentAmount,
//       })
//       .select()
//       .single();

//   if (insertInvestmentError) throw insertInvestmentError;

//   const { data: insertLedger, error: insertLedgerError } = await supabase
//     .from("investment_ledger")
//     .insert({
//       initiator: userFullName || "You",
//       investment_id: insertInvestment.id,
//       description: `You invested ${formatNumber(
//         insertInvestment.invested_amount
//       )} USD into ${planName} plan`,
//     });

//   if (insertLedgerError) throw insertLedgerError;

//   revalidatePath("/");

//   return {
//     success: true,
//     error: null,
//   };
// }
