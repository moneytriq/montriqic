"use client";
import { MobileNavContext } from "@/store/mobileNav-context";
import styles from "./aboutInfo.module.css";
import { briefInfo } from "@/lib/data/aboutData";
import { use, useEffect } from "react";

export default function AboutInfo() {
   const { mobileNav, setMobileNav } = use(MobileNavContext);
  
    useEffect(() => {
      if (mobileNav) {
        setMobileNav(false);
      }
    }, []);
  return (
    <div className={styles.aboutInfoContainer}>
      <h1>About Us</h1>
      <p>{briefInfo.info}</p>
    </div>
  );
}
