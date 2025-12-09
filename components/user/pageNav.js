"use client";
import { use } from "react";
import styles from "./pageNav.module.css";
import { motion } from "framer-motion";
import { PageNavContext } from "@/store/pagNav-context";

export default function PageNav({ label = null, navigations = [] }) {
  const { pageNav, setPageNav } = use(PageNavContext);
  return (
    <ul className={styles.pagNavContainer}>
      {navigations.map((nav, index) => (
        <li
          key={index}
          onClick={() => setPageNav(nav)}
          className={pageNav === nav ? styles.active : undefined}
        >
          {nav}
          {pageNav === nav && (
            <motion.div
              layoutId="tab-indicator"
              className={styles.activeTabIndicator}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
