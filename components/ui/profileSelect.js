"use client";

import { useState, Fragment, useRef, use } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
} from "@headlessui/react";
import styles from "./select.module.css";
import { iconsConfig } from "@/lib/icons/iconsConfig";
import { SelectProfileUpdateContext } from "@/store/select-profile-update-context";

const { plans: PlansIcon, angleDown: AngleDownIcon } = iconsConfig;

export default function ProfileSelect({ options, placeHolder, label = null }) {

  const { selectProfileUpdate, setSelectProfileUpdate } = use(
    SelectProfileUpdateContext
  );

  const [dropUp, setDropUp] = useState(false);


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
      <Listbox value={selectProfileUpdate} onChange={setSelectProfileUpdate}>
        {({ open }) => (
          <>
            <ListboxButton
              ref={buttonRef}
              onClick={handleOpen}
              className={styles.button}
            >
              {selectProfileUpdate?.value || placeHolder}
              <AngleDownIcon className={styles.dropdownIcon} />
            </ListboxButton>

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
              <ListboxOptions className={styles.options} static>
                {options.map((item) => (
                  <ListboxOption
                    key={item.id}
                    value={{
                      fieldName: item.fieldName,
                      title:
                        item.fieldName.charAt(0).toUpperCase() +
                        item.fieldName.slice(1),
                      value: item.label,
                      fieldType: "select",
                    }}
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
            </Transition>
          </>
        )}
      </Listbox>
    </div>
  );
}
