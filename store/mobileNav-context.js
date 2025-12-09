"use client";

import { createContext, useState } from "react";

export const MobileNavContext = createContext();

export default function MobileNavContextProvider({ children }) {
  const [mobileNav, setMobileNav] = useState(false);

  const value = {
    mobileNav,
    setMobileNav,
  };

  return <MobileNavContext value={value}>{children}</MobileNavContext>;
}
