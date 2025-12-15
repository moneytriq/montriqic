"use client";

import { createContext, useState } from "react";

export const SelectWalletContext = createContext();

export default function SelectWalletContextProvider({ children}) {
  const [selectedWallet, setSelectedWallet] = useState({});

  const value = {
    selectedWallet,
    setSelectedWallet,
  };

  return <SelectWalletContext value={value}>{children}</SelectWalletContext>;
}
