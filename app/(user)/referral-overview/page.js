import DashboardFooter from "@/components/user/dashboard-footer";
import PageHeader from "@/components/user/pageHeader";
import ReferralInviteCard from "@/components/user/referal-invite-card";
import Section from "@/components/user/section";
import { notFound } from "next/navigation";
import React from "react";

export default function ReferralOverviewPage() {
  const notAvailable = true;
  if (notAvailable) {
    notFound();
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
        description={[{ type: "text", text: "You have referred 9 friends" }]}
      ></Section>

      <Section
        label="referral-section"
        title="Refer Us & Earn"
        description={[
          { type: "text", text: "Use the link below to invite more friends" },
        ]}
      >
        <ReferralInviteCard />
      </Section>
      <Section label="footer-section">
        <DashboardFooter />
      </Section>
    </>
  );
}
