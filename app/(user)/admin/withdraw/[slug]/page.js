import DashboardFooter from "@/components/user/dashboard-footer";
import PageHeader from "@/components/user/pageHeader";
import Section from "@/components/user/section";
import TransactionDetails from "@/components/user/transaction-details";
import { createSupabaseServerClient } from "@/lib/db/supabaseServer";
import React from "react";

export default async function TRansactionDetailPage({ params }) {
  const supabase = await createSupabaseServerClient();
  const transactionId = (await params).slug;

  let transactionDetails;

  try {
    const { data: transaction, error: transactionError } = await supabase
      .from("transactions_with_user_wallet")
      .select("*")
      .eq("id", transactionId);

    if (transactionError) throw transactionError;

    const { data: investmentDetails, error: investmentError } = await supabase
      .from("user_investment_history")
      .select("*")
      .eq("transaction_id", transactionId);

    if (investmentError) investmentError;

    if (transaction.length < 1 && investmentDetails < 1) {
      return (
        <Section>
          <p className="no-data">Transaction does not exist</p>
        </Section>
      );
    }

    transactionDetails = transaction[0] || investmentDetails[0];
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
          banner="Transaction Details"
          title={`TR: ${transactionId}`}
          description="Brief summary of this transaction"
        />
      </Section>
      <Section label="transaction-details">
        <TransactionDetails
          data={transactionDetails}
          label="admin"
          baseUrl="/admin/withdraw"
        />
      </Section>

      <Section label="footer-section">
        <DashboardFooter />
      </Section>
    </>
  );
}
