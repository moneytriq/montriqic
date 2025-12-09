"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styles from "./faq.module.css";

import { faqData } from "@/lib/data/faqData";

import { iconsConfig } from "@/lib/icons/iconsConfig";
import { MobileNavContext } from "@/store/mobileNav-context";
import { use, useEffect } from "react";
const RightAngle = iconsConfig["angleDown"];

export default function FaqSection() {
  const { mobileNav, setMobileNav } = use(MobileNavContext);
  useEffect(() => {
    if (mobileNav) {
      setMobileNav(false);
    }
  }, []);
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const containerVarients = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const childVarients = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };
  return (
    <motion.div
      className={styles.faqContainer}
      variants={containerVarients}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <header>
        <h1>Frequently asked questions</h1>
        <p>
          Join our community now to get a lot more information, or send us a
          mail Contact Support
        </p>
      </header>
      {faqData.map((faq) => (
        <motion.div
          key={faq.id}
          className={`${styles.faqItem} ${styles.glassEffect} ${styles.glowBorder}`}
          variants={childVarients}
        >
          <div className={styles.faqHeader} onClick={() => toggleFAQ(faq.id)}>
            <h3>{faq.question}</h3>
            <RightAngle
              className={`${styles.icon} ${
                openFAQ === faq.id ? styles.iconActive : ""
              }`}
            />
          </div>

          <AnimatePresence>
            {openFAQ === faq.id && (
              <motion.div
                className={styles.faqContent}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <p dangerouslySetInnerHTML={{ __html: faq.answer }} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  );
}
