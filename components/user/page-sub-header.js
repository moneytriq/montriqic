"use client";
import { iconsConfig } from "@/lib/icons/iconsConfig";
import styles from "./page-sub-header.module.css";

const { search: SearchIcon } = iconsConfig;

export default function PageSubHeader({ title }) {
  return (
    <div className={styles.pageSubHeader}>
      <h2>{title}</h2>
      {/* 
      <SearchIcon /> */}

      {/* <div className={styles.inputField}>


        <SearchIcon />
      </div> */}
    </div>
  );
}
