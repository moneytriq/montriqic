"use client";
import Image from "next/image";
import styles from "./referral-info.module.css";
import { MobileNavContext } from "@/store/mobileNav-context";
import { use, useEffect } from "react";
export default function ReferralInfo() {
  const { mobileNav, setMobileNav } = use(MobileNavContext);
  useEffect(() => {
    if (mobileNav) {
      setMobileNav(false);
    }
  }, []);
  return (
    <div className={styles.referralInfoContainer}>
      <header>
        <h1>Join Our Three-Level Affiliate Program</h1>
        <div className={styles.imageWrapper}>
          <Image src="/images/ref.jpg" alt="referral-hero" fill sizes="100vw" />
        </div>
      </header>
    </div>
  );
}
