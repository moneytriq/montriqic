"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./mobile-side-nav.module.css";
import { iconsConfig } from "@/lib/icons/iconsConfig";
import LinkWithProgress from "@/components/ui/link-with-progress";
import { MobileNavContext } from "@/store/mobileNav-context";
import { use, useEffect, useState } from "react";
import Backdrop from "../ui/backdrop";
import { logout } from "@/actions/logout";
import { toast } from "sonner";
import nProgress from "nprogress";
import { formatNumber } from "@/util/util";
import { WalletBalanceContext } from "@/store/wallet-balance-context";
import { UserContext } from "@/store/user-context";
import { ExchangeRateContext } from "@/store/exchange-rate-context";

const {
  hamburger: Menu,
  close: Close,
  home: HomeIcon,
  angleDown: AngleDown,
  arrowIn: DepositIcon,
  arrowOut: WithdrawIcon,
  logout: LogoutIcon,
} = iconsConfig;

const links = [
  { name: "Dashboard", icon: "dashboard", href: "/dashboard" },
  { name: "Transactions", icon: "transaction", href: "/transactions" },
  { name: "Investment", icon: "invest", href: "/investment" },
  { name: "Our Plans", icon: "plans", href: "/our-plans" },
  { name: "Profile", icon: "user", href: "/profile" },
  { name: "Referral", icon: "share", href: "/referral-overview" },
];

const quickLinks = [
  { title: "View Profile", href: "/profile", icon: "user" },
  {
    title: "Account Settings",
    href: "/profile?mode=account",
    icon: "settings",
  },
];

export default function MobileSideNav({ user }) {
  const pathname = usePathname();
  const router = useRouter();
  const { mobileNav, setMobileNav } = use(MobileNavContext);
  const { setUser } = use(UserContext);

  const { walletBalance, setWalletBalance } = use(WalletBalanceContext);
  const { exchangeRate } = use(ExchangeRateContext);

  const [isDropdown, setIsDropdown] = useState(false);

  const userSplit = user.fullName.split(" ");

  const firstNameAbbrev = userSplit[0]?.charAt(0).toUpperCase();
  const secondNameAbbrev = userSplit[1]?.charAt(0)?.toUpperCase();

  let userNameAbrev = firstNameAbbrev;

  if (secondNameAbbrev) {
    userNameAbrev = firstNameAbbrev + secondNameAbbrev;
  }

  const balanceInEur = walletBalance * exchangeRate.eurRate;

  useEffect(() => {
    const handleResize = () => {
      setMobileNav(false);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks =
    user.role !== "admin"
      ? links
      : [
          ...links,
          { name: "Overview", icon: "overview", href: "/admin/overview" },
          { name: "Deposit Requests", icon: "arrowIn", href: "/admin/deposit" },
          {
            name: "Withdraw Requests",
            icon: "arrowOut",
            href: "/admin/withdraw",
          },
          { name: "KYC Requests", icon: "checkCircle", href: "/admin/kyc" },
          {
            name: "Manage Users",
            icon: "makeAdmin",
            href: "/admin/manage-users",
          },
        ];

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

  return (
    <AnimatePresence>
      <>
        <Backdrop onClick={() => setMobileNav(false)} />
        <motion.aside
          className={styles.MobileSideNav}
          initial={{ x: -20, opacity: 0 }}
          animate={
            mobileNav
              ? { x: 0, opacity: 1, display: "flex" }
              : { x: -20, opacity: 0, display: "none" }
          }
          transition={{
            type: "spring",
            duration: 0.5,
          }}
        >
          <div className={styles.sidebarHeader}>
            <LinkWithProgress href="/">Monetriq</LinkWithProgress>
          </div>

          <div className={styles.accountDetailBox}>
            <span className={styles.iconBox}>{userNameAbrev}</span>

            <div className={styles.nameDetails}>
              <span>{user.fullName}</span>
              <span>{user.email}</span>
            </div>

            <AngleDown onClick={() => setIsDropdown((prev) => !prev)} />
          </div>

          <AnimatePresence>
            {isDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.5,
                  type: "spring",
                }}
                className={styles.dropDown}
              >
                <div className={styles.top}>
                  <span className={styles.balanceTitle}>Account balance</span>
                  <span className={styles.balance}>
                    <span>
                      <b>{formatNumber(walletBalance)}</b> USD
                    </span>
                    <span>
                      <b>{formatNumber(balanceInEur)}</b> Eur
                    </span>
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

                <span
                  className={styles.linkItem}
                  style={{
                    display: "flex",
                    borderBottom: "1px solid var(--jacarta-300)",
                    paddingBottom: "1rem",
                  }}
                >
                  <button type="button" onClick={handleLogoutClick}>
                    <LogoutIcon />
                    Sign Out
                  </button>
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <nav>
            <p className={styles.navSectionLabel}>Menu</p>
            {navLinks.map((link, index) => {
              const Icon = iconsConfig[link.icon];
              return (
                <LinkWithProgress
                  key={index}
                  href={link.href}
                  className={`${styles.navLink} ${
                    pathname.includes(link.href.toLowerCase())
                      ? styles.active
                      : null
                  }`}
                >
                  <span className={styles.iconBox}>
                    <Icon />
                  </span>
                  {link.name}
                </LinkWithProgress>
              );
            })}
          </nav>

          <p className={styles.navSectionLabel}>Additional</p>
          <div className={styles.sidebarFooter}>
            <LinkWithProgress href="/">
              <span className={styles.iconBox}>
                <HomeIcon />
              </span>
              Go Home
            </LinkWithProgress>
          </div>
        </motion.aside>
      </>
    </AnimatePresence>
  );
}
