"use client";
import { iconsConfig } from "@/lib/icons/iconsConfig";
import styles from "./copy-button.module.css";
import { useState } from "react";

const { copy: CopyIcon, checkCircle: CheckIcon } = iconsConfig;

export default function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  return (
    <button type="button" className={styles.copyButton} onClick={handleCopy}>
      {!copied ? (
        <>
          <CopyIcon />
          Copy
        </>
      ) : (
        <>
          <CheckIcon />
          Copied
        </>
      )}
    </button>
  );
}
