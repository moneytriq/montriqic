"use client";

import { useState, Fragment, useRef, useEffect, use } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
} from "@headlessui/react";
import styles from "./select.module.css";
import { iconsConfig } from "@/lib/icons/iconsConfig";
import { useSearchParams } from "next/navigation";
import { SelectPlanContext } from "@/store/select-plan-context";
import { KycDocumentTypeContext } from "@/store/kyc-document-type-context";

const { plans: PlansIcon, angleDown: AngleDownIcon } = iconsConfig;

export default function Select({
  options,
  placeHolder,
  label = null,

}) {
  const searchParams = useSearchParams();
  const planId = searchParams.get("selected") || null;
  // const [selected, setSelected] = useState(null);
  const { selected, setSelected } = use(SelectPlanContext);
  const [dropUp, setDropUp] = useState(false);
  const { kycDocumentType, setKycDocumentType } = use(KycDocumentTypeContext);

  useEffect(() => {
    async function fetchPlan() {
      if (!planId) {
        setSelected(null);
        return;
      }

      const selectedPlan = options.find((plan) => plan.id === +planId);

      if (selectedPlan) {
        setSelected(selectedPlan);
      }
    }

    fetchPlan();
  }, [planId]);

  useEffect(() => {
    if (label === "kyc") {
      setKycDocumentType((prev) => ({
        ...prev,
        country: selected?.label || "",
      }));
    }
  }, [selected, label]);

  const buttonRef = useRef(null);

  function handleOpen() {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    setDropUp(spaceBelow < 200 && spaceAbove > spaceBelow);
  }

  return (
    <div className={`${styles.selectWrapper} ${dropUp ? styles.dropUp : ""}`}>
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            {label !== "investment-form" ? (
              <ListboxButton
                ref={buttonRef}
                onClick={handleOpen}
                className={styles.button}
              >
                {selected?.label || placeHolder}
                <AngleDownIcon className={styles.dropdownIcon} />
              </ListboxButton>
            ) : (
              <ListboxButton
                ref={buttonRef}
                onClick={handleOpen}
                className={styles.button}
              >
                <div className={styles.investmentFormLabel}>
                  <PlansIcon />
                  <span>
                    {selected?.label || placeHolder}
                    {selected && (
                      <p>
                        Invest for {selected.term_duration} {selected.term} and
                        get {selected.interest_rate}% profit
                      </p>
                    )}
                  </span>
                </div>
                <AngleDownIcon className={styles.dropdownIcon} />
              </ListboxButton>
            )}

            <Transition
              as={Fragment}
              show={open}
              enter={styles.enter}
              enterFrom={styles.enterFrom}
              enterTo={styles.enterTo}
              leave={styles.leave}
              leaveFrom={styles.leaveFrom}
              leaveTo={styles.leaveTo}
            >
              {label !== "investment-form" ? (
                <ListboxOptions className={styles.options} static>
                  {options.map((item) => (
                    <ListboxOption
                      key={item.id}
                      value={item}
                      className={({ active, selected }) =>
                        `${styles.option} ${active ? styles.active : ""} ${
                          selected ? styles.selected : ""
                        }`
                      }
                    >
                      {item.label}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              ) : (
                <ListboxOptions className={styles.options} static>
                  {options.map((item) => (
                    <ListboxOption
                      key={item.id}
                      value={item}
                      className={({ active, selected }) =>
                        `${styles.option} ${active ? styles.active : ""} ${
                          selected ? styles.selected : ""
                        }`
                      }
                    >
                      <div className={styles.investmentFormLabel}>
                        <PlansIcon />
                        <span>
                          {item.label}
                          <p>
                            Invest for {item.term_duration} {item.term} and get{" "}
                            {item.interest_rate}% profit
                          </p>
                        </span>
                      </div>
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              )}
            </Transition>
          </>
        )}
      </Listbox>
    </div>
  );
}
