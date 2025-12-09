import { iconsConfig } from "@/lib/icons/iconsConfig";
import styles from "./address-holder.module.css";
import CopyButton from "./copy-button";

export default function AddressHolder({
  title,
  subtitle = null,
  value,
  walletType = null,
  icon,
}) {
  const Icon = iconsConfig[icon];
  return (
    <div className={styles.addressField}>
      <label>{title}</label>
      <div className={styles.account}>
        <Icon />

        {walletType && <span className={styles.walletType}>{walletType}</span>}

        {!subtitle ? (
          <div className={styles.depositAddressContainer}>
            <span>{value}</span>
           
            <CopyButton text={value} />
          </div>
        ) : (
          <div>
            <span>{subtitle}</span>
            <span>{value}</span>
          </div>
        )}
      </div>
    </div>
  );
}
