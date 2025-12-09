import KycGrid from "@/components/user/kyc-grid";
import PageHeader from "@/components/user/pageHeader";
import Section from "@/components/user/section";
import React from "react";

export default function KycPage() {
  return (
    <>
      <Section label="kyc-grid-section">
        <KycGrid />
      </Section>
    </>
  );
}
