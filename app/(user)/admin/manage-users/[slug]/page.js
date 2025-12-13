import DeleteUserButton from "@/components/ui/delete-user-button";
import AdminUserProfileGrid from "@/components/user/admin-user-profile-grid";
import PageHeader from "@/components/user/pageHeader";
import RecentActivitiesGrid from "@/components/user/recent-activities-grid";
import Section from "@/components/user/section";
import { supabase } from "@/lib/db/supabaseClient";

export default async function UserDetailsPage({ params }) {
  const userId = (await params).slug;
  let user;
  let transactions;
  let investmentHistory;
  let referees;
  let totalRefEarning;
  let recentActivities;

  try {
    const { data: userData, error: userDetailsError } = await supabase
      .from("user_profile")
      .select("*")
      .eq("user_id", userId);

    if (userDetailsError) throw userDetailsError;

    if (userData.length < 1) {
      return (
        <Section>
          <p className="data-fetching-error ">User does not exist!</p>
        </Section>
      );
    }

    const userDetails = userData[0];

    const { data: userWalletBalance, error: userWalletBalanceError } =
      await supabase
        .from("wallet")
        .select("available_balance")
        .eq("user_id", userId)
        .single();

    if (userWalletBalanceError) throw userWalletBalanceError;

    user = {
      id: userDetails?.user_id || "",
      email: userDetails?.user_email || "",
      fullName: userDetails?.full_name || "",
      displayName: userDetails?.display_name || "",
      phone: userDetails?.phone || "",
      telegram: userDetails?.telegram || "",
      gender: userDetails?.gender || "",
      dateOfBirth: userDetails?.date_of_birth || "",
      country: userDetails?.country || "",
      address: userDetails?.address || "",
      kycStatus: userDetails?.kyc_status || "",
      walletAddress: userDetails?.wallet_address || "",
      role: userDetails?.role || "",
      walletBalance: userWalletBalance.available_balance,
    };

    const { data: transactionsData, error: transactionsDataError } =
      await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", userId)
        .order("updated_at", { ascending: false });

    if (transactionsDataError) throw transactionsDataError;

    transactions = transactionsData.map((trx) => ({
      id: trx.id,
      type: trx.transaction_type,
      title: trx.description,
      date: trx.created_at,
      status: trx.status,
      amount: trx.amount,
      profit: null,
      amountInBTC: 0.035529,
    }));

    const { data: investments, error: investmentsError } = await supabase
      .from("user_investment_history")
      .select(`*`)
      .eq("user_id", userId)
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

    const { data: refHistory, error: refHistoryError } = await supabase
      .from("referal_history_view")
      .select("*")
      .eq("referrer_id", userId)
      .order("created_at", { ascending: false });

    if (refHistoryError) throw refHistoryError;

    referees = refHistory.map((ref) => ({
      type: "users",
      title: ref.referee_email,
      date: ref.created_at,
      status: "users",
    }));

    const { data: refEarning, error: refEarningError } = await supabase
      .from("referral_earnings_ledger")
      .select("total_earnings")
      .eq(" user_id", userId);

    if (refEarningError) throw refEarningError;

    if (refEarning.length < 1) {
      totalRefEarning = 0;
    } else {
      totalRefEarning = refEarning[0].total_earnings;
    }

    const { data: refLedger, error: refLedgerError } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId)
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
          banner="Edit User"
          title={user.fullName}
          description="Here, you can view and manage this user!"
        />
      </Section>

      <Section label="user-profile-edit-section">
        <AdminUserProfileGrid user={user} />
      </Section>

      <Section label="page-header" title="User Transaction History">
        <RecentActivitiesGrid
          activities={transactions}
          baseUrl="/transactions/"
        />
      </Section>

      <Section label="page-header" title="User Investment History">
        <RecentActivitiesGrid
          activities={investmentHistory}
          baseUrl="/investment/history"
        />
      </Section>

      <Section
        label="page-header"
        title="User Referral History"
        description={[
          {
            type: "text",
            text: `${user.fullName} has referred ${referees.length} ${
              referees.length !== 1 ? "friends" : "friend"
            } and has made ${totalRefEarning} USD on referrals so far.`,
          },
        ]}
      >
        <RecentActivitiesGrid activities={referees} label="users" />
      </Section>

      <Section label="page-header" title="Referral Earnings Ledger">
        <RecentActivitiesGrid
          activities={recentActivities}
          baseUrl="/transactions"
        />
      </Section>
      <Section label="page-header">
        <DeleteUserButton userId={userId} />
      </Section>
    </>
  );
}
