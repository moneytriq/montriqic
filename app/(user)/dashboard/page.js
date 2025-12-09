import TradingViewWidget from "@/components/tradingview-widget";
import AccountCardsgrid from "@/components/user/account-cards-grid";
import DashboardFooter from "@/components/user/dashboard-footer";
import PageHeader from "@/components/user/pageHeader";
import RecentActivitiesGrid from "@/components/user/recent-activities-grid";
import ReferralInviteCard from "@/components/user/referal-invite-card";
import Section from "@/components/user/section";
import WarningCardsGrid from "@/components/user/warning-cards-grid";
import getRecentActivities from "@/lib/db/get-recent-activities";
import { createSupabaseServerClient } from "@/lib/db/supabaseServer";
import React from "react";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let userDetails;
  let isWarningSection;
  let accountInformation;
  let recentActivities;


  if (user) {
    try {
      const {
        data: [userProfile],
        error: userProfileError,
      } = await supabase
        .from("user_profile")
        .select("*")
        .eq("user_id", user.id);

      if (userProfileError) throw userProfileError;

      userDetails = {
        id: user.id,
        email: user.email,
        fullName: userProfile.full_name || "",
        displayName: userProfile.display_name || "",
        phone: userProfile.phone || "",
        telegram: userProfile.telegram || "",
        gender: userProfile.gender || "",
        date_of_birth: userProfile.dateOfBirth || "",
        country: userProfile.country || "",
        address: userProfile.address || "",

        kycStatus: userProfile.kyc_status || "",

        walletAddress: userProfile.wallet_address || "",
        role: userProfile.role || "",
      };

      const { data: financialOverview, error: financialOverviewError } =
        await supabase
          .from("user_financial_overview")
          .select("*")
          .eq("user_id", user.id)
          .single();

      if (financialOverviewError) throw financialOverviewError;

      accountInformation = [
        {
          title: "Available Balance",
          figure: financialOverview.available_wallet_balance,
          subTitle: "Amount Invested",
          subFigure: financialOverview.amount_invested,
          locked: true,
          icon: "accountBalance",
          theme: "blue-400",
          buttons: [
            {
              text: "Deposit",
              icon: "arrowRight",
              theme: "blue-400",
              href: "/investment/deposit",
            },
            {
              text: "Invest & Earn",
              theme: "jacarta-500",
              href: "/investment/invest",
            },
          ],
        },
        {
          title: "Total Deposit",
          figure: financialOverview.total_deposit,
          subTitle: "This Month",
          subFigure: financialOverview.total_deposit_this_month,
          icon: "info",
          theme: "jacarta-500",
        },
        {
          title: "Total Withdraw",
          figure: financialOverview.total_withdraw,
          subTitle: "This Month",
          subFigure: financialOverview.total_withdraw_this_month,
          icon: "info",
          theme: "yellow-400",
        },
      ];

      const { data: recentActivitiesData, error: recentActivitiesDataError } =
        await getRecentActivities(user.id);

      if (recentActivitiesDataError) throw recentActivitiesDataError;

      const cutActivities = recentActivitiesData.slice(0, 5);

      recentActivities = cutActivities.map((activity) => ({
        id: activity.id || activity.transaction_id,
        type: activity.transaction_type,
        title: activity.description,
        date: activity.created_at,
        status: activity.status,
        amount: activity.amount || activity.invested_amount,
        profit: activity.profit || null,
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
  }

  isWarningSection =
    userDetails.kycStatus !== "verified" || !userDetails.walletAddress;

  return (
    <>
      <Section label="page-header">
        <PageHeader
          banner="Welcome"
          title={userDetails.displayName}
          description="Here's a summary of your account. Have fun!"
        />
      </Section>
      {isWarningSection && (
        <Section label="warning-cards">
          <WarningCardsGrid />
        </Section>
      )}
      <Section label="account-cards">
        <AccountCardsgrid overview={accountInformation} />
      </Section>
      <Section label="trading-view-info">
        <TradingViewWidget />
      </Section>
      <Section
        label="recent-activity"
        title="Recent Activity"
        description={[{ type: "button", href: "#", text: "See History" }]}
      >
        <RecentActivitiesGrid
          activities={recentActivities}
          baseUrl="/transactions"
        />
      </Section>
      {/* <Section
        label="referral-section"
        title="Refer Us & Earn"
        description={[
          { type: "text", text: "Use the link below to invite your friends" },
        ]}
      >
        <ReferralInviteCard />
      </Section> */}
      <Section label="footer-section">
        <DashboardFooter />
      </Section>
    </>
  );
}
