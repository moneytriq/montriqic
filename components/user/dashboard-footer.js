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
        <LinkWithProgress href="#">FAQ</LinkWithProgress>
        <LinkWithProgress href="#">Terms and Conditions</LinkWithProgress>
        <LinkWithProgress href="#">Privacy Policy</LinkWithProgress>
      </span>
    </div>
  );
}
