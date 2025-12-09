"use client";

import { createContext, useState } from "react";

export const KycDocumentTypeContext = createContext();

export default function KycDocumentTypeContextProvider({ children }) {
  const [kycDocumentType, setKycDocumentType] = useState({
    type: "",
    country: "",
  });

  const value = {
    kycDocumentType,
    setKycDocumentType,
  };

  return (
    <KycDocumentTypeContext value={value}>{children}</KycDocumentTypeContext>
  );
}
