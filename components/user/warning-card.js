"use client";

import { iconsConfig } from "@/lib/icons/iconsConfig";
import styles from "./warning-card.module.css";
import DashboardButton from "../ui/dashboard-button";
export default function WarningCard({
  icon,
  text,
  buttonText = null,
  buttonHref = null,
  theme,
  buttonActionType = null,
  ...props
}) {
  const Icon = iconsConfig[icon];
  return (
    <div
      className={styles.warningCard}
      style={{ border: `2px solid var(--${theme})` }}
    >
      <Icon style={{ color: `var(--${theme})` }} />
      <div className={styles.warningInfo}>
        <p>{text}</p>
        {buttonHref && (
          <DashboardButton href={buttonHref} theme={theme}>
            {buttonText}
          </DashboardButton>
        )}
   
        {buttonActionType === "modal" && (
          <button
            style={{ background: `var(--${theme})` }}
            theme={theme}
            {...props}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}
