"use client";
import styles from "./investment-form.module.css";
import Modal from "../ui/modal";
import { use, useEffect, useRef, useState } from "react";
import { ConfirmInvestmentModalContext } from "@/store/confirm-investment-modal-context";
import { AnimatePresence, motion } from "framer-motion";
import AddressHolder from "../ui/address-holder";
import { WalletBalanceContext } from "@/store/wallet-balance-context";
import { formatNumber } from "@/util/util";
import { toast } from "sonner";
import { makeDeposit } from "@/actions/deposit-action";
import { useRouter } from "next/navigation";
import { UserContext } from "@/store/user-context";
import { makeWithdrawal } from "@/actions/withdraw-action";
import { AdminWalletAddressContext } from "@/store/admin-wallet-context";

export default function UserDepositForm() {
  const router = useRouter();
  const { user } = use(UserContext);
  const { confirmInvestmentModal, setConfirmInvestmentModal } = use(
    ConfirmInvestmentModalContext
  );
  const { walletBalance } = use(WalletBalanceContext);

  const { adminWalletAddress } = use(AdminWalletAddressContext);

  const [amountInput, setAmountInput] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(
    adminWalletAddress[0] || { id: "", type: "", network: "", address: "" }
  );

  const [rates, setRates] = useState({
    btc: "",
    eth: "",
    xrp: "",
    sol: "",
    trx: "",
    usdt: "",
  });
  const [dropUp, setDropUp] = useState(false);

  const buttonRef = useRef(null);

  useEffect(() => {
    if (confirmInvestmentModal) setConfirmInvestmentModal(false);
  }, []);

  useEffect(() => {
    const getExchangeData = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,tether,solana,tron&vs_currencies=usd,eur"
        );
        const data = await res.json();

        setRates({
          btc: data.bitcoin.usd,
          eth: data.ethereum.usd,
          xrp: data.ripple.usd,
          sol: data.solana.usd,
          trx: data.tron.usd,
          usdt: data.tether.usd,
        });

        return data;
      } catch (error) {
        console.error("Error fetching exchange data:", error);
      }
    };

    getExchangeData();
  }, []);

  useEffect(() => {
    function handleClick(e) {
      const target = e.target;
      if (
        !target.closest(`.${styles.selectWaletDropDown}`) &&
        !target.classList.contains(`${styles.currencyWrapper}`) &&
        !target.classList.contains(`${styles.walletType}`)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  let selectedRate = rates[selectedWallet.type];
  console.log("selectedrate", selectedRate);

  function handleChange(e) {
    setAmountInput(e.target.value);
  }

  function handleOpen(e) {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    setDropUp(spaceBelow < 200 && spaceAbove > spaceBelow);
    setShowDropdown(true);
  }

  function handleWalletSelect(e, selectedAddress) {
    e.stopPropagation();

    setSelectedWallet(selectedAddress);

    console.log(selectedWallet);

    setShowDropdown(false);
  }

  async function handleConfirmDepositClick() {
    setIsLoading(true);
    try {
      const amount = amountInput * selectedRate;
      const res = await makeDeposit(
        user.id,
        user.fullName,
        amount,
        selectedWallet.type
      );

      if (res.error) {
        toast.error(res.error);
        return;
      }
      toast.success("Deposit Successfull. Awaiting confirmation");

      setConfirmInvestmentModal(false);

      router.replace("/dashboard#recent-activity");

      return;
    } catch (error) {
      console.error("Supabase Error", error);
      toast.error("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <form action="#" className={styles.investmentFormContainer}>
        <div className={styles.field}>
          <label htmlFor="investment-amount">Enter Deposit Amount</label>
          <div className={styles.amountInputWrapper}>
            <input
              type="number"
              name="investment-amount"
              id="investment-amount"
              placeholder="1000"
              value={amountInput}
              onChange={handleChange}
            />

            <div
              className={styles.currencyWrapper}
              ref={buttonRef}
              style={{ cursor: "pointer" }}
              onClick={handleOpen}
            >
              <span className={styles.walletType}>
                {selectedWallet.type} <br /> {selectedWallet.network}
              </span>

              <AnimatePresence>
                {showDropdown && (
                  <motion.ul
                    className={styles.selectWaletDropDown}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    style={dropUp ? { top: "-200%" } : undefined}
                  >
                    {adminWalletAddress.map((address, index) => (
                      <li
                        key={address.type + index + address.network}
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
          </div>
          {amountInput && (
            <p className={styles.rateCalculator}>
              {" "}
              You will recieve {formatNumber(amountInput * selectedRate)} USD
              based on the current exchange rate.
            </p>
          )}
        </div>

        <AddressHolder
          title="Deposit Account"
          subtitle="Main Balance"
          value={`Current Balance ${formatNumber(walletBalance)} USD`}
          icon="accountBalance"
        />

        <button
          type="button"
          onClick={() => {
            if (!amountInput) {
              toast.error("Please input the amount you wish to deposit.");
              return;
            } else if (amountInput * selectedRate < 100) {
              toast.error("You can only deposit a minimum of 100 USD.");
              return;
            } else if (adminWalletAddress.length < 1) {
              toast.error("No deposit address found.");
              return;
            }

            setConfirmInvestmentModal(true);
          }}
        >
          Continue to Deposit
        </button>

        <AnimatePresence>
          {confirmInvestmentModal && (
            <Modal
              buttons={[
                {
                  text: "Cancel",
                  theme: "jacarta-500",
                  type: "button",
                  disabled: false,
                  click: () => setConfirmInvestmentModal(false),
                },
                {
                  text: isLoading ? "Confirming..." : "Confirm",
                  theme: "blue-400",
                  type: "button",
                  disabled: isLoading,
                  click: handleConfirmDepositClick,
                },
              ]}
              isModalOpen={confirmInvestmentModal}
              setIsModal={setConfirmInvestmentModal}
            >
              <div className={styles.modalContent}>
                <h1>Confirm Deposit</h1>

                <span className={styles.amount}>
                  {formatNumber(amountInput)} <span>{selectedWallet.type}</span>
                </span>

                <p>
                  Send the exact amount of {formatNumber(amountInput)}{" "}
                  <span>{selectedWallet.type}</span> to the{" "}
                  <span>{selectedWallet.type}</span> address below. Then come
                  back to this prompt and click confirm.
                </p>

                <AddressHolder
                  title="Deposit Address"
                  value={selectedWallet.address}
                  walletType={selectedWallet.type}
                  walletNetwork={selectedWallet.network}
                  icon="accountBalance"
                  label="address"
                />
              </div>
            </Modal>
          )}
        </AnimatePresence>
      </form>
    </>
  );
}
