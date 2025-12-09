'use client'
import DashboardButton from "../ui/dashboard-button";
import styles from "./pageHeader.module.css";
import React, { use, useEffect } from "react";
import { MobileNavContext } from "@/store/mobileNav-context";

export default function PageHeader({
  banner,
  title,
  description,
  buttons = [],
}) {
  const { mobileNav, setMobileNav } = use(MobileNavContext);

  useEffect(() => {
    if (mobileNav) {
      setMobileNav(false);
    }
  }, []);

  return (
    <header className={styles.pageHeader}>
      <span className={styles.banner}>{banner}</span>
      <h1>{title}</h1>
      <span>{description}</span>

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
    </header>
  );
}
