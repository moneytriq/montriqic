"use client";

import { createContext, useState } from "react";

export const SelectPlanContext = createContext();

export default function SelectPlanContextProvider({ children }) {
  const [selected, setSelected] = useState(null);

  const value = {
    selected,
    setSelected,
  };

  return <SelectPlanContext value={value}>{children}</SelectPlanContext>;
}
