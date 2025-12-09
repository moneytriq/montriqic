"use client";
import Image from "next/image";
import styles from "./hero.module.css";
import { MobileNavContext } from "@/store/mobileNav-context";
import { use, useEffect } from "react";
import LinkWithProgress from "./ui/link-with-progress";
export default function HeroSection({ user }) {
  const isLoggedIn = user !== null;
  const { mobileNav, setMobileNav } = use(MobileNavContext);
  useEffect(() => {
    if (mobileNav) {
      setMobileNav(false);
    }
  }, []);
  return (
    <>
      {/* Light Gradient */}
      <picture className="gradientLight">
        <Image
          src="/images/background/gradient-light-bg.jpg"
          alt="gradient"
          fill
          sizes="100vw"
        />
      </picture>

      {/* Dark Gradient */}
      {/* <picture className="gradientLight">
        <Image
          src="/images/background/gradient-dark-bg.jpg"
          alt="gradient"
          fill
          sizes="100vw"
        />
      </picture> */}
      <div className={styles.grid}>
        {/* Left Column */}
        <div className={styles.leftContent}>
          <div className={styles.badge}>
            <img
              src="/images/iphone-preview.png"
              alt=""
              width="20"
              height="20"
            />
            <span>#1 TRADING SERVICES FIRM</span>
          </div>

          <h1 className={styles.heading}>
            Revolutionize your financial future today.
          </h1>

          <p className={styles.subtext}>
            Trade digital currencies and instruments at the best available rate.
          </p>

          {!isLoggedIn ? (
            <LinkWithProgress
              href="/auth?mode=signup"
              className={styles.button}
            >
              Create a free account
            </LinkWithProgress>
          ) : (
            <LinkWithProgress href="/dashboard" className={styles.button}>
              Start Investing
            </LinkWithProgress>
          )}
        </div>

        {/* Right Column - Hero Image */}
        <div className={styles.rightContent}>
          <div className={styles.heroWrapper}>
            <div className={styles.iphoneImageContainer}>
              <Image
                src="/images/iphone-preview.png"
                alt="hero"
                fill
                sizes="100vw"
              />
            </div>

            <div className={styles.flyWrapper}>
              <Image
                src="/images/3d_elements_crypto_app_light.png"
                className={styles.lightFly}
                alt=""
                fill
                // sizes="100vw"
              />
              {/* <img
                  src="https://worthoder.com/img/crypto-app/3d_elements_crypto_app_dark.png"
                  className={styles.darkFly}
                  alt=""
                /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
