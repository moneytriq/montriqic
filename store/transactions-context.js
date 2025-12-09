"use client";
import { createContext, useState } from "react";

export const TransactionsContext = createContext();

export default function TransactionsContextProvider({
  defaultValue,
  children,
}) {
  const [transactions, setTransactions] = useState(defaultValue);

  const value = {
    transactions,
    setTransactions,
  };

  return <TransactionsContext value={value}>{children}</TransactionsContext>;
}
