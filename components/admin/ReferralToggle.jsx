"use client";

import { useState } from "react";
import { toggleReferral } from "@/actions/admin-settings";
import { toast } from "sonner";

export default function ReferralToggle({ enabled }) {
  const [isEnabled, setIsEnabled] = useState(enabled);
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    try {
      setLoading(true);
      const nextValue = !isEnabled;

      await toggleReferral(nextValue);

      setIsEnabled(nextValue);
      toast.success(
        `Referral requirement ${nextValue ? "enabled" : "disabled"}`
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update referral setting");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        padding: "16px",
        border: "1px solid #444",
        borderRadius: "8px",
        maxWidth: "420px",
        background: "#0f172a",
      }}
    >
      <h4 style={{ marginBottom: "8px" }}>Referral Requirement</h4>

      <p style={{ fontSize: "14px", marginBottom: "12px", opacity: 0.8 }}>
        Toggle whether new users must sign up with a referral link.
      </p>

      <button
        onClick={handleToggle}
        disabled={loading}
        style={{
          padding: "8px 14px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          backgroundColor: isEnabled ? "#16a34a" : "#dc2626",
          color: "#fff",
        }}
      >
        {loading
          ? "Updating..."
          : isEnabled
          ? "ON — Referral Required"
          : "OFF — No Referral"}
      </button>
    </div>
  );
}
