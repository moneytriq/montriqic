"use client";
import React, { use, useActionState, useEffect, useState } from "react";
import TextButton from "../ui/text-button";
import { ConfirmInvestmentModalContext } from "@/store/confirm-investment-modal-context";
import WarningCard from "./warning-card";
import Section from "@/components/user/section";
import { AnimatePresence } from "framer-motion";
import {
  removeWallet,
  updateAdminWalletAddress,
} from "@/actions/update-admin-wallet-address";
import { UserContext } from "@/store/user-context";
import { AdminWalletAddressContext } from "@/store/admin-wallet-context";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import Modal from "../ui/modal";
import styles from "./profile-section-selector.module.css";
import WalletAddressHolder from "../ui/wallet-address-holder";
import { SelectWalletContext } from "@/store/select-wallet-context";

export default function WalletClientWrapper() {
  const { user } = use(UserContext);
  const { selectedWallet } = use(SelectWalletContext);
  const { adminWalletAddress: walletAddress } = use(AdminWalletAddressContext);
  const { confirmInvestmentModal, setConfirmInvestmentModal } = use(
    ConfirmInvestmentModalContext
  );
  const [actionMode, setActionMode] = useState("update");
  const [modalInput, setModalInput] = useState({
    id: selectedWallet.id || "",
    type: selectedWallet.type || "",
    address: selectedWallet.address || "",
    network: selectedWallet.network || "",
  });

  const { pending } = useFormStatus();

  useEffect(() => {
    if (confirmInvestmentModal) setConfirmInvestmentModal(false);
  }, []);

  function handleModalInputChange(e, field) {
    setModalInput((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  }
  async function handleRemoveClick() {
    try {
      const res = await removeWallet(selectedWallet.id);

      if (res.error) {
        toast.error(res.error);
      }

      toast.success("Wallet removed successfully");
    } catch (error) {
      console.error("errr", error.message);
      toast.error("Could not remove wallet. Please try again later");
    }
  }

  const [formState, formAction] = useActionState(
    async (prevState, formData) => {
      try {
        const res = await updateAdminWalletAddress(
          actionMode,
          modalInput,
          prevState,
          formData
        );

        if (res.error) {
          toast.error(res.error);
          return res;
        }

        toast.success(`Wallet updated successfully.`);
        setConfirmInvestmentModal(false);
        return res;
      } catch (error) {
        if (actionMode === "add") {
          toast.error("Something went wrong, or wallet type not supported.");
          return;
        }
        toast.error("Something went wrong, please try again later.");
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
            text: "These are addresses where investors will deposit funds to. You can add a maximum of 6 wallets.",
          },
        ]}
      >
        {walletAddress.length > 0 ? (
          <>
            <WalletAddressHolder
              title="Withdraw Address"
              value={walletAddress}
              icon="accountBalance"
            />
            <div style={{ display: "flex", gap: "2rem" }}>
              <TextButton
                onClick={() => {
                  setActionMode("update");
                  setConfirmInvestmentModal(true);
                  setModalInput({
                    id: selectedWallet.id,
                    type: selectedWallet.type || "",
                    address: selectedWallet.address || "",
                    network: selectedWallet.network || "",
                  });
                }}
              >
                Change
              </TextButton>
              <TextButton
                style={{ color: "var(--red-400)" }}
                onClick={handleRemoveClick}
              >
                Remove Wallet
              </TextButton>
            </div>
            {walletAddress.length < 6 && (
              <TextButton
                style={{ marginLeft: "2rem" , marginTop: "2rem"}}
                onClick={() => {
                  setConfirmInvestmentModal(true);
                  setActionMode("add");
                  setModalInput({
                    id: "",
                    type: "",
                    address: "",
                    network: "",
                  });
                }}
              >
                Add New Wallet
              </TextButton>
            )}
          </>
        ) : (
          <WarningCard
            icon="warning"
            text="Add a wallet address where investors will deposit funds to."
            buttonText="Add Address"
            buttonActionType="modal"
            theme="yellow-400"
            onClick={() => {
              setActionMode("add");
              setConfirmInvestmentModal(true);
            }}
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
              {walletAddress.length > 0 && actionMode === "update" ? (
                <h1>
                  Change Deposit Address for <span>{selectedWallet.type}</span>{" "}
                  <span>{selectedWallet.network}</span>
                </h1>
              ) : (
                <>
                  <h1>Add New Deposit Address</h1>
                  <p>
                    These are the only supported wallet types: 'btc', 'usdt',
                    'xrp', 'eth', 'trx', 'sol'.
                  </p>
                </>
              )}

              <div className={styles.field}>
                <label htmlFor="address">Address</label>

                <input
                  type="text"
                  id="address"
                  name="address"
                  value={modalInput.address}
                  onChange={(e) => handleModalInputChange(e, "address")}
                  placeholder="Enter Address"
                />
              </div>
              {walletAddress.length < 1 || actionMode !== "update" ? (
                <>
                  <div className={styles.field}>
                    <label htmlFor="type">Type</label>

                    <input
                      type="text"
                      id="type"
                      name="type"
                      value={modalInput.type}
                      onChange={(e) => handleModalInputChange(e, "type")}
                      placeholder="e.g BTC, USDT, ..."
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="network">Network</label>

                    <input
                      type="text"
                      id="network"
                      name="network"
                      value={modalInput.network}
                      onChange={(e) => handleModalInputChange(e, "network")}
                      placeholder="e.g TRC20"
                    />
                  </div>
                </>
              ) : null}

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
