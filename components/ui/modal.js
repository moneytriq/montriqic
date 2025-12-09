"use client";
import { useEffect } from "react";
import DashboardButton from "./dashboard-button";
import styles from "./modal.module.css";
import { motion } from "framer-motion";

export default function Modal({
  buttons = [],
  isModalOpen,
  setIsModal,
  children,
}) {
  return (
    <motion.div
      className={styles.backdrop}
      onClick={() => setIsModal(false)}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
      }}
      exit={{
        opacity: 0,
      }}
    >
      <motion.div
        className={styles.dialog}
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.5,
          type: "spring",
        }}
        exit={{
          opacity: 0,
          scale: 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        {buttons && (
          <div className={styles.buttonGroup}>
            {buttons.map((button, index) => {
              return (
                <button
                  type={button.type}
                  key={index}
                  style={
                    !button.disabled
                      ? { background: `var(--${button.theme})` }
                      : { opacity: 0.5, background: `var(--${button.theme})` }
                  }
                  onClick={button.click ? button.click : undefined}
                  disabled={button.disabled || false}
               
                >
                  {button.text}
                </button>
              );
            })}
          </div>
        )}
      </motion.div>
      ;
    </motion.div>
  );
}
