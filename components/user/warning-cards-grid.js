"use client";
import { use } from "react";
import WarningCard from "./warning-card";
import styles from "./warning-cards-grid.module.css";
import { UserContext } from "@/store/user-context";

export default function WarningCardsGrid() {
  const { user } = use(UserContext);
  const { kycStatus, walletAddress } = user;

  return (
    <div className={styles.warningCardsGrid}>
      {!walletAddress && (
        <WarningCard
          icon="warning"
          text="Add an account that you'd like to withdraw funds to"
          buttonText="Add Account"
          buttonHref="/profile?mode=account"
          theme="yellow-400"
        />
      )}

      {kycStatus === "not verified" && (
        <WarningCard
          icon="verifyUser"
          text="To be compliant and protect your account, please verify your account by submitting the required documents"
          buttonText="Verify Account"
          buttonHref="/kyc"
          theme="blue-400"
        />
      )}

      {kycStatus === "pending" && (
        <WarningCard
          icon="verifyUser"
          text="Your KYC application is currently under review."
          theme="orange-400"
        />
      )}
    </div>
  );
}
