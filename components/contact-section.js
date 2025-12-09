"use client";
import Image from "next/image";
import styles from "./contact-section.module.css";
import { MobileNavContext } from "@/store/mobileNav-context";
import { use, useEffect } from "react";

export default function ContactSection() {
  const { mobileNav, setMobileNav } = use(MobileNavContext);

  useEffect(() => {
    if (mobileNav) {
      setMobileNav(false);
    }
  }, []);
  return (
    <div className={styles.contactSection}>
      <div className={styles.flex}>
        {/* Contact Form */}
        <div className={styles.formWrapper}>
          <h2 className={styles.heading}>Contact Us</h2>
          <p className={styles.description}>
            If you need advice or have any question in mind or technical
            assistance, do not hesitate to contact our specialists.
          </p>

          <form id="contact-form" method="post" action="#">
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.label}>
                  Name<span className={styles.required}>*</span>
                </label>
                <input
                  name="name"
                  id="name"
                  type="text"
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email<span className={styles.required}>*</span>
                </label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  required
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label htmlFor="phone" className={styles.label}>
                  Phone Number<span className={styles.required}>*</span>
                </label>
                <input
                  name="phone"
                  id="phone"
                  type="tel"
                  required
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.textareaGroup}>
              <label htmlFor="message" className={styles.label}>
                Message<span className={styles.required}>*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
                className={styles.textarea}
              />
            </div>

            <div className={styles.checkboxRow}>
              <input
                type="checkbox"
                id="contact-form-consent-input"
                className={styles.checkbox}
              />
              <label
                htmlFor="contact-form-consent-input"
                className={styles.checkboxLabel}
              >
                I agree to the{" "}
                <a href="/terms" className={styles.link}>
                  Terms of Service
                </a>
              </label>
            </div>

            <button
              type="submit"
              id="contact-form-submit"
              className={styles.button}
            >
              Submit
            </button>

            <div id="contact-form-notice" className={styles.notice}></div>
          </form>
        </div>

        {/* Contact Info */}
        <div className={styles.infoWrapper}>
          <h2 className={styles.heading}>Our Information</h2>

          <div className={styles.infoCard}>
            <div className={styles.infoRow}>
              <span className={styles.iconCircle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M2.243 6.854L11.49 1.31a1 1 0 0 1 1.029 0l9.238 5.545a.5.5 0 0 1 .243.429V20a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.283a.5.5 0 0 1 .243-.429zM4 8.133V19h16V8.132l-7.996-4.8L4 8.132zm8.06 5.565l5.296-4.463 1.288 1.53-6.57 5.537-6.71-5.53 1.272-1.544 5.424 4.47z" />
                </svg>
              </span>

              <div>
                <span className={styles.infoTitle}>Email</span>
                <a href="mailto:[email protected]" className={styles.infoEmail}>
                  support@monetriq.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Image */}
      <div className={styles.bottomContainer}>
        <Image
          src="/images/piggy-bank.png"
          alt="About"
          className={styles.bottomImage}
          fill
          sizes="100vw"
        />
      </div>
    </div>
  );
}
