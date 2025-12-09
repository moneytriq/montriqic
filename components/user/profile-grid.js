"use client";
import { iconsConfig } from "@/lib/icons/iconsConfig";
import styles from "./profile-grid.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { ConfirmInvestmentModalContext } from "@/store/confirm-investment-modal-context";
import { use, useActionState, useEffect, useState } from "react";
import Modal from "../ui/modal";
import Select from "../ui/select";
import { countryData, genderData } from "@/lib/data/selectOptionsData";
import { UserContext } from "@/store/user-context";
import { formatDate } from "@/util/util";
import { updateProfileInfo } from "@/actions/update-profile-info-action";
import { toast } from "sonner";
import { SelectPlanContext } from "@/store/select-plan-context";
import ProfileSelect from "../ui/profileSelect";
import { SelectProfileUpdateContext } from "@/store/select-profile-update-context";

export default function ProfileGrid() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = use(UserContext);
  const info = [
    {
      fieldName: "full_name",
      title: "Full Name",
      value: user.fullName || "Not Set",
      icon: "arrowForward",
      fieldType: "text",
    },
    {
      fieldName: "display_name",
      title: "Display Name",
      value: user.displayName || "Not Set",
      icon: "arrowForward",
      fieldType: "text",
    },
    {
      fieldName: "email",
      title: "Email",
      value: user.email || "Not Set",
      icon: "locked",
      fieldType: "email",
    },
    {
      fieldName: "phone",
      title: "Phone Number",
      value: user.phone || "Not Set",
      icon: "arrowForward",
      fieldType: "tel",
    },
    {
      fieldName: "telegram",
      title: "Telegram",
      value: user.telegram || "Not Set",
      icon: "arrowForward",
      fieldType: "text",
    },
    {
      fieldName: "gender",
      title: "Gender",
      value: user.gender || "Not Set",
      icon: "arrowForward",
      fieldType: "select",
    },
    {
      fieldName: "date_of_birth",
      title: "Date of Birth",
      value: user.dateOfBirth || "Not Set",
      icon: "arrowForward",
      fieldType: "date",
    },

    {
      fieldName: "country",
      title: "Country",
      value: user.country || "Not Set",
      icon: "arrowForward",
      fieldType: "select",
    },
    {
      fieldName: "address",
      title: "Address",
      value: user.address || "Not Set",
      icon: "arrowForward",
      fieldType: "text",
    },
  ];
  const { confirmInvestmentModal, setConfirmInvestmentModal } = use(
    ConfirmInvestmentModalContext
  );

  const { selectProfileUpdate, setSelectProfileUpdate } = use(
    SelectProfileUpdateContext
  );


  useEffect(() => {
    if (confirmInvestmentModal) setConfirmInvestmentModal(false);
  }, []);

  const [formState, formAction] = useActionState(
    async (prevState, formData) => {
    
      setIsLoading(true);
      try {
        const res = await updateProfileInfo(
          user.id,
          selectProfileUpdate.fieldName,
          selectProfileUpdate.value,
          prevState,
          formData
        );

        if (res.error) {
          toast.error(res.error);
          return;
        }

        toast.success(`${selectProfileUpdate.title} successfully changed.`);
        setConfirmInvestmentModal(false);
    
      } catch (error) {
        console.error(error.message);
        toast.error("Something went wrong, please try agai later.");
      } finally {
        setIsLoading(false);
      }
    },
    {}
  );

  function handleChange(e) {
    setSelectProfileUpdate((prev) => ({
      ...prev,
      value: e.target.value,
    }));
  }

  const buttons = [
    {
      text: "Cancel",
      theme: "jacarta-500",
      type: "button",
      click: () => setConfirmInvestmentModal(false),
    },
    {
      text: isLoading ? "Submitting..." : "Confirm",
      theme: "blue-400",
      type: "submit",
      disabled: isLoading,
    },
  ];
  return (
    <div className={styles.profileGridContainer}>
      <AnimatePresence>
        {confirmInvestmentModal && (
          <Modal
            isModalOpen={confirmInvestmentModal}
            setIsModal={setConfirmInvestmentModal}
          >
            <form action={formAction} className={styles.modalContent}>
              <h1>Update {selectProfileUpdate.title}</h1>

              <div className={styles.field}>
                <label htmlFor={selectProfileUpdate.fieldName}>
                  {selectProfileUpdate.title}
                </label>
                {selectProfileUpdate.fieldType !== "select" ? (
                  <input
                    type={selectProfileUpdate.fieldType}
                    id={selectProfileUpdate.fieldName}
                    name={selectProfileUpdate.fieldName}
                    placeholder={`Enter new ${selectProfileUpdate.title}`}
                    value={
                      selectProfileUpdate.value === "Not Set"
                        ? ""
                        : selectProfileUpdate.value
                    }
                    onChange={handleChange}
                  />
                ) : selectProfileUpdate.fieldName === "gender" ? (
                  <ProfileSelect
                    options={genderData}
                    placeHolder="Select Gender"
                  />
                ) : (
                  <ProfileSelect
                    options={countryData}
                    placeHolder="Select Country"
                  />
                )}
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

      <ul className={styles.profileGrid}>
        {info.map((item, index) => {
          const Icon = iconsConfig[item.icon];
          return (
            <li
              className={styles.profileCard}
              key={index}
              onClick={() => {
                if (item.fieldName === "email") {
                  return;
                }
                setSelectProfileUpdate({
                  fieldName: item.fieldName,
                  title: item.title,
                  value: item.value,
                  fieldType: item.fieldType,
                });
                setConfirmInvestmentModal(true);
              }}
            >
              <span>
                <p>{item.title}</p>
                {item.fieldName === "date_of_birth" ? (
                  <p>{formatDate(item.value)}</p>
                ) : (
                  <p>{item.value}</p>
                )}
              </span>

              <Icon />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
