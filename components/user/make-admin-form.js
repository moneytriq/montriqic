"use client";
import { useActionState, useState } from "react";
import styles from "./make-admin-form.module.css";
import { makeAdmin, removeAdmin } from "@/actions/make-admin-action";
import { toast } from "sonner";
import FormSubmitButton from "../ui/form-submit-button";
export default function MakeAdminForm({ label = null, title }) {
  const [inputValue, setInputValue] = useState("");

  const submitAction = label === "make-admin" ? makeAdmin : removeAdmin;

  const [formState, formAction] = useActionState(
    async (prevState, formData) => {
      try {
        const res = await submitAction(inputValue, prevState, formData);

        if (res.error) {
          toast.error(res.error);
          return;
        }

        if (label === "make-admin") {
          toast.success(`${inputValue} is now part of your administrators`);
        } else {
          toast.success(
            `${inputValue} is no longer part of your administrators`
          );
        }

        return;
      } catch (error) {
        console.error("Supabase Error", error.message);
        toast.error("Something went wrong, please try again");
      }
    },
    {}
  );

  return (
    <>
      <form action={formAction} className={styles.makeAdminFormContainer}>
        <h2>{title}</h2>
        <div className={styles.field}>
          <label htmlFor="investment-amount">Enter user email</label>
          <div className={styles.amountInputWrapper}>
            <input
              type="text"
              name="investment-amount"
              id="investment-amount"
              placeholder="example@gmail.com"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <FormSubmitButton>
            {label === "make-admin" ? "Make Admin" : "Remove Admin"}
          </FormSubmitButton>
        </div>
      </form>
    </>
  );
}
