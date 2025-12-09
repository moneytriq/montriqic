"use client";
import { iconsConfig } from "@/lib/icons/iconsConfig";
import styles from "./referal-invite-card.module.css";

const { link: LinkIcon, copy: CopyIcon } = iconsConfig;
export default function ReferralInviteCard() {
  return (
    <div className={styles.referralInviteCard}>
      <div>
        <LinkIcon />

        <span className={styles.content}>http://agakcbhdcbjhbcjhbcdggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggbckjdsbchjsc</span>

        <button>
          <CopyIcon />
          Copy
        </button>
      </div>
    </div>
  );
}
