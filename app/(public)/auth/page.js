"use client";
import { iconsConfig } from "@/lib/icons/iconsConfig";
import styles from "./page.module.css";
import { use, useActionState, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signup, signin } from "@/actions/auth-actions";
import { toast } from "sonner";
import FormSubmitButton from "@/components/ui/form-submit-button";
import { MobileNavContext } from "@/store/mobileNav-context";

const EyeIcon = iconsConfig["eye"];
const EmailIcon = iconsConfig["email"];
const LockIcon = iconsConfig["locked"];
const EyeOffIcon = iconsConfig["eyeOff"];
const WarningIcon = iconsConfig["warning"];

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get("mode") || "login";
  const refId = searchParams.get("refId") || "";
  const { mobileNav, setMobileNav } = use(MobileNavContext);
  const [showNoReg, setShowNoReg] = useState(false);

  useEffect(() => {
    if (mobileNav) {
      setMobileNav(false);
    }
  }, []);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  let authAction = signin;

  if (mode !== "login") {
    authAction = signup;
  }

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
        const res = await authAction(refId, prevState, formData);

        if (!res.errors) {
          router.replace("/dashboard");
          toast.success(res.message);

          return {};
        }

        setErrors((prev) => {
          const newErrors = { ...prev, ...res.errors };
          return newErrors;
        });
      } catch (error) {
        if (error.message === "User already registered") {
          toast.error(`${error.message}! Sign in instead`);
          router.push("/auth");
          return;
        }

        if (error.message === "Invalid login credentials") {
          toast.error(`${"Invalid email or password"}`);
          return;
        }

        if (error.message === "No ref") {
          setShowNoReg(true);
          return;
        }

        if (error.message === "Invalid referal link") {
          toast.error(error.message);
          return;
        }

        if (mode === "login") {
          toast.error("Login failed, please try again");
        } else {
          toast.error("Failed to create account, please try again");
        }
        console.log("auth error", error);
      }
    },
    {}
  );

  return (
    <section id="login-main" className={styles.authSection}>
      <div className={styles.wrapper}>
        <div id="login-card" className={styles.card}>
          <div id="login-header" className={styles.header}>
            {mode === "login" ? (
              <>
                <h1>Welcome Back</h1>
                <p>Login to continue</p>
              </>
            ) : (
              <>
                <h1>Welcome</h1>
                <p>Sign up to continue</p>
              </>
            )}
          </div>

          {showNoReg && (
            <div className={styles.noRegError}>
              <WarningIcon /> New registration is not allowed. Please feel free
              to contact us for more information.
            </div>
          )}

          <form className={styles.form} action={formAction}>
            <div id="email-field" className={styles.field}>
              <label htmlFor="email">
                <EmailIcon />
                <span>Email Address</span>
              </label>
              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  id="email"
                  placeholder="your.email@example.com"
                  name="email"
                  value={inputs.email}
                  onChange={handleInputChange}
                />
              </div>
              {errors?.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div id="password-field" className={styles.field}>
              <label htmlFor="password">
                <LockIcon />
                <span>Password</span>
              </label>
              <div className={styles.inputWrapper}>
                <input
                  type={!showPassword ? "password" : "text"}
                  id="password"
                  placeholder="Enter your password"
                  name="password"
                  value={inputs.password}
                  onChange={handleInputChange}
                />
                <button type="button" className={styles.eyeButton}>
                  {!showPassword ? (
                    <EyeIcon
                      className={styles.eyeButton}
                      onClick={() => setShowPassword(true)}
                    />
                  ) : (
                    <EyeOffIcon
                      className={styles.eyeButton}
                      onClick={() => setShowPassword(false)}
                    />
                  )}
                </button>
              </div>
              {errors?.password && (
                <p className="error-message">{errors.password}</p>
              )}
              {mode === "login" && (
                <div className={styles.fieldFooter}>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>
                  {/* <a href="#">Forgot Password?</a> */}
                </div>
              )}
            </div>
            {mode !== "login" && (
              <div id="confirm-password-field" className={styles.field}>
                <label htmlFor="confirm-password">
                  <LockIcon />
                  <span>Confirm-Password</span>
                </label>
                <div className={styles.inputWrapper}>
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
            )}

            <FormSubmitButton className={styles.submitBtn} icon="rightArrow">
              {mode === "login" ? "Login to Dashboard" : "Sign Up"}
            </FormSubmitButton>
          </form>

          <div id="signup-redirect" className={styles.signupRedirect}>
            {mode === "login" ? (
              <p>
                Don’t have an account?
                <Link href="/auth/?mode=signup">Sign Up</Link>
              </p>
            ) : (
              <p>
                Already have an account?
                <Link href="/auth/?mode=login">Sign In</Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
