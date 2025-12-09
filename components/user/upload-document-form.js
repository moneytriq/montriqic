"use client";
import { iconsConfig } from "@/lib/icons/iconsConfig";
import styles from "./upload-document-form.module.css";
import TextButton from "../ui/text-button";
import { ProgressContext } from "@/store/progress-context";
import { use, useEffect, useState, useTransition, useActionState } from "react";
import { KycDocumentTypeContext } from "@/store/kyc-document-type-context";
import { toast } from "sonner";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import Modal from "../ui/modal";
import { useRouter } from "next/navigation";
import nProgress from "nprogress";
import { uploadKycDetails } from "@/actions/upload-kyc-details";
import { UserContext } from "@/store/user-context";
import FormSubmitButton from "../ui/form-submit-button";
import { SelectPlanContext } from "@/store/select-plan-context";

const { checkCircle: CheckIcon, info: InfoIcon } = iconsConfig;

export default function UploadDocumentForm() {
  const { user } = use(UserContext);
  const { progress, setProgress } = use(ProgressContext);
  const { kycDocumentType, setKycDocumentType } = use(KycDocumentTypeContext);
  const { selected, setSelected } = use(SelectPlanContext);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [images, setImages] = useState({
    mainDoc: "",
    selfieDoc: "",
  });

  useEffect(() => {
    if (!kycDocumentType.type || !kycDocumentType.country) {
      setProgress(0);
      return;
    }
  }, [kycDocumentType.type]);

  function handleImageChange(e, imageType) {
    const file = e.target.files[0];
    if (!file) return;
    const totalImageSize = file.size;

    const totalImageSizeInMb = totalImageSize / (1024 * 1024);

    if (totalImageSizeInMb > 5) {
      toast.error(`You can only upload images of total file size below 5MB.`);
      return;
    }

    setImages((prev) => ({
      ...prev,
      [imageType]: file,
    }));

    console.log(images.mainDoc.size);
  }

  function handleModalBackDropClick(booleanValue) {
    nProgress.start();
    startTransition(() => router.replace("/profile"));

    setIsSuccessModal(booleanValue);
  }

  const [formState, formAction] = useActionState(
    async (prevState, formData) => {
      try {
        const res = await uploadKycDetails(
          user.id,
          kycDocumentType.type,
          kycDocumentType.country,
          images,
          prevState,
          formData
        );

        if (res.error) {
          toast.error(res.error);
          return;
        }

        toast.success("Kyc submitted successfully");

        setIsSuccessModal(true);
      } catch (error) {
        console.error("Supabase error", error.message);
        toast.error("Failed to Upload documents, please try again later");
      }
    },
    {}
  );

  return (
    <div className={styles.uploadDocumentFormContainer}>
      <form action={formAction} className={styles.uploadDocumentForm}>
        <p className={styles.infoTitle}>
          To avoid delays when verifying account, please make sure of the below:
        </p>
        <p>
          <CheckIcon />
          Document should be in good condition and clearly visible.
        </p>
        <p>
          <CheckIcon /> Make sure that there is no light glare on the image.
        </p>

        <div className={styles.field}>
          <span>Upload {kycDocumentType?.type}</span>
          <label className={styles.imageUploadBox}>
            {images.mainDoc && (
              <Image
                src={URL.createObjectURL(images.mainDoc)}
                alt={`${kycDocumentType?.type}-image`}
                fill
                sizes="50vw"
              />
            )}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                handleImageChange(e, "mainDoc");
              }}
            />
            <div className={styles.selectImageBtn}>
              {!images.mainDoc ? "Click to Select" : "Click to Change"}
            </div>
          </label>
        </div>

        <div className={styles.field}>
          <span>Upload Selfie with {kycDocumentType?.type}</span>
          <label className={styles.imageUploadBox}>
            {images.selfieDoc && (
              <Image
                src={URL.createObjectURL(images.selfieDoc)}
                alt={`selfie-with-${kycDocumentType?.type}-image`}
                fill
                sizes="50vw"
              />
            )}
            <input
              type="file"
              // multiple
              accept="image/*"
              hidden
              onChange={(e) => {
                handleImageChange(e, "selfieDoc");
              }}
            />
            <div className={styles.selectImageBtn}>
              {!images.selfieDoc ? "Click to Select" : "Change"}
            </div>

            <div></div>
          </label>
        </div>

        <div className={styles.field}>
          <p className={styles.info}>
            <InfoIcon />
            To avoid delays in verification, make sure you provide valid
            information.
          </p>

          <FormSubmitButton type="submit" className={styles.proceedBtn}>
            Submit & Continue
          </FormSubmitButton>

          <TextButton
            style={{ alignSelf: "center", fontWeight: 400 }}
            onClick={() =>
              setProgress((prev) => {
                if (prev === 0) return 0;
                return prev - 1;
              })
            }
          >
            Back to Previous
          </TextButton>
        </div>
      </form>

      <AnimatePresence>
        {isSuccessModal && (
          <Modal
            buttons={[
              {
                text: "Continue",
                theme: "blue-400",
                type: "button",
                click: () => {
                  nProgress.start();
                  startTransition(() => router.replace("/profile"));

                  setIsSuccessModal(false);
                },
              },
            ]}
            isModalOpen={isSuccessModal}
            setIsModal={handleModalBackDropClick}
          >
            <div className={styles.modalContent}>
              <CheckIcon />
              <p>
                Document submition was successful. The provided documents are
                currently under review. You will recieve a response within
                24hrs.
              </p>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
