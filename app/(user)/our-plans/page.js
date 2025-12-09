import InvestmentPlansGrid from "@/components/user/investment-plans-grid";
import PageHeader from "@/components/user/pageHeader";
import Section from "@/components/user/section";
import React, { Suspense } from "react";
import DashboardFooter from "@/components/user/dashboard-footer";

export default function OurPlansPage() {
  return (
    <>
      <Section label="page-header">
        <PageHeader
          banner="Choose a plan and start investing"
          title="Investment Plans"
          description="Earn passive income through fully automated,
tokenized plans that generate yield across diversified
markets. Flexible Contribution Optionss Choose your
preferred schedule: daily. weekly. or monthly Cross-
Market Yield Generatioræ Your funds are allocated
across digital and traditional markets for optimized
returns. Smart Contract Security• All plans are
tokenized and executed via audited smart contracts,
ensuring transparency and trustless income
generation. Reinvest or Withdraw- Earnings can be
automatically reinvested or withdrawn on a recurring
schedule."
        />
      </Section>

      <Section label="investment-plans-section">
        <Suspense fallback={<p className="suspense-fallback">Loading Investments...</p>}>
          <InvestmentPlansGrid />
        </Suspense>
      </Section>
      <Section label="footer-section">
        <DashboardFooter />
      </Section>
    </>
  );
}
