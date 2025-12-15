import { iconsConfig } from "@/lib/icons/iconsConfig";
import styles from "./address-holder.module.css";
import CopyButton from "./copy-button";

export default function AddressHolder({
  label = null,
  title,
  subtitle = null,
  walletType = null,
  walletNetwork = null,
  value,
  icon,
}) {
  const Icon = iconsConfig[icon];
  return (
    <div className={styles.addressField} style={{ overflow: "hidden" }}>
      <label>{title}</label>
      <div className={styles.account}>
        <Icon />

        {walletType && (
          <div className={styles.walletType}>
            {walletType} {walletNetwork}
          </div>
        )}

        {label !== "address" ? (
          <div>
            <span>{subtitle}</span>
            <span>{value}</span>
          </div>
        ) : (
          <div className={styles.depositAddressContainer}>
            <span>{value}</span>

            <CopyButton text={value} />
          </div>
        )}
      </div>
    </div>
  );
}
