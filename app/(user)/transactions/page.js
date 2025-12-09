import PageHeader from "@/components/user/pageHeader";
import Section from "@/components/user/section";
import TransactionsGrid from "@/components/user/transactions-grid";

import PageNavContextProvider from "@/store/pagNav-context";
import React from "react";

export default async function TransactionsPage() {


  return (
    <>
      <Section label="page-header">
        <PageHeader
          banner="History"
          title="Transactions"
          description="List of transactions in your account"
        />
      </Section>
      <Section label="transactions-section">
        <PageNavContextProvider defaultNav="all">
          <TransactionsGrid />
        </PageNavContextProvider>
      </Section>
    </>
  );
}
