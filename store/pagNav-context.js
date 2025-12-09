"use client";

import { createContext, useState } from "react";

export const PageNavContext = createContext();

export default function PageNavContextProvider({ children, defaultNav }) {
  const [pageNav, setPageNav] = useState(defaultNav);

  const value = {
    pageNav,
    setPageNav,
  };

  return <PageNavContext value={value}>{children}</PageNavContext>;
}
