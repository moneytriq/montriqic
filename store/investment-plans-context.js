"use client";

import { createContext, useState } from "react";

export const InvestmentPlansContext = createContext();

export default function InvestmentPlansContextProvider({ children, plans = [] }) {
  
  const [investmentPlans, setInvestmentPlans] = useState(plans);

  const value = {
    investmentPlans,
    setInvestmentPlans,
  };

  return (
    <InvestmentPlansContext value={value}>{children}</InvestmentPlansContext>
  );
}
