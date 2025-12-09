"use client";
import LinkWithProgress from "../ui/link-with-progress";
import styles from "./dashboard-footer.module.css";

export default function DashboardFooter({ prompt = null }) {
  return (
    <div className={styles.dashboardFooter}>
      {prompt && <p>{prompt}</p>}
      <span className={styles.copywright}>
        Monetriq @ {new Date().getFullYear()}. All Rights Reserved{" "}
      </span>
      <span className={styles.links}>
        <LinkWithProgress href="/faq">FAQ</LinkWithProgress>
        <LinkWithProgress href="/terms-and-conditions">Terms and Conditions</LinkWithProgress>
        <LinkWithProgress href="/privacy-policy">Privacy Policy</LinkWithProgress>
      </span>
    </div>
  );
}
