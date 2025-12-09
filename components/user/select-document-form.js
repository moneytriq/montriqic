"use client";
import { iconsConfig } from "@/lib/icons/iconsConfig";
import styles from "./select-document-form.module.css";
import { use } from "react";
import { KycDocumentTypeContext } from "@/store/kyc-document-type-context";
import Select from "../ui/select";
import { countryData } from "@/lib/data/selectOptionsData";
import { ProgressContext } from "@/store/progress-context";
import TextButton from "../ui/text-button";
import { useRouter } from "next/navigation";

const documentOptions = [
  { type: "passport", icon: "passport" },
  { type: "national ID", icon: "idCard" },
  { type: "driving license", icon: "driversLicense" },
];

const CheckedIcon = iconsConfig["checkCircle"];
const InfoIcon = iconsConfig["info"];

export default function SelectDocumentForm() {
  const { kycDocumentType, setKycDocumentType } = use(KycDocumentTypeContext);
  const { progress, setProgress } = use(ProgressContext);
    

  const router = useRouter();

  return (
    <div className={styles.selectDocumentForm}>
      <div className={styles.field}>
        <span>Select Document Type</span>
        {documentOptions.map((doc) => {
          const Icon = iconsConfig[doc.icon];
          return (
            <label htmlFor={doc.type} key={doc.type + kycDocumentType.type}>
              <span>
                <Icon />
                <p>{doc.type}</p>
              </span>

              {kycDocumentType.type === doc.type && <CheckedIcon />}

              <input
                type="radio"
                name="document-type"
                id={doc.type}
                value={doc.type}
                onChange={() =>
                  setKycDocumentType((prev) => ({
                    ...prev,
                    type: doc.type,
                  }))
                }
                checked={kycDocumentType.type === doc.type}
                hidden
              />
            </label>
          );
        })}
      </div>
      <div className={styles.field}>
        <span>Select Country</span>
        <Select options={countryData} placeHolder="Select Country" label="kyc" />
        <p className={styles.info}>
          <InfoIcon />
          To avoid delays in verification, make sure you provide valid
          information.
        </p>

        <button
          type="button"
          className={styles.proceedBtn}
          onClick={() =>
            setProgress((prev) => {
              if (prev === 1) return 1;
              return prev + 1;
            })
          }
        >
          Click to Upload Document
        </button>

        <TextButton
          style={{ alignSelf: "center", fontWeight: 400 }}
          onClick={() => router.replace("/kyc")}
        >
          Back to Previous
        </TextButton>
      </div>
    </div>
  );
}
