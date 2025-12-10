"use client";
import { PageNavContext } from "@/store/pagNav-context";
import ProfileGrid from "./profile-grid";
import styles from "./profile-section-selector.module.css";
import Section from "./section";
import { use, useActionState, useEffect, useState } from "react";
import AddressHolder from "../ui/address-holder";
import { AnimatePresence } from "framer-motion";
import { ConfirmInvestmentModalContext } from "@/store/confirm-investment-modal-context";
import Modal from "../ui/modal";
import TextButton from "../ui/text-button";
import { useSearchParams } from "next/navigation";
import { UserContext } from "@/store/user-context";
import WarningCardsGrid from "./warning-cards-grid";
import WarningCard from "./warning-card";
import { updateProfileInfo } from "@/actions/update-profile-info-action";
import { toast } from "sonner";
import { useFormStatus } from "react-dom";

export default function ProfileSectionSelector() {
  const { user } = use(UserContext);
  const { walletAddress } = user;
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const { pending } = useFormStatus();

  const { pageNav, setPageNav } = use(PageNavContext);
  const { confirmInvestmentModal, setConfirmInvestmentModal } = use(
    ConfirmInvestmentModalContext
  );
  const [modalInput, setModalInput] = useState(walletAddress || "");

  let content = {
    profile: (
      <Section
        label="profile-settings-section"
        title="Personnal Information"
        description={[
          {
            type: "text",
            text: "Basic Info like your name and address used on our platform",
          },
        ]}
      >
        <ProfileGrid />
      </Section>
    ),
    account: walletAddress ? (
      <Section
        label="Withrawal-address-section"
        title="Your Withrawal Address"
        description={[
          {
            type: "text",
            text: "This is the USDT address where you will recieve your payouts",
          },
        ]}
      >
        <AddressHolder
          title="Withdraw Address"
          value={walletAddress}
          walletType="USDT"
          icon="accountBalance"
        />

        <TextButton onClick={() => setConfirmInvestmentModal(true)}>
          Change
        </TextButton>
      </Section>
    ) : (
      <Section label="warning-cards">
        <WarningCard
          icon="warning"
          text="Add a USDT address. This is the address where all your withdrawals will be sent to."
          buttonText="Add Address"
          buttonActionType="modal"
          theme="yellow-400"
          onClick={() => setConfirmInvestmentModal(true)}
        />
      </Section>
    ),
  };

  useEffect(() => {
    if (confirmInvestmentModal) setConfirmInvestmentModal(false);
  }, []);

  useEffect(() => {
    if (mode && mode === "account") setPageNav("account");
  }, []);

  const [formState, formAction] = useActionState(
    async (prevState, formData) => {
     ;
      try {
        const res = await updateProfileInfo(
          user.id,
          "wallet_address",
          modalInput,
          prevState,
          formData
        );

        if (res.error) {
          toast.error(res.error);
          return;
        }

        toast.success(`Wallet address successfully changed.`);
        setConfirmInvestmentModal(false);
      } catch (error) {
        console.error(error.message);
        toast.error("Something went wrong, please try agai later.");
      } 
    },
    {}
  );

  function handleModalInputChange(e) {
    setModalInput(e.target.value);
  }

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
      <AnimatePresence>
        {confirmInvestmentModal && pageNav === "account" && (
          <Modal
            isModalOpen={confirmInvestmentModal}
            setIsModal={setConfirmInvestmentModal}
          >
            <form
              action={formAction}
              className={styles.profileSelectorModalContent}
            >
              <h1> {walletAddress ? "Change" : "Set"} Withdraw Address</h1>

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

      {content[pageNav]}
    </>
  );
}
