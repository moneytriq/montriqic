"use client";
import styles from "./investment-form.module.css";
import Modal from "../ui/modal";
import { use, useEffect, useState } from "react";
import { ConfirmInvestmentModalContext } from "@/store/confirm-investment-modal-context";
import { AnimatePresence, motion } from "framer-motion";
import AddressHolder from "../ui/address-holder";
import { WalletBalanceContext } from "@/store/wallet-balance-context";
import { formatNumber } from "@/util/util";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { UserContext } from "@/store/user-context";
import { makeWithdrawal } from "@/actions/withdraw-action";


export default function DepositForm({ label = null }) {
 
  const router = useRouter();
  const { user } = use(UserContext);
  const { confirmInvestmentModal, setConfirmInvestmentModal } = use(
    ConfirmInvestmentModalContext
  );
  const { walletBalance } = use(WalletBalanceContext);

  const [amountInput, setAmountInput] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (confirmInvestmentModal) setConfirmInvestmentModal(false);
  }, []);

  function handleChange(e) {
    setAmountInput(e.target.value);
  }

  async function handleConfirmWithdrawClick() {
    setIsLoading(true);
    try {
      const res = await makeWithdrawal(user.id, user.fullName, amountInput);

      if (res.error) {
        toast.error(res.error);
        return;
      }
      toast.success(
        "Withdrawal request sent successfully. Awaiting confirmation"
      );

      setConfirmInvestmentModal(false);

      router.replace("/dashboard#recent-activity");
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
          <label htmlFor="investment-amount">
            Enter Withdraw Amount
          </label>
          <div className={styles.amountInputWrapper}>
            <input
              type="number"
              name="investment-amount"
              id="investment-amount"
              placeholder="1000"
              value={amountInput}
              onChange={handleChange}
            />

            <div className={styles.currencyWrapper}>
              <span>USD</span>
            </div>
          </div>
        </div>

        <AddressHolder
          title="Withdraw Account"
          subtitle="Main Balance"
          value={`Current Balance ${formatNumber(walletBalance)} USD`}
          icon="accountBalance"
        />

        <button
          type="button"
          onClick={() => {
            if (!amountInput) {
              toast.error("Please input the amount you wish to Withdraw.");
              return;
            } else if (amountInput < 10) {
              toast.error("You can only withdraw a minimum of 10 USD.");
              return;
            } else if (amountInput > walletBalance) {
              toast.error(
                "You do not have sufficient funds in your wallet to make this withdrawal."
              );
              return;
            } else if (user.kycStatus !== "verified") {
              toast.error(
                "You can only withdraw funds after you complete your KYC."
              );
              return;
            } else if (!user.walletAddress) {
              toast.error("You have not added a USDT withdraw address yet.");
              return;
            }
            setConfirmInvestmentModal(true);
          }}
        >
          Continue to Withdraw
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
                  click: handleConfirmWithdrawClick,
                },
              ]}
              isModalOpen={confirmInvestmentModal}
              setIsModal={setConfirmInvestmentModal}
            >
              <div className={styles.modalContent}>
                <h1>Confirm Withdrawal</h1>

                <span className={styles.amount}>
                  {formatNumber(amountInput)} <span>USD</span>
                </span>

                <p>
                  The exact amount of {formatNumber(amountInput)} USD will be
                  sent to the USDT TRC20 address below.
                </p>

                <AddressHolder
                  title={"Withdrawal Address"}
                  value={user.walletAddress}
                  walletType="USDT"
                  walletNetwork="TRC 20"
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
