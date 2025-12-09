"use client";

import { createContext, useState } from "react";

export const WalletBalanceContext = createContext();

export default function WalletBalanceContextProvider({ children , balance = ""}) {
  const [walletBalance, setWalletBalance] = useState(balance);

  const value = {
    walletBalance,
    setWalletBalance,
  };

  return <WalletBalanceContext value={value}>{children}</WalletBalanceContext>;
}
