import styles from "./section.module.css";

export default function Section({ sectionBgGray, children }) {
  return (
    <section className={`${sectionBgGray} ${styles.section}`}>
      <div className="container">{children}</div>
    </section>
  );
}
