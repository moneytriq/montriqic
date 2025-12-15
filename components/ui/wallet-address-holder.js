"use client";
import { iconsConfig } from "@/lib/icons/iconsConfig";
import styles from "./address-holder.module.css";
import CopyButton from "./copy-button";
import { use, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SelectWalletContext } from "@/store/select-wallet-context";

export default function WalletAddressHolder({ title, value, icon }) {
 
  const Icon = iconsConfig[icon];

  const { selectedWallet: wallet, setSelectedWallet: setWallet } =
    use(SelectWalletContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropUp, setDropUp] = useState(false);

  useEffect(() => {
    setWallet(value[0]);
    function handleClick(e) {
      const target = e.target;
      if (
        !target.closest(`.${styles.selectWaletDropDown}`) &&
        !target.classList.contains(`${styles.walletType}`)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, [value]);

  const buttonRef = useRef(null);

  function handleOpen(e) {
    console.log("clicked");

    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    setDropUp(spaceBelow < 200 && spaceAbove > spaceBelow);
    setShowDropdown(true);
  }

  function handleWalletSelect(e, selectedAddress) {
    e.stopPropagation();
    console.log("child");
    setWallet(selectedAddress);
    setShowDropdown(false);
  }
//   console.log("v",value);

  return (
    <div className={styles.addressField} key={value} >
      <label>{title}</label>
      <div className={styles.account} style={{ overflowX: "clip" }}>
        <Icon />

        <div
          className={styles.walletType}
          ref={buttonRef}
          style={{ cursor: "pointer" }}
          onClick={handleOpen}
        >
          {wallet.type} {wallet.network}
          <AnimatePresence>
            {showDropdown && (
              <motion.ul
                className={styles.selectWaletDropDown}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                style={dropUp ? { top: "-480%" } : undefined}
              >
                {value.map((address, index) => (
                  <li
                    key={address.type + index}
                    onClick={(e) => handleWalletSelect(e, address)}
                  >
                    <span>{address.type}</span>

                    <span>{address.network}</span>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <div className={styles.depositAddressContainer}>
          <span>{wallet.address}</span>

          <CopyButton text={wallet.address} />
        </div>
      </div>
    </div>
  );
}
