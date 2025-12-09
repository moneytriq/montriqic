"use client";
import { iconsConfig } from "@/lib/icons/iconsConfig";
import styles from "./recent-activity-card.module.css";
import LinkWithProgress from "../ui/link-with-progress";
import { formatDate, formatNumber } from "@/util/util";

const ArrowIn = iconsConfig["arrowIn"];
const ArrowOut = iconsConfig["arrowOut"];
const Plus = iconsConfig["plus"];
const Minus = iconsConfig["minus"];
const FowardIcon = iconsConfig["arrowForward"];
const KycIcon = iconsConfig["verifyUser"];

export default function RecentActivityCard({ activity, baseUrl, label }) {
  const ActivityTypeIcon =
    activity.type === "deposit" || activity.type === "referral earning"
      ? ArrowIn
      : activity.type === "kyc"
      ? KycIcon
      : ArrowOut;
  const TransactionTypeIcon = activity.type === "deposit" ? Plus : Minus;

  // console.log("act", activity);

  return (
    <div className={styles.recentActivityCard}>
      <div className={styles.left}>
        <div
          className={styles.iconBox}
          style={{
            background: ["completed", "verified"].includes(activity.status)
              ? "var(--green-300)"
              : "var(--orange-300)",
          }}
        >
          <ActivityTypeIcon
            style={{
              color: ["completed", "verified"].includes(activity.status)
                ? "var(--green-400)"
                : "var(--orange-400)",
            }}
          />
        </div>

        <div className={styles.details}>
          <p>{activity.title}</p>
          <div>
            <span>{formatDate(activity.date)}</span>
            <span className={styles.banner}></span>
            <span className={styles.status}>{activity.status}</span>
          </div>
        </div>
      </div>

      {label !== "admin-kyc-request-list" && (
        <div className={styles.right}>
          <span className={styles.top}>
            <TransactionTypeIcon />{" "}
            {activity.type === "withdraw" && activity.profit !== null
              ? formatNumber(activity.amount + activity.profit)
              : formatNumber(activity.amount)}{" "}
            USD
          </span>
          <span className={styles.bottom}>{activity.amountInBTC} BTC</span>
        </div>
      )}

      <LinkWithProgress href={`${baseUrl}/${activity.id}`}>
        <FowardIcon />
      </LinkWithProgress>
    </div>
  );
}
