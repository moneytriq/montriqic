import PageHeader from "@/components/user/pageHeader";
import RecentActivitiesGrid from "@/components/user/recent-activities-grid";
import Section from "@/components/user/section";
import { createSupabaseServerClient } from "@/lib/db/supabaseServer";
import React from "react";

export default async function AdminWithdrawPage() {
  const supabase = await createSupabaseServerClient();

  let transactions;

  try {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("transaction_type", "withdraw")
      .order("created_at", { ascending: false })
      .order("status", { ascending: false }); // "pending" first;

    if (error) error;

    if (data.length < 1) {
      return (
        <Section>
          <p className="no-data">No withdraw requests</p>
        </Section>
      );
    }

    transactions = data.map((trx) => ({
      id: trx.id,
      userId: trx.user_id,
      type: trx.transaction_type,
      title: trx.description,
      date: trx.created_at,
      status: trx.status,
      amount: trx.amount,
      profit: null,
      amountInBTC: 0.035529,
    }));
  } catch (error) {
    console.error("Supabase Error", error.message);
    return (
      <Section>
        <p className="data-fetching-error">Something went wrong</p>
      </Section>
    );
  }
  return (
    <>
      <Section label="page-header">
        <PageHeader
          banner="Requests"
          title="Withdraw Requests"
          description="Manage all withdraw requests."
        />
      </Section>
      <Section label="withdraw-request-section">
        <RecentActivitiesGrid
          activities={transactions}
          baseUrl="/admin/withdraw/"
        />
      </Section>
    </>
  );
}
