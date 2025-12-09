"use client";

import { createContext, useState } from "react";

export const ProgressContext = createContext();

export default function ProgressContextProvider({ children }) {
  const [progress, setProgress] = useState(0);

  const value = {
    progress,
    setProgress,
  };

  return <ProgressContext value={value}>{children}</ProgressContext>;
}
