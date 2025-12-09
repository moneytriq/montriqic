// /app/components/Navbar.jsx
"use client";

import styles from "./navbar.module.css";
import { site } from "@/lib/data/home";
import { usePathname } from "next/navigation";

import React, { use, useEffect, useState } from "react";
import LinkWithProgress from "./ui/link-with-progress";
import { iconsConfig } from "@/lib/icons/iconsConfig";
import { MobileNavContext } from "@/store/mobileNav-context";

const { hamburger: Menu, close: Close } = iconsConfig;

export default function Navbar({user}) {
  const path = usePathname();
   const isLoggedIn = user !== null;
  const { mobileNav, setMobileNav } = use(MobileNavContext);

  useEffect(() => {
    if (mobileNav) {
      setMobileNav(false);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setMobileNav(false);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <header className={styles.mainHeader}>
      <nav className={styles.nav}>
        <div className={styles.brand}>{site.brand}</div>
        <ul className={styles.links}>
          {site.nav.map((item) => (
            <li key={item.label}>
              <LinkWithProgress
                href={item.href}
                style={
                  path === item.href
                    ? { color: "var(--purple-400)" }
                    : undefined
                }
              >
                {item.label}
              </LinkWithProgress>
            </li>
          ))}
        </ul>
        <div className={styles.actions}>
          {!mobileNav ? (
            <Menu className={styles.menu} onClick={() => setMobileNav(true)} />
          ) : (
            <Close
              className={styles.menu}
              onClick={() => setMobileNav(false)}
            />
          )}
          {!isLoggedIn ? (
            <>
              <LinkWithProgress href="/auth?mode=signup" className={styles.ghost}>
                Register
              </LinkWithProgress>
              <LinkWithProgress href="/auth" className={styles.primary}>
                Login
              </LinkWithProgress>
            </>
          ) : (
            <LinkWithProgress href="/dashboard" className={styles.primary}>
              Dashboard
            </LinkWithProgress>
          )}
        </div>
      </nav>
      {mobileNav && (
        <div className={styles.mobileMenu}>
          <ul className={styles.links}>
            {site.nav.map((item) => (
              <li key={item.label}>
                <LinkWithProgress
                  href={item.href}
                  style={
                    path === item.href
                      ? { color: "var(--purple-400)" }
                      : undefined
                  }
                >
                  {item.label}
                </LinkWithProgress>
              </li>
            ))}
          </ul>
          <div className={styles.mobileActionButtons}>
            {!isLoggedIn ? (
              <>
                <LinkWithProgress href="/auth?mode=signup" className={styles.ghost}>
                  Register
                </LinkWithProgress>
                <LinkWithProgress  href="/auth" className={styles.primary}>
                  Login
                </LinkWithProgress>
              </>
            ) : (
              <LinkWithProgress href="/dashboard" className={styles.primary}>
                Dashboard
              </LinkWithProgress>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
