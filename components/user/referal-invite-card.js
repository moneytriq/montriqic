"use client";
import { iconsConfig } from "@/lib/icons/iconsConfig";
import styles from "./referal-invite-card.module.css";
import CopyButton from "../ui/copy-button";

const { link: LinkIcon, copy: CopyIcon } = iconsConfig;
export default function ReferralInviteCard({ value }) {
  return (
    <div className={styles.referralInviteCard}>
      <div>
        <LinkIcon />

        <span className={styles.content}>{value}</span>

        <CopyButton text={value} />
      </div>
    </div>
  );
}
