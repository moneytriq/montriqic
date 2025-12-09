// /app/components/Navbar.jsx
"use client";

import styles from "./dashboard-navbar.module.css";
import { site } from "@/lib/data/home";
import { usePathname, useRouter } from "next/navigation";

import React, { use, useEffect, useRef, useState } from "react";
import { iconsConfig } from "@/lib/icons/iconsConfig";
import { MobileNavContext } from "@/store/mobileNav-context";
import LinkWithProgress from "../ui/link-with-progress";
import { logout } from "@/actions/logout";
import { UserContext } from "@/store/user-context";
import nProgress from "nprogress";
import { WalletBalanceContext } from "@/store/wallet-balance-context";
import { supabase } from "@/lib/db/supabaseClient";
import { AdminWalletAddressContext } from "@/store/admin-wallet-context";
import { formatNumber } from "@/util/util";

const {
  hamburger: Menu,
  close: Close,
  profile: ProfileIcon,
  angleDown: AngleDownIcon,
  arrowIn: DepositIcon,
  arrowOut: WithdrawIcon,
  logout: LogoutIcon,
} = iconsConfig;

const quickLinks = [
  { title: "View Profile", href: "/profile", icon: "user" },
  { title: "KYC Verification", href: "/kyc", icon: "checkCircle" },
];

export default function DashboardNavbar() {
  const router = useRouter();
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);
  const { mobileNav, setMobileNav } = use(MobileNavContext);
  const { user, setUser } = use(UserContext);
  const [isDropdown, setIsDropdown] = useState(false);
  const { walletBalance, setWalletBalance } = use(WalletBalanceContext);
  const { setAdminWalletAddress } = use(AdminWalletAddressContext);

  useEffect(() => {
    if (mobileNav) {
      setMobileNav(false);
    }
  }, []);

  useEffect(() => {
    function handleClick(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setIsDropdown(false);
      }
    }
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  async function handleLogoutClick() {
    try {
      const res = await logout();
      setUser({
        id: "",
        email: "",
        fullName: "",
        displayName: "",
        phone: "",
        telegram: "",
        gender: "",
        dateOfBirth: "",
        country: "",
        address: "",
        kycStatus: "",
        walletAddress: "",
        role: "",
      });
    } catch (error) {
      console.error(error.message);
      toast.error("Something went wrong, please try again");
    }
    router.replace("/auth");
  }

  useEffect(() => {
    const subscription = supabase
      .channel("wallet")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "wallet",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log("New balance:", payload);
          setWalletBalance(payload.new.available_balance);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [user.id]);

  useEffect(() => {
    const subscription = supabase
      .channel("user_profile")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "user_profile",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log("New user details:", payload);
          setUser((prev) => ({
            ...prev,
            fullName: payload.new.full_name || "",
            displayName: payload.new.display_name || "",
            phone: payload.new.phone || "",
            telegram: payload.new.telegram || "",
            gender: payload.new.gender || "",
            dateOfBirth: payload.new.date_of_birth || "",
            country: payload.new.country || "",
            address: payload.new.address || "",
            kycStatus: payload.new.kyc_status || "",
            walletAddress: payload.new.wallet_address || "",
            role: payload.new.role || "",
          }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [user.id]);

  useEffect(() => {
    const subscription = supabase
      .channel("admin_wallet")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "admin_wallet",
        },
        (payload) => {
          console.log("New admin wallet details:", payload);
          setAdminWalletAddress(payload.new.wallet_address);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <nav className={styles.nav}>
      <div className={styles.brandContainer}>
        {!mobileNav ? (
          <Menu className={styles.menu} onClick={() => setMobileNav(true)} />
        ) : (
          <Close className={styles.menu} onClick={() => setMobileNav(false)} />
        )}
        <div className={styles.brand}>{site.brand}</div>
      </div>

      <div className={styles.actions}>
        <div ref={profileRef} className={styles.profileContainer}>
          <ProfileIcon />
          <span>
            <p
              className={styles.kycStatus}
              style={
                user.kycStatus === "not verified"
                  ? { color: "var(--red-400)" }
                  : user.kycStatus === "pending"
                  ? { color: "var(--orange-400)" }
                  : { color: "var(--green-400)" }
              }
            >
              {user.kycStatus}
            </p>
            <span onClick={() => setIsDropdown((prev) => !prev)}>
              <p className={styles.displayName}>{user.displayName}</p>{" "}
              <AngleDownIcon />
            </span>
          </span>
        </div>

        {isDropdown && (
          <div ref={dropdownRef} className={styles.dropDown}>
            <div className={styles.top}>
              <span className={styles.balanceTitle}>Account balance</span>
              <span className={styles.balance}>
                <b>{formatNumber(walletBalance)}</b> USD
              </span>

              <span
                className={styles.quickAction}
                onClick={() => {
                  nProgress.start();
                  router.push("/investment/deposit");
                }}
              >
                Deposit Funds <DepositIcon />
              </span>
              <span
                className={styles.quickAction}
                onClick={() => {
                  nProgress.start();
                  router.push("/investment/withdraw");
                }}
              >
                Withdraw Funds <WithdrawIcon />
              </span>
            </div>

            <hr />

            <ul className={styles.quickLinksContainer}>
              {quickLinks.map((link) => {
                const Icon = iconsConfig[link.icon];
                return (
                  <li key={link.title} className={styles.linkItem}>
                    <LinkWithProgress href={link.href}>
                      <Icon />
                      {link.title}
                    </LinkWithProgress>
                  </li>
                );
              })}
            </ul>

            <hr />

            <span className={styles.linkItem}>
              <button type="button" onClick={handleLogoutClick}>
                <LogoutIcon />
                Sign Out
              </button>
            </span>
          </div>
        )}
      </div>
    </nav>
  );
}
