"use client";

import LinkWithProgress from "../ui/link-with-progress";
import styles from "./section.module.css";

export default function Section({
  label,
  title = null,
  description = [],
  children,
}) {
  return (
    <section id={label} className={styles.dashboardSection}>
      {title && (
        <div className={styles.sectionHeader}>
          <div>
            <h3>{title}</h3>
            {description[0].type !== "button" ? (
              <p> {description[0].text}</p>
            ) : (
              <LinkWithProgress href={description[0].href}>
                {description[0].text}
              </LinkWithProgress>
            )}
          </div>
        </div>
      )}
      {children}
    </section>
  );
}
