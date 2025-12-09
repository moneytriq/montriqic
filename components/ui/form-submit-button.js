"use client";

import { useFormStatus } from "react-dom";

export default function FormSubmitButton({ children,  ...props }) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" {...props}>
      {pending ? (
        "submiting"
      ) : (
        <>
         {children}
        </>
      )}
    </button>
  );
}
