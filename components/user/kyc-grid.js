"use client";

import { iconsConfig } from "@/lib/icons/iconsConfig";
import styles from "./kyc-grid.module.css";
import DashboardButton from "../ui/dashboard-button";
import LinkWithProgress from "../ui/link-with-progress";
import React, { use, useEffect } from "react";
import { MobileNavContext } from "@/store/mobileNav-context";
import { useRouter } from "next/navigation";
import nProgress from "nprogress";
import { UserContext } from "@/store/user-context";

export default function KycGrid() {
  const router = useRouter();
  const { mobileNav, setMobileNav } = use(MobileNavContext);
  const { user } = use(UserContext);


  function hasEmptyFields() {
    return Object.values(user).some((value) => value === "");
  }

  const info = [
    {
      title: "Basic Info",
      value: "Your personnal informations",
      icon: hasEmptyFields() ? "arrowForward" : "checkCircle",
    },
    {
      title: "Identity Documents",
      value: "Submit proof of identity document",
      icon: user.kycStatus !== "not verified" ? "checkCircle" : "arrowForward",
    },
  ];

  useEffect(() => {
    if (mobileNav) {
      setMobileNav(false);
    }
  }, []);

  function gotoKyc() {
    if (user.kycStatus !== "not verified") {
      return;
    }
    nProgress.start();
    router.replace("/kyc/verify");
  }
  function gotoProfile() {
    nProgress.start();
    router.replace("/profile");
  }

  return (
    <div className={styles.kycGridContainer}>
      <ul className={styles.kycGrid}>
        {info.map((item, index) => {
          const Icon = iconsConfig[item.icon];
          const isKycDocs = item.title === "Identity Documents";

          const handleClick = isKycDocs ? gotoKyc : gotoProfile;
          return (
            <li className={styles.kycCard} key={index} onClick={handleClick}>
              <span>
                <p>{item.title}</p>
                <p>{item.value}</p>
              </span>

              <Icon />
            </li>
          );
        })}
      </ul>

      <div>
        {user.kycStatus === "not verified" && (
          <DashboardButton href="/kyc/verify" theme="blue-400">
            Click to Proceed
          </DashboardButton>
        )}

        {user.kycStatus === "not verified" ? (
          <p>
            By clicking proceed, you have agreed to our{" "}
            <LinkWithProgress href="#">Terms and Conditions</LinkWithProgress>
          </p>
        ) : (
          <p>
            You are{" "}
            {user.kycStatus === "pending"
              ? "pending KYC verification. "
              : " a verified user."}{" "}
            Read our{" "}
            <LinkWithProgress href="#">Privacy Policy</LinkWithProgress>
          </p>
        )}
      </div>
    </div>
  );
}
