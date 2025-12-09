// components/AboutSection/AboutSection.jsx
"use client";

import Image from "next/image";
import styles from "./aboutHero.module.css";
import { aboutSectionData } from "@/lib/data/aboutData";

export default function AboutHero() {
  return (
    <section className={styles.aboutHeroSection}>
      {/* Background Image */}
      <picture className="gradientLight">
        <Image
          src="/images/background/gradient-light-bg.jpg"
          alt="gradient"
          fill
          sizes="100vw"
        />
      </picture>

      <div className={styles.container}>
        <div className={styles.layout}>
          {/* LEFT SIDE IMAGE */}
          <div className={styles.left}>
            <div className={styles.imageWrapper}>
              <svg
                viewBox="0 0 200 200"
                className={styles.svgImage}
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <clipPath id="clipping" clipPathUnits="userSpaceOnUse">
                    <path
                      d="
                        M 0, 100
                        C 0, 17 17, 0 100, 0
                        S 200, 17 200, 100
                        183, 200 100, 200
                        0, 183 0, 100
                      "
                      fill="#9446ED"
                    />
                  </clipPath>
                </defs>

                <g clipPath="url(#clipping)">
                  <image
                    href={aboutSectionData.imageMain}
                    width="200"
                    height="200"
                  />
                </g>
              </svg>

              <Image
                src={aboutSectionData.floatingImage}
                className={styles.floatingImage}
                alt="Floating decoration"
                fill
                sizes="50vw"
              />
            </div>
          </div>

          {/* RIGHT SIDE TEXT */}
          <div className={styles.right}>
            <h2 className={styles.title}>{aboutSectionData.title}</h2>

            <p className={styles.subtitle}>{aboutSectionData.subtitle}</p>

            <p className={styles.description}>{aboutSectionData.description}</p>

            <div className={styles.statsRow}>
              {aboutSectionData.stats.map((item, index) => (
                <div key={index} className={styles.statBlock}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className={styles.statIcon}
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 22C6 22 2 17 2 12S6 2 12 2s10 4 10 10-4 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-4L6.8 11.8l1.4-1.4 2.8 2.8 5.6-5.6 1.4 1.4L11 16z" />
                  </svg>

                  <div>
                    <span className={styles.statValue}>{item.value}</span>
                    <span className={styles.statLabel}>{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
