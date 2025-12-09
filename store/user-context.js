"use client";

import { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ userDetails, children }) {
  const [user, setUser] = useState({
    id: userDetails?.id || "",
    email: userDetails?.email || "",
    fullName: userDetails?.fullName || "",
    displayName: userDetails?.displayName || "",
    phone: userDetails?.phone || "",
    telegram: userDetails?.telegram || "",
    gender: userDetails?.gender || "",
    dateOfBirth: userDetails?.dateOfBirth || "",
    country: userDetails?.country || "",
    address: userDetails?.address || "",
    kycStatus: userDetails?.kycStatus || "",
    walletAddress: userDetails?.walletAddress || "",
    role: userDetails?.role || "",
  });


  const value = {
    user,
    setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
