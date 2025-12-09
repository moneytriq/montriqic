import DashboardFooter from "@/components/user/dashboard-footer";
import DepositForm from "@/components/user/deposit-form";
import PageHeader from "@/components/user/pageHeader";
import Section from "@/components/user/section";
import React from "react";

export default function DepositPage() {
  return (
    <>
      <Section label="page-header">
        <PageHeader
          banner="investments"
          title="Withdraw Funds"
          description="Withdraw your earnings to your crypto wallet."
        />
      </Section>
      <Section label="page-header">
        <DepositForm label="withdraw"/>
      </Section>
      <Section label="footer-section">
        <DashboardFooter prompt="By continuing, you aggree to our terms and conditions" />
      </Section>
    </>
  );
}
