"use client";
import { iconsConfig } from "@/lib/icons/iconsConfig";
import styles from "./investment-form.module.css";

import Modal from "../ui/modal";
import { use, useEffect, useState } from "react";
import { ConfirmInvestmentModalContext } from "@/store/confirm-investment-modal-context";
import { AnimatePresence, motion } from "framer-motion";
import Select from "../ui/select";

import { InvestmentPlansContext } from "@/store/investment-plans-context";
import { SelectPlanContext } from "@/store/select-plan-context";
import { formatNumber } from "@/util/util";
import { WalletBalanceContext } from "@/store/wallet-balance-context";
import { toast } from "sonner";
import { UserContext } from "@/store/user-context";
import { supabase } from "@/lib/db/supabaseClient";
import { useRouter } from "next/navigation";
import { makeInvestment } from "@/actions/invest-action";

const { plans: Plans, accountBalance: Wallet } = iconsConfig;

export default function InvestmentForm() {
  const router = useRouter();
  const { confirmInvestmentModal, setConfirmInvestmentModal } = use(
    ConfirmInvestmentModalContext
  );
  const { investmentPlans } = use(InvestmentPlansContext);

  const { selected, setSelected } = use(SelectPlanContext);
  const { walletBalance } = use(WalletBalanceContext);

  const { user } = use(UserContext);

  const [amountInput, setAmountInput] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    setAmountInput(e.target.value);
  }

  async function handleConfirmClick() {
    setIsLoading(true);
    try {
      
      
      const res = await makeInvestment(
        user.id,
        user.fullName,
        selected.id,
        selected.label,
        amountInput
      );

      if (res.error) {
        toast.error(res.error);
        return;
      }

      toast.success("Investment Successfull.");

      setConfirmInvestmentModal(false);

      router.replace("/investment");
    } catch (error) {
      console.error("Supabase Error", error);
      toast.error("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
       
    }
  }

  useEffect(() => {
    if (confirmInvestmentModal) setConfirmInvestmentModal(false);
  }, []);

  return (
    <>
      <form
    
        className={styles.investmentFormContainer}
      >
        <div className={styles.field}>
          <label htmlFor="investment-plans">Select Plan</label>
          <Select
            options={investmentPlans}
            placeHolder="Select Investment Plan"
            label="investment-form"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="investment-amount">Enter Your Amount</label>
          <div className={styles.amountInputWrapper}>
            <input
              type="number"
              name="investment-amount"
              id="investment-amount"
              placeholder={selected?.min_deposit || "1000"}
              min={selected?.min_deposit || "0"}
              max={selected?.max_deposit || "10000"}
              value={amountInput}
              onChange={handleChange}
            />

            <div className={styles.currencyWrapper}>
              <span>USD</span>
            </div>
          </div>
          {selected && (
            <p className={styles.minimum}>
              Minimum {formatNumber(selected.min_deposit)} USD
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label>Payment Account</label>
          <div className={styles.account}>
            <Wallet />

            <div>
              <span>Main Balance</span>
              <span>Current Balance {formatNumber(walletBalance)} USD</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            if (!selected) {
              toast.error("Please select an investment plan.");
              return;
            } else if (!amountInput) {
              toast.error("Please input the amount you wish to invest.");
              return;
            } else if (amountInput < selected.min_deposit) {
              toast.error(
                `Please input an amount greater than ${formatNumber(
                  selected.min_deposit
                )}.`
              );

              return;
            } else if (amountInput > walletBalance) {
              toast.error(
                "You don't have sufficient funds to cover this investment"
              );

              return;
            }
            setConfirmInvestmentModal(true);
          }}
        >
          Continue to Invest
        </button>

        <AnimatePresence>
          {confirmInvestmentModal && (
            <Modal
              buttons={[
                {
                  text: "Cancel",
                  theme: "jacarta-500",
                  type: "button",
                  click: () => setConfirmInvestmentModal(false),
                },
                {
                  text: isLoading ? "Investing..." : "Confirm",
                  theme: "blue-400",
                  type: "button",
                  disabled: isLoading,
                  click: handleConfirmClick,
                },
              ]}
              isModalOpen={confirmInvestmentModal}
              setIsModal={setConfirmInvestmentModal}
            >
              <div className={styles.modalContent}>
                <h1>Confirm Investment</h1>

                <span className={styles.amount}>
                  {formatNumber(amountInput)} <span>USD</span>
                </span>

                <p>Will be ducted from your payment accout</p>

                <div className={styles.field}>
                  <label>Payment Account</label>
                  <div className={styles.account}>
                    <Wallet />

                    <div>
                      <span>Main Balance</span>
                      <span>
                        Current Balance {formatNumber(walletBalance)} USD
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          )}
        </AnimatePresence>
      </form>
    </>
  );
}
