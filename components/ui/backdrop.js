import { motion } from "framer-motion";

import styles from "./backdrop.module.css";
import { MobileNavContext } from "@/store/mobileNav-context";
import { use } from "react";

export default function Backdrop({ ...props }) {
  const { mobileNav, setMobileNav } = use(MobileNavContext);
  return (
    <motion.div
      className={styles.backdrop}
      {...props}
      initial={{
        display: "none",
        opacity: 0,
      }}
      animate={
        mobileNav
          ? {
              display: "block",
              opacity: 1,
            }
          : { opacity: 0 }
      }
      transition={{
        duration: 0.5,
      }}
      exit={{
        display: "none",
        opacity: 0,
      }}
    ></motion.div>
  );
}
