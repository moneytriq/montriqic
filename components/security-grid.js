"use client";

import styles from "./security-grid.module.css";
import { securityData } from "@/lib/data/securityData";
import { iconsConfig } from "@/lib/icons/iconsConfig";

export default function SecurityGrid({ user }) {
  const isLoggedIn = user !== null;
  return (
    <div className={styles.securityContainer}>
      {/* Header */}
      <div className={styles.headerBox}>
        <h2>{securityData.title}</h2>
        <p>{securityData.description}</p>
      </div>

      {/* Cards */}
      <div className={styles.grid}>
        {securityData.cards.map((card) => {
          const Icon = iconsConfig[card.icon];

          return (
            <div key={card.id} className={styles.card}>
              <div className={styles.iconWrapper}>
                <Icon />
              </div>

              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      {!isLoggedIn && (
        <p className={styles.footerText}>
          {securityData.footerText}{" "}
          <a href={securityData.footerLinkHref} className={styles.accent}>
            {securityData.footerLinkText}
          </a>
        </p>
      )}
    </div>
  );
}
