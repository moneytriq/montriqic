"use client";

import { resendVerification } from "@/actions/resend-verificatiion";
import { toast } from "sonner";

export default function ResendButton({ userId, email, children, ...props }) {
  return (
    <button
      {...props}
      onClick={async () => {
        const res = await resendVerification(email, userId);

        if (res.error) {
          console.log(res.error);

          toast.error(res.error);
          return;
        }

        toast.success("Confirmation link sent. Check your email!");
      }}
    >
      {children}
    </button>
  );
}
