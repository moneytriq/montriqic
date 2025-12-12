"use client";

import { createContext, useState } from "react";

export const ExchangeRateContext = createContext();

export default function ExchangeRateContextProvider({
  children,
  rate = {},
}) {
  const [exchangeRate, setExchangeRate] = useState(rate);

  const value = {
    exchangeRate,
    setExchangeRate,
  };

  return <ExchangeRateContext value={value}>{children}</ExchangeRateContext>;
}
