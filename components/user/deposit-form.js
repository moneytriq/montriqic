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
import { makeDeposit } from "@/actions/deposit-action";
import { useRouter } from "next/navigation";
import { UserContext } from "@/store/user-context";
import { makeWithdrawal } from "@/actions/withdraw-action";
import { AdminWalletAddressContext } from "@/store/admin-wallet-context";

export default function DepositForm({ label = null }) {
  const isWithdrawForm = label === "withdraw";
  const router = useRouter();
  const { user } = use(UserContext);
  const { confirmInvestmentModal, setConfirmInvestmentModal } = use(
    ConfirmInvestmentModalContext
  );
  const { walletBalance } = use(WalletBalanceContext);

  const { adminWalletAddress } = use(AdminWalletAddressContext);

  const [amountInput, setAmountInput] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (confirmInvestmentModal) setConfirmInvestmentModal(false);
  }, []);

  function handleChange(e) {
    setAmountInput(e.target.value);
  }

  async function handleConfirmDepositClick() {
    setIsLoading(true);
    try {
      const res = await makeDeposit(user.id, user.fullName, amountInput);

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
  async function handleConfirmWithdrawClick() {
    setIsLoading(true);
    try {
      const res = await makeWithdrawal(user.id, user.fullName, amountInput);

      if (res.error) {
        toast.error(res.error);
        return;
      }
      toast.success(
        "Withdrawal request sent succeffully. Awaiting confirmation"
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

  const clickAction = isWithdrawForm
    ? handleConfirmWithdrawClick
    : handleConfirmDepositClick;

  return (
    <>
      <form action="#" className={styles.investmentFormContainer}>
        <div className={styles.field}>
          <label htmlFor="investment-amount">
            Enter {isWithdrawForm ? "Withdraw" : "Deposit"} Amount
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
          title={isWithdrawForm ? "Withdraw Account" : "Deposit Account"}
          subtitle="Main Balance"
          value={`Current Balance ${formatNumber(walletBalance)} USD`}
          icon="accountBalance"
        />

        {isWithdrawForm ? (
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
        ) : (
          <button
            type="button"
            onClick={() => {
              if (!amountInput) {
                toast.error("Please input the amount you wish to deposit.");
                return;
              } else if (amountInput < 100) {
                toast.error("You can only deposit a minimum of 100 USD.");
                return;
              } else if (!adminWalletAddress) {
                toast.error("No deposit address found.");
                return;
              }

              setConfirmInvestmentModal(true);
            }}
          >
            Continue to Deposit
          </button>
        )}

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
                  click: clickAction,
                },
              ]}
              isModalOpen={confirmInvestmentModal}
              setIsModal={setConfirmInvestmentModal}
            >
              <div className={styles.modalContent}>
                <h1>Confirm {isWithdrawForm ? "Withdrawal" : "Deposit"}</h1>

                <span className={styles.amount}>
                  {formatNumber(amountInput)} <span>USD</span>
                </span>

                {isWithdrawForm ? (
                  <p>
                    The exact amount of {formatNumber(amountInput)} USD will be
                    sent to the USDT address below.
                  </p>
                ) : (
                  <p>
                    Transfer the exact amount of {formatNumber(amountInput)} USD
                    to the USDT address below. Then come back to this prompt and
                    click confirm.
                  </p>
                )}

                <AddressHolder
                  title={
                    isWithdrawForm ? "Withdrawal Address" : "Deposit Address"
                  }
                  value={
                    isWithdrawForm ? user.walletAddress : adminWalletAddress
                  }
                  walletType="USDT"
                  icon="accountBalance"
                />
              </div>
            </Modal>
          )}
        </AnimatePresence>
      </form>
    </>
  );
}
