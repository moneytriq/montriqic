import styles from "./text-button.module.css";

export default function TextButton({ children, ...props }) {
  return (
    <button type="button" className={styles.textButton} {...props}>
      {children}
    </button>
  );
}
