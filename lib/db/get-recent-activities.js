"use server";
import { createSupabaseServerClient } from "./supabaseServer";

export default async function getRecentActivities(userId) {
  const supabase = await createSupabaseServerClient();

  try {
    const { data: transactions, error: transactionsError } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId);

    if (transactionsError) throw transactionsError;

    const { data: investments, error: investmentsError } = await supabase
      .from("user_investment_history")
      .select(`*`)
      .eq("user_id", userId);

    if (investmentsError) throw investmentsError;
    

    // Prevent spreading null
    const merged = [...(transactions ?? []), ...(investments ?? [])];

    merged.sort((a, b) => new Date(b.updated_at) - new Date(a.created_at));

    return {
      data: merged,
      error: null,
    };
  } catch (error) {
    console.error("Supabase error", error.message);

    return {
      data: null,
      error,
    };
  }
}
