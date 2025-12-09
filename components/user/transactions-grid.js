"use client";
import { use } from "react";
import PageNav from "./pageNav";
import styles from "./transactions-grid.module.css";
import { PageNavContext } from "@/store/pagNav-context";
import PageSubHeader from "./page-sub-header";
import RecentActivitiesGrid from "./recent-activities-grid";
import { TransactionsContext } from "@/store/transactions-context";

const navigations = ["all", "deposit", "withdraw"];

export default function TransactionsGrid() {
  const { pageNav } = use(PageNavContext);
  const { transactions } = use(TransactionsContext);

  let filteredTransactions = transactions;

  if (pageNav !== "all") {
    filteredTransactions = transactions.filter((act) => act.type === pageNav);
  }
  return (
    <div className={styles.transactionsContainer}>
      <PageNav navigations={navigations} />

      <PageSubHeader title={`${pageNav} transactions`} />

      <RecentActivitiesGrid
        activities={filteredTransactions}
        baseUrl="/transactions/"
      />
    </div>
  );
}
