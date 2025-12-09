"use client";
import React, { use, useActionState, useEffect, useState } from "react";
import AddressHolder from "../ui/address-holder";
import TextButton from "../ui/text-button";
import { ConfirmInvestmentModalContext } from "@/store/confirm-investment-modal-context";
import WarningCard from "./warning-card";
import Section from "@/components/user/section";
import { AnimatePresence } from "framer-motion";
import { updateAdminWalletAddress } from "@/actions/update-admin-wallet-address";
import { UserContext } from "@/store/user-context";
import { AdminWalletAddressContext } from "@/store/admin-wallet-context";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import Modal from "../ui/modal";
import styles from "./profile-section-selector.module.css";

export default function WalletClientWrapper() {
  const { user } = use(UserContext);
  const { adminWalletAddress: walletAddress } = use(AdminWalletAddressContext);
  const { confirmInvestmentModal, setConfirmInvestmentModal } = use(
    ConfirmInvestmentModalContext
  );
  const [modalInput, setModalInput] = useState(walletAddress || "");

  const { pending } = useFormStatus();

  useEffect(() => {
    if (confirmInvestmentModal) setConfirmInvestmentModal(false);
  }, []);

  function handleModalInputChange(e) {
    setModalInput(e.target.value);
  }

  const [formState, formAction] = useActionState(
    async (prevState, formData) => {
      try {
        const res = await updateAdminWalletAddress(
          "wallet_address",
          modalInput,
          prevState,
          formData
        );

        if (res.error) {
          toast.error(res.error);
          return;
        }

        toast.success(`Wallet address updated successfully.`);
        setConfirmInvestmentModal(false);
      } catch (error) {
        console.error(error.message);
        toast.error("Something went wrong, please try agai later.");
      }
    },
    {}
  );

  const buttons = [
    {
      text: "Cancel",
      theme: "jacarta-500",
      type: "button",
      click: () => setConfirmInvestmentModal(false),
    },
    {
      text: pending ? "Submitting..." : "Confirm",
      theme: "blue-400",
      type: "submit",
      disabled: pending,
    },
  ];

  return (
    <>
      <Section
        label="Wallet-address-section"
        title="Deposit Wallet"
        description={[
          {
            type: "text",
            text: "This is the USDT address where investors will deposit funds to.",
          },
        ]}
      >
        {walletAddress ? (
          <>
            <AddressHolder
              title="Withdraw Address"
              value={walletAddress}
              walletType="USDT"
              icon="accountBalance"
            />
            <TextButton onClick={() => setConfirmInvestmentModal(true)}>
              Change
            </TextButton>
          </>
        ) : (
          <WarningCard
            icon="warning"
            text="Add a USDT address. This is the address where investors will deposit funds to."
            buttonText="Add Address"
            buttonActionType="modal"
            theme="yellow-400"
            onClick={() => setConfirmInvestmentModal(true)}
          />
        )}
      </Section>

      <AnimatePresence>
        {confirmInvestmentModal && (
          <Modal
            isModalOpen={confirmInvestmentModal}
            setIsModal={setConfirmInvestmentModal}
          >
            <form
              action={formAction}
              className={styles.profileSelectorModalContent}
            >
              <h1> {walletAddress ? "Change" : "Set"} Deposit Address</h1>

              <div className={styles.field}>
                <label htmlFor="address">Address</label>

                <input
                  type="text"
                  id="address"
                  name="address"
                  value={modalInput}
                  onChange={handleModalInputChange}
                  placeholder="Enter Address"
                />
              </div>

              {buttons && (
                <div className={styles.buttonGroup}>
                  {buttons.map((button, index) => {
                    return (
                      <button
                        type={button.type}
                        key={index}
                        style={
                          !button.disabled
                            ? { background: `var(--${button.theme})` }
                            : {
                                opacity: 0.5,
                                background: `var(--${button.theme})`,
                              }
                        }
                        onClick={button.click ? button.click : undefined}
                        disabled={button.disabled || false}
                      >
                        {button.text}
                      </button>
                    );
                  })}
                </div>
              )}
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
