import AccountCardsgrid from "@/components/user/account-cards-grid";
import DashboardFooter from "@/components/user/dashboard-footer";
import PageHeader from "@/components/user/pageHeader";
import RecentActivitiesGrid from "@/components/user/recent-activities-grid";
import Section from "@/components/user/section";
import { createSupabaseServerClient } from "@/lib/db/supabaseServer";
import React from "react";

// const investmentHistory = [
//   {
//     type: "invest",
//     title: "Invest in ETF Funds",
//     date: "19 Nov, 2023",
//     status: "ongoing",
//     amount: "1,300",
//     amountInBTC: 0.035529,
//   },
//   {
//     type: "withdraw",
//     title: "Withdraw BTC mining plan",
//     date: "1 Jan, 2024",
//     status: "completed",
//     amount: "1,700",
//     amountInBTC: 0.044529,
//   },
//   {
//     type: "invest",
//     title: "invest in BTC mining plan",
//     date: "19 Nov, 2023",
//     status: "completed",
//     amount: "1,300",
//     amountInBTC: 0.035529,
//   },
//   {
//     type: "invest",
//     title: "invest in BTC mining plan",
//     date: "19 Nov, 2023",
//     status: "completed",
//     amount: "1,300",
//     amountInBTC: 0.035529,
//   },
// ];

export default async function InvestmentPage() {
  let accountInformation;
  let investmentHistory;
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: financialOverview, error: financialOverviewError } =
      await supabase
        .from("user_investment_overview")
        .select("*")
        .eq("user_id", user.id)
        .single();

    if (financialOverviewError) throw financialOverviewError;

    accountInformation = [
      {
        title: "Available Balance",
        figure: financialOverview.available_wallet_balance,
        subTitle: "Invest or withdraw funds",
        subFigure: financialOverview.available_wallet_balance,
        icon: "accountBalance",
        theme: "blue-400",
      },
      {
        title: "Ongoing Investment",
        figure: financialOverview.ongoing_amount_invested,
        subTitle: "Approx Profit",
        subFigure: financialOverview.ongoing_profit,
        locked: true,
        chart: true,
        icon: "info",
        theme: "jacarta-500",
      },
      {
        title: "All Time Investment Total",
        figure: financialOverview.total_amount_invested,
        subTitle: "All Time Cummulative Profits",
        subFigure: financialOverview.total_profits,
        icon: "info",
        theme: "jacarta-500",
      },
    ];

    const { data: investments, error: investmentsError } = await supabase
      .from("user_investment_history")
      .select(`*`)
      .eq("user_id", user.id)
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

  const total = accountInformation[2].figure + accountInformation[2].subFigure;
  const step = total / 6;

  const historyPoints = Array.from({ length: 6 }, (_, i) =>
    Math.round(step * (i + 1))
  );

  //   const investmentData = {
  //     invested: 500,
  //     profit: 700,
  //     chartData: [
  //       { value: 500 },
  //       { value: 600 },
  //       { value: 650 },
  //       { value: 780 },
  //       { value: 1200 },
  //       { value: 1000 },
  //     ],
  //   };

  const investmentData = {
    invested: 500,
    profit: 700,
    chartData: [
      ...historyPoints.map((point) => ({
        value: point,
      })),
    ],
  };

  return (
    <>
      <Section label="page-header">
        <PageHeader
          banner="investments"
          title="Invested Plans"
          description="At a glance summary of your investments"
          buttons={[
            {
              text: "Invest & Earn",
              icon: "arrowRight",
              theme: "blue-400",
              href: "/investment/invest",
            },
            {
              text: "Deposit Funds",
              icon: "arrowRight",
              theme: "jacarta-500",
              href: "/investment/deposit",
            },
          ]}
        />
      </Section>
      <Section label="investment-overview-section">
        <AccountCardsgrid
          overview={accountInformation}
          investmentData={investmentData.chartData}
        />
      </Section>
      <Section
        label="hitory-section"
        title="History"
        description={[
          { type: "text", text: "Here is your investment Histroy" },
        ]}
      >
        <RecentActivitiesGrid
          activities={investmentHistory}
          baseUrl="/investment/history"
        />
      </Section>
      <Section label="footer-section">
        <DashboardFooter />
      </Section>
    </>
  );
}
