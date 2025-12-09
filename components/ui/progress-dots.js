"use client";
import { use } from "react";
import styles from "./progress-dots.module.css";
import { ProgressContext } from "@/store/progress-context";

export default function ProgressDots({ count = 2 }) {
  const { progress, setProgress } = use(ProgressContext);
  return (
    <div className={styles.progressDotContainer}>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className={styles.dot}
          style={progress === i ? { background: "var(--teal-400)" } : undefined}
        ></div>
      ))}
    </div>
  );
}
