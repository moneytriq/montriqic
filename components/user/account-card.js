"use client";
import { iconsConfig } from "@/lib/icons/iconsConfig";
import styles from "./account-card.module.css";
import LinkWithProgress from "../ui/link-with-progress";
import DashboardButton from "../ui/dashboard-button";
import InvestmentChart from "../ui/investment-chart";
import { formatNumber } from "@/util/util";
import { WalletBalanceContext } from "@/store/wallet-balance-context";
import { use } from "react";

const { locked: LockedIcon } = iconsConfig;

export default function AccountCard({
  key,
  title,
  figure,
  subTitle = null,
  subFigure,
  icon,
  theme,
  buttons,
  locked = false,
  chart = false,
  investmentData = null,
}) {
  const { walletBalance, setWalletBalance } = use(WalletBalanceContext);
  const Icon = iconsConfig[icon];

  return (
    <div
      key={key}
      className={styles.accountCard}
      style={{ borderBottom: `3px solid var(--${theme})` }}
    >
      <header className={styles.mainHeader}>
        <h1>{title}</h1>
        <Icon />
      </header>
      {title !== "Available Balance" ? (
        <p className={styles.mainFigure}>
          {formatNumber(figure)} <span className={styles.currency}>USD</span>
        </p>
      ) : (
        <p className={styles.mainFigure}>
          {formatNumber(walletBalance)}{" "}
          <span className={styles.currency}>USD</span>
        </p>
      )}

      {subTitle && (
        <div className={styles.subSection}>
          <span className={styles.subTitle}>{subTitle}</span>

          <p className={styles.subFigure}>
            {formatNumber(subFigure)}{" "}
            <span className={styles.currency}>USD</span>
            {locked && (
              <span className={styles.locked}>
                <LockedIcon /> Locked
              </span>
            )}
          </p>
        </div>
      )}

      {chart && <InvestmentChart data={investmentData} />}

      {buttons && (
        <div className={styles.buttonGroup}>
          {buttons.map((button, index) => {
            return (
              <DashboardButton
                href={button.href}
                key={index}
                theme={button.theme}
                icon={button.icon}
              >
                {button.text}
              </DashboardButton>
            );
          })}
        </div>
      )}
    </div>
  );
}
