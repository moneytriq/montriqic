export const dynamic = "force-dynamic";
import DashboardFooter from "@/components/user/dashboard-footer";
import DashboardNavbar from "@/components/user/dashboard-navbar";
import MobileSideNav from "@/components/user/mobile-side-nav";

import SideNav from "@/components/user/sideNav";
import { createSupabaseServerClient } from "@/lib/db/supabaseServer";
import ConfirmInvestmentModalContextProvider from "@/store/confirm-investment-modal-context";
import InvestmentPlansContextProvider from "@/store/investment-plans-context";
import SelectPlanContextProvider from "@/store/select-plan-context";
import TransactionsContextProvider from "@/store/transactions-context";
import UserContextProvider from "@/store/user-context";
import KycDocumentTypeContextProvider from "@/store/kyc-document-type-context";
import WalletBalanceContextProvider from "@/store/wallet-balance-context";
import { redirect } from "next/navigation";
import React from "react";
import SelectProfileUpdateContextProvider from "@/store/select-profile-update-context";
import AdminWalletAddressContextProvider from "@/store/admin-wallet-context";
import Section from "@/components/user/section";

export default async function UserLayout({ children }) {
  const supabase = await createSupabaseServerClient({
    fetchOptions: { cache: "no-store" },
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  let userDetails;
  let plans;
  let transactions;
  let walletBalance;
  let adminWalletAddress;

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
        dateOfBirth: userProfile.date_of_birth || "",
        country: userProfile.country || "",
        address: userProfile.address || "",
        kycStatus: userProfile.kyc_status || "",
        walletAddress: userProfile.wallet_address || "",
        role: userProfile.role || "",
      };

      const { data: investmentPlansData, error: investmentPlansError } =
        await supabase.from("investment_plans").select("*");
      if (investmentPlansError) throw investmentPlansError;
      plans = investmentPlansData;

      const { data: transactionsData, error: transactionsDataError } =
        await supabase
          .from("transactions")
          .select("*")
          .eq("user_id", user.id)
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

      const { data: wallet, error: walletError } = await supabase
        .from("wallet")
        .select("available_balance")
        .eq("user_id", user.id)
        .single();

      if (walletError) throw walletError;
      walletBalance = wallet.available_balance;

      const { data: adminWallet, error: adminWalletError } = await supabase
        .from("admin_wallet")
        .select("wallet_address");
      if (adminWalletError) throw adminWalletError;

      adminWalletAddress = adminWallet[0]?.wallet_address;
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
  }

  return (
    <>
      <UserContextProvider userDetails={userDetails}>
        <AdminWalletAddressContextProvider address={adminWalletAddress}>
          <KycDocumentTypeContextProvider>
            <InvestmentPlansContextProvider plans={plans}>
              <SelectProfileUpdateContextProvider>
                <SelectPlanContextProvider>
                  <WalletBalanceContextProvider balance={walletBalance}>
                    <DashboardNavbar />
                    <SideNav user={userDetails} />
                    <MobileSideNav user={userDetails} />
                    <TransactionsContextProvider defaultValue={transactions}>
                      <ConfirmInvestmentModalContextProvider>
                        {children}
                      </ConfirmInvestmentModalContextProvider>
                    </TransactionsContextProvider>
                  </WalletBalanceContextProvider>
                </SelectPlanContextProvider>
              </SelectProfileUpdateContextProvider>
            </InvestmentPlansContextProvider>
          </KycDocumentTypeContextProvider>
        </AdminWalletAddressContextProvider>
      </UserContextProvider>
    </>
  );
}
