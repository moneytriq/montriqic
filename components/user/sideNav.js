"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./side-nav.module.css";
import { iconsConfig } from "@/lib/icons/iconsConfig";
import LinkWithProgress from "@/components/ui/link-with-progress";

const { hamburger: Menu, close: Close } = iconsConfig;

const links = [
  { name: "Dashboard", icon: "dashboard", href: "/dashboard" },
  { name: "Transactions", icon: "transaction", href: "/transactions" },
  { name: "Investment", icon: "invest", href: "/investment" },
  { name: "Our Plans", icon: "plans", href: "/our-plans" },
  { name: "Profile", icon: "user", href: "/profile" },
  // { name: "Referral", icon: "share", href: "/referral-overview" },
];

export default function SideNav({ user }) {
  const pathname = usePathname();
  const router = useRouter();

  const navLinks =
    user.role !== "admin"
      ? links
      : [
          ...links,
          { name: "Overview", icon: "overview", href: "/admin/overview" },
          { name: "Deposit Requests", icon: "arrowIn", href: "/admin/deposit" },
          { name: "Withdraw Requests", icon: "arrowOut", href: "/admin/withdraw" },
          { name: "KYC Requests", icon: "checkCircle", href: "/admin/kyc" },
          { name: "Make Admin", icon: "makeAdmin", href: "/admin/make-admin" },
        ];

  return (
    <AnimatePresence mode="wait">
      <motion.aside className={styles.dashboardSideNav}>
        <div className={styles.sidebarHeader}>
          <LinkWithProgress href="/">Monetriq</LinkWithProgress>
        </div>

        <nav>
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
      </motion.aside>
    </AnimatePresence>
  );
}
