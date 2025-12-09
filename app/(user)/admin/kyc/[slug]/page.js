import DashboardFooter from "@/components/user/dashboard-footer";
import PageHeader from "@/components/user/pageHeader";
import Section from "@/components/user/section";
import TransactionDetails from "@/components/user/transaction-details";
import { createSupabaseServerClient } from "@/lib/db/supabaseServer";
import React from "react";

export default async function TRansactionDetailPage({ params }) {
  const supabase = await createSupabaseServerClient();
  const kycId = (await params).slug;

  let kycDetails;

  try {
    const { data: kycInfo, error: kycInfoError } = await supabase
      .from("admin_kyc_requests")
      .select("*")
      .eq("kyc_id", kycId);

    if (kycInfoError) throw kycInfoError;

    if (kycInfo.length < 1) {
      return (
        <Section>
          <p className="no-data">Transaction does not exist</p>
        </Section>
      );
    }

    kycDetails = kycInfo[0];
  } catch (error) {
    console.error("Supabase Error", error.message);
    return (
      <Section>
        <p className="data-fetching-error">Something went wrong</p>
      </Section>
    );
  }

  // console.log(kycDetails);
  
  return (
    <>
      <Section label="page-header">
        <PageHeader
          banner="KYC Request Details"
          title={`KYC NO: ${kycId}`}
          description="Manage this KYC request"
        />
      </Section>
      <Section label="kyc-details">
        <TransactionDetails
          data={kycDetails}
          label="admin"
          baseUrl="/admin/kyc"
        />
      </Section>

      <Section label="footer-section">
        <DashboardFooter />
      </Section>
    </>
  );
}
