"use client";

import { createContext, useState } from "react";

export const SelectProfileUpdateContext = createContext();

export default function SelectProfileUpdateContextProvider({ children }) {
  const [selectProfileUpdate, setSelectProfileUpdate] = useState(null);

  const value = {
    selectProfileUpdate,
    setSelectProfileUpdate,
  };

  return <SelectProfileUpdateContext value={value}>{children}</SelectProfileUpdateContext>;
}
