import ReferralInfo from "@/components/referral-info";
import ReferralPrograms from "@/components/referral-programs";
import Section from "@/components/section";
import React from "react";

export default function ReferralPage() {
  return (
    <>
      <Section label="referral-header" sectionBgGray="gray-bg">
        <ReferralInfo />
      </Section>
      <Section label="referral-header" sectionBgGray="gray-bg">
        <ReferralPrograms />
      </Section>
    </>
  );
}
