import DashboardFooter from "@/components/user/dashboard-footer";
import PageHeader from "@/components/user/pageHeader";
import RecentActivitiesGrid from "@/components/user/recent-activities-grid";
import ReferralInviteCard from "@/components/user/referal-invite-card";
import Section from "@/components/user/section";
import { createSupabaseServerClient } from "@/lib/db/supabaseServer";
import React from "react";

export default async function ReferralOverviewPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const refLink =
    process.env.NEXT_PUBLIC_SITE_URL + `/auth?mode=signup&refId=${user.id}`;
  let users;
  let totalRefEarning;
  let recentActivities;
  try {
    const { data: refHistory, error: refHistoryError } = await supabase
      .from("referal_history_view")
      .select("*")
      .eq("referrer_id", user.id)
      .order("created_at", { ascending: false });

    if (refHistoryError) throw refHistoryError;

    users = refHistory.map((ref) => ({
      type: "users",
      title: ref.referee_email,
      date: ref.created_at,
      status: "users",
    }));

    const { data: refEarning, error: refEarningError } = await supabase
      .from("referral_earnings_ledger")
      .select("total_earnings")
      .eq(" user_id", user.id);

    if (refEarningError) throw refEarningError;

    if (refEarning.length < 1) {
      totalRefEarning = 0;
    } else {
      totalRefEarning = refEarning[0].total_earnings;
    }

    const { data: refLedger, error: refLedgerError } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.id)
      .eq("transaction_type", "referral earning");

    if (refLedgerError) throw refLedgerError;

    recentActivities = refLedger.map((activity) => ({
      id: activity.id,
      type: activity.transaction_type,
      title: activity.description,
      date: activity.created_at,
      status: activity.status,
      amount: activity.amount,
      profit: activity.profit || null,
      amountInBTC: 0.035529,
    }));
  } catch (error) {
    console.error("Supabase error", error.message);
    return (
      <Section>
        <p className="data-fetching-error ">
          Something Went Wrong, please try again
        </p>
      </Section>
    );
  }

  return (
    <>
      <Section label="page-header">
        <PageHeader
          banner="Referral Overview"
          title="Your Referral"
          description="Here's a summary of your Referral activities. Invite more, earn more!"
        />
      </Section>

      <Section
        label="referral-section"
        title="Total Referrals"
        description={[
          {
            type: "text",
            text: `You have referred ${users.length} ${
              users.length !== 1 ? "friends" : "friend"
            }`,
          },
        ]}
      >
        <RecentActivitiesGrid activities={users} label="users" />
      </Section>
      <Section
        label="referral-earnings-section"
        title="Total Referral Earnings"
        description={[
          {
            type: "text",
            text: `You have made a total of ${totalRefEarning} USD from your referees deposit.`,
          },
        ]}
      >
        <RecentActivitiesGrid
          activities={recentActivities}
          baseUrl="/transactions"
        />
      </Section>

      <Section
        label="referral-link-section"
        title="Refer Us & Earn"
        description={[
          { type: "text", text: "Use the link below to invite more friends." },
        ]}
      >
        <ReferralInviteCard value={refLink} />
      </Section>
      <Section label="footer-section">
        <DashboardFooter />
      </Section>
    </>
  );
}
