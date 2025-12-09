"use client";
import React from "react";
import LinkWithProgress from "./link-with-progress";
import { iconsConfig } from "@/lib/icons/iconsConfig";
import styles from './dashboard-button.module.css'

export default function DashboardButton({
  href,
  theme,
  icon = null,
  children,
  ...props
}) {
  let Icon;

  if (icon) {
    Icon = iconsConfig[icon];
  }
  return (
    <LinkWithProgress
      className={styles.dButton}
      href={href}
      style={{ background: `var(--${theme})` }}
      {...props}
    >
      {children} {icon && <Icon />}
    </LinkWithProgress>
  );
}
