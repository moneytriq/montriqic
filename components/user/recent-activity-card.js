"use client";
import { iconsConfig } from "@/lib/icons/iconsConfig";
import styles from "./recent-activity-card.module.css";
import LinkWithProgress from "../ui/link-with-progress";
import { formatDate, formatNumber } from "@/util/util";
import { fontSize } from "@mui/system";

const ArrowIn = iconsConfig["arrowIn"];
const ArrowOut = iconsConfig["arrowOut"];
const Plus = iconsConfig["plus"];
const Minus = iconsConfig["minus"];
const FowardIcon = iconsConfig["arrowForward"];
const KycIcon = iconsConfig["verifyUser"];
const UserIcon = iconsConfig["user"];
const EditIcon = iconsConfig["edit"];

export default function RecentActivityCard({
  activity,
  baseUrl,
  label,
  isManageUsers,
}) {
  const ActivityTypeIcon =
    activity.type === "deposit" || activity.type === "referral earning"
      ? ArrowIn
      : activity.type === "kyc"
      ? KycIcon
      : activity.type === "users"
      ? UserIcon
      : ArrowOut;
  const TransactionTypeIcon = activity.type === "deposit" ? Plus : Minus;

  // console.log("act", activity);

  return (
    <div className={styles.recentActivityCard}>
      <div className={styles.left}>
        <div
          className={styles.iconBox}
          style={{
            background: ["completed", "verified", "users"].includes(
              activity.status
            )
              ? "var(--green-300)"
              : "var(--orange-300)",
          }}
        >
          <ActivityTypeIcon
            style={{
              color: ["completed", "verified", "users"].includes(
                activity.status
              )
                ? "var(--green-400)"
                : "var(--orange-400)",
            }}
          />
        </div>

        <div className={styles.details}>
          <p>{activity.title}</p>
          <div>
            <span>{formatDate(activity.date)}</span>
            {label !== "users" && (
              <>
                <span className={styles.banner}></span>
                <span className={styles.status}>{activity.status}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {label !== "admin-kyc-request-list" && label !== "users" && (
        <div className={styles.right}>
          <span className={styles.top}>
            <TransactionTypeIcon />{" "}
            {activity.type === "withdraw" && activity.profit !== null
              ? formatNumber(activity.amount + activity.profit)
              : formatNumber(activity.amount)}{" "}
            USD
          </span>
          {/* <span className={styles.bottom}>{activity.amountInBTC} BTC</span> */}
        </div>
      )}

      {label !== "users" && (
        <LinkWithProgress href={`${baseUrl}/${activity.id}`}>
          <FowardIcon />
        </LinkWithProgress>
      )}
      {isManageUsers === "admin" && (
        <LinkWithProgress href={`${baseUrl}/${activity.id}`} >
          <EditIcon style={{fontSize: "1.3rem"}}/>
        </LinkWithProgress>
      )}
    </div>
  );
}
