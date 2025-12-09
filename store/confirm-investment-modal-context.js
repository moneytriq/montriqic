"use client";

import { createContext, useState } from "react";

export const ConfirmInvestmentModalContext = createContext();

export default function ConfirmInvestmentModalContextProvider({ children }) {
  const [confirmInvestmentModal, setConfirmInvestmentModal] = useState(false);

  const value = {
    confirmInvestmentModal,
    setConfirmInvestmentModal,
  };

  return (
    <ConfirmInvestmentModalContext value={value}>
      {children}
    </ConfirmInvestmentModalContext>
  );
}
