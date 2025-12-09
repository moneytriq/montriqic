"use client";

import { createContext, useState } from "react";

export const AdminWalletAddressContext = createContext();

export default function AdminWalletAddressContextProvider({ children , address = ""}) {
  const [adminWalletAddress, setAdminWalletAddress] = useState(address);

  const value = {
    adminWalletAddress,
    setAdminWalletAddress,
  };

  return <AdminWalletAddressContext value={value}>{children}</AdminWalletAddressContext>;
}
