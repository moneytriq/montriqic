"use client";
import ProgressDots from "@/components/ui/progress-dots";
import Section from "@/components/user/section";
import SelectDocumentForm from "@/components/user/select-document-form";
import UploadDocumentForm from "@/components/user/upload-document-form";
import { ProgressContext } from "@/store/progress-context";
import { UserContext } from "@/store/user-context";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function KycVerifyPage() {
  const { progress } = use(ProgressContext);
  const { user } = use(UserContext);
  const router = useRouter();
  const [content, setContent] = useState([
    <p className="suspense-fallback">Preparing KYC...</p>,
  ]);

  useEffect(() => {
    if (user.kycStatus !== "not verified") {
      router.replace("/dashboard");
      return;
    }
    setContent([<SelectDocumentForm />, <UploadDocumentForm />]);
  }, []);

  return (
    <>
      <Section label="kyc-verify-section">
        <ProgressDots />
      </Section>

      <Section
        label="identity-document-section"
        title="Identity Document"
        description={[
          {
            type: "text",
            text: "Verify your identity using any of the following documents",
          },
        ]}
      >
        {content[progress]}
      </Section>
    </>
  );
}
