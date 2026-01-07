"use client";

import { useTransition } from "react";
import { toggleReferral } from "@/actions/admin-settings";
import { toast } from "sonner";

export default function ReferralToggle({ enabled }) {
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    startTransition(async () => {
      try {
        await toggleReferral(!enabled);
        toast.success(
          `Referral ${!enabled ? "enabled" : "disabled"} successfully`
        );
      } catch (error) {
        toast.error("Failed to update referral setting");
      }
    });
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "12px 16px",
        borderRadius: "8px",
        background: "#0f172a",
        color: "#fff",
        maxWidth: "420px",
      }}
    >
      <span style={{ fontWeight: 500 }}>Referral Requirement</span>

      <button
        onClick={handleToggle}
        disabled={isPending}
        style={{
          padding: "6px 18px",
          borderRadius: "20px",
          border: "none",
          cursor: "pointer",
          background: enabled ? "#16a34a" : "#dc2626",
          color: "#fff",
          fontWeight: 600,
        }}
      >
        {enabled ? "ON" : "OFF"}
      </button>
    </div>
  );
}
