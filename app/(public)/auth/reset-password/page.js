"use client";

import { useActionState, useState } from "react";
import classes from "../page.module.css";

import { iconsConfig } from "@/lib/icons/iconsConfig";
import { toast } from "sonner";

import FormSubmitButton from "@/components/ui/form-submit-button";
import { resetPassword } from "@/actions/password-reset-action";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/db/supabaseClient";

const EyeIcon = iconsConfig["eye"];
const EmailIcon = iconsConfig["email"];
const LockIcon = iconsConfig["locked"];
const EyeOffIcon = iconsConfig["eyeOff"];

const Next_Base_URL = process.env.NEXT_PUBLIC_SITE_URL;

export default function ResetPassword() {
  const router = useRouter();
  const [inputs, setInputs] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  function handleInputChange(e) {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    if (errors[inputName]) {
      setErrors((prev) => ({ ...prev, [inputName]: "" }));
    }

    setInputs((prev) => ({
      ...prev,
      [inputName]: inputValue,
    }));
  }

  const [formState, formAction] = useActionState(
    async (prevState, formData) => {
      try {
        let errors = {};
        if (!inputs.password || inputs.password.trim().length < 8) {
          errors.password = "Password must be atleast 8 characters long.";
        }
        if (inputs.password?.trim() !== inputs.confirmPassword?.trim()) {
          errors.confirmPassword = "Passwords must match.";
        }

        if (Object.keys(errors).length > 0) {
          setErrors((prev) => {
            const newErrors = { ...prev, ...errors };
            return newErrors;
          });

          return;
        }
        const { error } = await supabase.auth.updateUser({
          password: inputs.password,
        });

        if (error) {
          console.log(error);
          toast.error("Failed to change password");
          return {};
        }
      
        router.replace("/auth");
        toast.success("Password has been changed successfully");
        return {};
      } catch (error) {
        console.log("auth error", error);

        toast.error("Something went wrong, please try again");
      }
    },
    {}
  );
  return (
    <section id="login-main" className={classes.authSection}>
      <div className={classes.wrapper}>
        <div id="login-card" className={classes.card}>
          <div id="login-header" className={classes.header}>
            <h1>Enter New Password</h1>
          </div>
          <form className={classes.form} action={formAction}>
            <div id="password-field" className={classes.field}>
              <label htmlFor="password">
                <LockIcon />
                <span>New Password</span>
              </label>
              <div className={classes.inputWrapper}>
                <input
                  type={!showPassword ? "password" : "text"}
                  id="password"
                  placeholder="Enter your password"
                  name="password"
                  value={inputs.password}
                  onChange={handleInputChange}
                />
                <button type="button" className={classes.eyeButton}>
                  {!showPassword ? (
                    <EyeIcon
                      className={classes.eyeButton}
                      onClick={() => setShowPassword(true)}
                    />
                  ) : (
                    <EyeOffIcon
                      className={classes.eyeButton}
                      onClick={() => setShowPassword(false)}
                    />
                  )}
                </button>
              </div>
              {errors?.password && (
                <p className="error-message">{errors.password}</p>
              )}
            </div>

            <div id="confirm-password-field" className={classes.field}>
              <label htmlFor="confirm-password">
                <LockIcon />
                <span>Confirm New Password</span>
              </label>
              <div className={classes.inputWrapper}>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="Re-enter password"
                  name="confirmPassword"
                  value={inputs.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
              {errors?.confirmPassword && (
                <p className="error-message">{errors.confirmPassword}</p>
              )}
            </div>

            <FormSubmitButton className={classes.submitBtn} icon="rightArrow">
              Submit
            </FormSubmitButton>
          </form>
        </div>
      </div>
    </section>
  );
}
