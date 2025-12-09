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
          title="Invest & Earn"
          description="We have various investment plans for you. You can invest daily, weekly or monthly and start earning now."
        />
      </Section>
      <Section label="page-header">
        <DepositForm />
      </Section>
      <Section label="footer-section">
        <DashboardFooter prompt="By continuing, you aggree to our terms and conditions" />
      </Section>
    </>
  );
}
