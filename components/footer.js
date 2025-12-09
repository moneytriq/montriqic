// components/Footer/Footer.jsx
"use client";

import styles from "./footer.module.css";
import { footerData } from "@/lib/data/footerData";
import LinkWithProgress from "./ui/link-with-progress";
import { use } from "react";
import { UserContext } from "@/store/user-context";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { logout } from "@/actions/logout";

export default function Footer({ user }) {
  const isLoggedIn = user !== null;
  const { setUser } = use(UserContext);
  const router = useRouter();

  async function handleLogoutClick() {
    try {
      const res = await logout();
      setUser({
        id: "",
        email: "",
        fullName: "",
        displayName: "",
        phone: "",
        telegram: "",
        gender: "",
        date_of_birth: "",
        country: "",
        address: "",
        kyc_status: "",
        role: "",
      });
    } catch (error) {
      console.error(error.message);
      toast.error("Something went wrong, please try again");
    }
  }
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* LOGO + DESCRIPTION */}
          <div className={styles.colLogo}>
            <a href="/" className={styles.logo}>
              {footerData.brand}
            </a>

            <p className={styles.description}>{footerData.description}</p>
          </div>

          {/* COMPANY LINKS */}
          <div className={styles.column}>
            <h3>{footerData.company.title}</h3>
            <ul>
              {footerData.company.links.map((item, index) => {
                return (
                  <li key={index}>
                    <LinkWithProgress href={item.href}>
                      {item.label}
                    </LinkWithProgress>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ACCOUNT LINKS */}
          {isLoggedIn && (
            <div className={styles.column}>
              <h3>{footerData.account.title}</h3>
              <ul>
                {footerData.account.links.map((item, index) => {
                  return item.label !== "Logout" ? (
                    <li key={index}>
                      <LinkWithProgress href={item.href}>
                        {item.label}
                      </LinkWithProgress>
                    </li>
                  ) : (
                    <li key={index}>
                      <p onClick={handleLogoutClick}>{item.label}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {!isLoggedIn && (
            <div className={styles.column}>
              <h3>{footerData.account.title}</h3>
              <ul>
                <li>
                  <LinkWithProgress href="/auth">Login</LinkWithProgress>
                </li>
                <li>
                  <LinkWithProgress href="/auth?mode=signup">
                    Register
                  </LinkWithProgress>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* BOTTOM BAR */}
        <div className={styles.bottomBar}>
          <span>© {new Date().getFullYear()} Monetriq</span>

          <ul>
            <li>
              <a href={footerData.termsLink}>Terms and conditions</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
