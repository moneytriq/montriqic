"use client";
import { iconsConfig } from "@/lib/icons/iconsConfig";
import styles from "./need-help-grid.module.css";
import { needHelpData } from "@/lib/data/needHelpData";
import Image from "next/image";

export default function NeedHelpGrid() {
  return (
    <div className={styles.needHelpContainer}>
      <div className={styles.flexCenter}>
        {/* Left Text */}
        <div>
          <h2 className={styles.sectionTitle}>{needHelpData.title}</h2>
          <p className={styles.sectionText}>{needHelpData.text1}</p>
          <p className={styles.sectionText}>{needHelpData.text2}</p>
        </div>

        {/* Right Cards */}
        <div>
          {needHelpData.cards.map((card, idx) => {
            const Icon = iconsConfig[card.icon];
            return (
              <div
                key={idx}
                className={styles.card}
                style={card.bg ? { background: card.bg } : null}
              >
                <Icon className={styles.cardIcon} />
                <span className={styles.cardTitle}>{card.title}</span>
                <p className={styles.cardText}>{card.text}</p>
                <a href={card.link} className={styles.cardLink}>
                  {card.linkText}
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hero Image */}
      <div className={styles.imgWrapper}>
        <Image
          src={needHelpData.heroImg}
          alt="About"
          className={styles.imgHero}
          fill
          sizes="300px"
        />
      </div>
    </div>
  );
}
