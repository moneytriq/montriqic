// components/ReferralSection/ReferralSection.jsx
"use client";

import Image from "next/image";
import styles from "./referral-programs.module.css";
import { referralData } from "@/lib/data/referralData";

export default function ReferralPrograms() {
  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        {/* LEFT COLUMN */}
        <div className={styles.left}>
          <div className={styles.introImageWrapper}>
            <Image
              src={referralData.introImage}
              alt="Referral"
              fill
              sizes="80vw"
            />
          </div>
            <p className={styles.introParagraph}>{referralData.introText}</p>

          {/* LEVELS */}
          {referralData.levels.map((level, index) => (
            <div key={index}>
              <p className={styles.levelTitle}>{level.title}</p>
              <p className={styles.levelDescription}>{level.description}</p>
              <br />
              <br />
            </div>
          ))}

          <p className={styles.descriptionParagraph}>
            {referralData.instantBonusNote}
          </p>

          {/* MAIN HEADING */}
          <h2 className={styles.sectionHeading}>{referralData.heading}</h2>

          {/* PARAGRAPHS */}
          {referralData.descriptionParagraphs.map((text, index) => (
            <p key={index} className={styles.descriptionParagraph}>
              {text}
            </p>
          ))}
        </div>

        {/* RIGHT COLUMN */}
        <div className={styles.right}>
          <div className={styles.imageWrapper}>
            <img
              src={referralData.sideImage}
              alt="Referral Program"
              className={styles.sideImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
