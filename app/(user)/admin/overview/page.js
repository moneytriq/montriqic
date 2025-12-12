import AccountCardsgrid from "@/components/user/account-cards-grid";
import PageHeader from "@/components/user/pageHeader";
import RecentActivitiesGrid from "@/components/user/recent-activities-grid";
import Section from "@/components/user/section";
import WalletClientWrapper from "@/components/user/wallet-client-wrapper";
import { createSupabaseServerClient } from "@/lib/db/supabaseServer";

import React from "react";

export default async function AdminOverviewPage() {
  const supabase = await createSupabaseServerClient();
  let accountInformation;
  let investmentHistory;

  try {
    const { data: financialOverview, error: financialOverviewError } =
      await supabase.from("all_financial_overview").select("*").single();

    if (financialOverviewError) throw financialOverviewError;

    accountInformation = [
      {
        title: "Revenue Balance",
        figure: financialOverview.available_wallet_balance,
        subTitle: "All Time Investments",
        subFigure: financialOverview.amount_invested,
        icon: "accountBalance",
        theme: "blue-400",
      },
      {
        title: "All Time Deposit",
        figure: financialOverview.total_deposit,
        subTitle: "This Month",
        subFigure: financialOverview.total_deposit_this_month,
        icon: "info",
        theme: "jacarta-500",
      },
      {
        title: "All Time Withdraws",
        figure: financialOverview.total_withdraw,
        subTitle: "This Month",
        subFigure: financialOverview.total_withdraw_this_month,
        icon: "info",
        theme: "yellow-400",
      },
    ];

    const { data: investments, error: investmentsError } = await supabase
      .from("user_investment_history")
      .select(`*`)
      .order("created_at", { ascending: false });

    if (investmentsError) throw investmentsError;
    investmentHistory = investments.map((investment) => ({
      id: investment.transaction_id,
      type: investment.transaction_type,
      title: investment.description,
      date: investment.created_at,
      status: investment.status,
      amount: investment.invested_amount,
      profit: investment.profit,
      amountInBTC: 0.035529,
    }));
  } catch (error) {
    console.error("Supabase error", error.message);
    return (
      <p className="data-fetching-error ">
        Something Went Wrong, please try again
      </p>
    );
  }
  return (
    <>
      <Section label="page-header">
        <PageHeader
          banner="Admin"
          title="Financial Overview"
          description="Here's a summary of your company's finance activities!"
        />
      </Section>

      <Section label="account-cards">
        <AccountCardsgrid overview={accountInformation} />
      </Section>

      <Section
        label="hitory-section"
        title="History"
        description={[{ type: "text", text: "All investment Histroy" }]}
      >
        <RecentActivitiesGrid
          activities={investmentHistory}
          baseUrl="/investment/history"
        />
      </Section>

      <WalletClientWrapper />
    </>
  );
}
