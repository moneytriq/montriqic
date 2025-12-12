"use client";
import Image from "next/image";
import styles from "./contact-section.module.css";
import { MobileNavContext } from "@/store/mobileNav-context";
import { use, useActionState, useEffect, useState } from "react";
import submitEnquiry from "@/actions/submit-enquiry";
import { toast } from "sonner";
import LinkWithProgress from "./ui/link-with-progress";
import FormSubmitButton from "./ui/form-submit-button";

export default function ContactSection() {
  const { mobileNav, setMobileNav } = use(MobileNavContext);
  const [formInputs, setFormInputs] = useState({
    name: "",
    email: "",
    tel: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mobileNav) {
      setMobileNav(false);
    }
  }, []);

  const [formState, formAction] = useActionState(
    async (prevState, formData) => {
      try {
        const res = await submitEnquiry(prevState, formData);

        if (!res.errors) {
          setFormInputs({
            name: "",
            email: "",
            tel: "",
            message: "",
          });
          toast.success(
            "Your message was sent successfully! You will recieve a response via the email provided shortly"
          );
          return {};
        } else if (res.errors.check) {
          toast.error("Please agree with our terms of service");
          return;
        }
        const errors = res.errors;
        setErrors(errors);
        return;
      } catch (error) {
     
        toast.error("Failed to send message, try again");
      }
    },

    {}
  );

  function handleChange(e) {
    const isError = errors[e.target.name];
    if (isError) {
      setErrors((prev) => {
        return {
          ...prev,
          [e.target.name]: "",
        };
      });
    }
    setFormInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  return (
    <div className={styles.contactSection}>
      <div className={styles.flex}>
        {/* Contact Form */}
        <div className={styles.formWrapper}>
          <h2 className={styles.heading}>Contact Us</h2>
          <p className={styles.description}>
            If you need advice or have any question in mind or technical
            assistance, do not hesitate to contact our specialists.
          </p>

          <form action={formAction} id="contact-form" method="post">
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.label}>
                  Name<span className={styles.required}>*</span>
                </label>
                <input
                  name="name"
                  id="name"
                  type="text"
                  // required
                  className={styles.input}
                  onChange={handleChange}
                  value={formInputs.name}
                />
                {errors?.name && (
                  <p className="error-message ">{errors.name}</p>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email<span className={styles.required}>*</span>
                </label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  // required
                  className={styles.input}
                  onChange={handleChange}
                  value={formInputs.email}
                />
              </div>
              {errors?.email && (
                <p className="error-message ">{errors.email}</p>
              )}
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label htmlFor="phone" className={styles.label}>
                  Phone Number<span className={styles.required}>*</span>
                </label>
                <input
                  name="tel"
                  id="tel"
                  type="tel"
                  // required
                  className={styles.input}
                  onChange={handleChange}
                  value={formInputs.tel}
                />
                {errors?.tel && <p className="error-message ">{errors.tel}</p>}
              </div>
            </div>

            <div className={styles.textareaGroup}>
              <label htmlFor="message" className={styles.label}>
                Message<span className={styles.required}>*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                // required
                className={styles.textarea}
                onChange={handleChange}
                value={formInputs.message}
              />
              {errors?.message && (
                <p className="error-message ">{errors.message}</p>
              )}
            </div>

            <div className={styles.checkboxRow}>
              <input
                type="checkbox"
                id="contact-form-consent-input"
                name="checkbox"
                className={styles.checkbox}
              />
              <label
                htmlFor="contact-form-consent-input"
                className={styles.checkboxLabel}
              >
                I agree to the{" "}
                <LinkWithProgress
                  href="/terms-and-conditions"
                  className={styles.link}
                >
                  Terms of Service
                </LinkWithProgress>
              </label>
            </div>

            <FormSubmitButton
              type="submit"
              id="contact-form-submit"
              className={styles.button}
            >
              Submit
            </FormSubmitButton>

            <div id="contact-form-notice" className={styles.notice}></div>
          </form>
        </div>

        {/* Contact Info */}
        <div className={styles.infoWrapper}>
          <h2 className={styles.heading}>Our Information</h2>

          <div className={styles.infoCard}>
            <div className={styles.infoRow}>
              <span className={styles.iconCircle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M2.243 6.854L11.49 1.31a1 1 0 0 1 1.029 0l9.238 5.545a.5.5 0 0 1 .243.429V20a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.283a.5.5 0 0 1 .243-.429zM4 8.133V19h16V8.132l-7.996-4.8L4 8.132zm8.06 5.565l5.296-4.463 1.288 1.53-6.57 5.537-6.71-5.53 1.272-1.544 5.424 4.47z" />
                </svg>
              </span>

              <div>
                <span className={styles.infoTitle}>Email</span>
                <a href="mailto:[email protected]" className={styles.infoEmail}>
                  {" "}
                  Info@monetriq.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Image */}
      <div className={styles.bottomContainer}>
        <Image
          src="/images/piggy-bank.png"
          alt="About"
          className={styles.bottomImage}
          fill
          sizes="100vw"
        />
      </div>
    </div>
  );
}
