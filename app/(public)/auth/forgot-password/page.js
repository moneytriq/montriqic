"use client";

import { useState } from "react";
import classes from "../page.module.css";

import { iconsConfig } from "@/lib/icons/iconsConfig";
import { toast } from "sonner";
import { supabase } from "@/lib/db/supabaseClient";
import { useRouter } from "next/navigation";

const EmailIcon = iconsConfig["email"];

const Next_Base_URL = process.env.NEXT_PUBLIC_SITE_URL;

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${Next_Base_URL}/auth/reset-password`,
    });

    if (error) {
      setMessage(error.message);
    } else {
    
      toast.success("Check your email for the reset link");
    }

    setLoading(false);
  };

  function handleInputChange(e) {
    const inputValue = e.target.value;

    if (errors) {
      setErrors("");
    }

    setEmail(inputValue);
  }

  return (
    <section id="login-main" className={classes.authSection}>
      <div className={classes.wrapper}>
        <div id="login-card" className={classes.card}>
          <div id="login-header" className={classes.header}>
            <h1>Reset Password</h1>
            <p>
              A password reset link will be sent to the provided email. Click
              the link in your email to reset password.
            </p>
          </div>
          <form className={classes.form}>
            <div id="email-field" className={classes.field}>
              <label htmlFor="email">
                <EmailIcon />
                <span>Email Address</span>
              </label>
              <div className={classes.inputWrapper}>
                <input
                  type="email"
                  id="email"
                  placeholder="your.email@example.com"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                />
              </div>
              {errors && <p className="error-message">{errors}</p>}
            </div>

            <button
              type="button"
              className={classes.submitBtn}
              disabled={loading}
              onClick={handleReset}
            >
              {loading ? "Sending..." : "Send reset link"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
