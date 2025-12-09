import PageHeader from "@/components/user/pageHeader";
import RecentActivitiesGrid from "@/components/user/recent-activities-grid";
import Section from "@/components/user/section";
import { createSupabaseServerClient } from "@/lib/db/supabaseServer";
import React from "react";

export default async function AdminKYCRequestsPage() {
  const supabase = await createSupabaseServerClient();
  let requests;

  try {
    const { data, error } = await supabase
      .from("admin_kyc_requests")
      .select("*");

    if (error) error;

    if (data.length < 1) {
      return (
        <>
          <Section label="page-header">
            <PageHeader
              banner="Requests"
              title="KYC Requests"
              description="Manage all KYC requests."
            />
          </Section>
          <Section>
            <p className="no-data">No KYC requests</p>
          </Section>
        </>
      );
    }

    // console.log("data", data);

    requests = data.map((trx) => ({
      id: trx.kyc_id,
      userId: trx.user_id,
      type: "kyc",
      title: `${trx.full_name}'s KYC Request`,
      date: trx.created_at,
      status: trx.kyc_status,
    }));
  } catch (error) {
    console.error("Supabase Error", error.message);
    return (
      <Section>
        <p className="data-fetching-error">Something went wrong</p>
      </Section>
    );
  }

  return (
    <>
      <Section label="page-header">
        <PageHeader
          banner="Requests"
          title="KYC Requests"
          description="Manage all KYC requests."
        />
      </Section>

      <Section label="kyc-request-section">
        <RecentActivitiesGrid
          activities={requests}
          baseUrl="/admin/kyc/"
          label="admin-kyc-request-list"
        />
      </Section>
    </>
  );
}
