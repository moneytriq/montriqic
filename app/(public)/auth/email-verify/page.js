"use server";

import ResendButton from "@/components/ui/resend-link-button";
import classes from "../page.module.css";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LinkWithProgress from "@/components/ui/link-with-progress";

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export default async function VerifyEmail({ searchParams }) {
  const params = await searchParams;
  const email = params.email;

  const cookieStore = await cookies();

  const supabase = createServerClient(supabaseURL, serviceRoleKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
        });
      },
    },
  });

  const { data: userRaw, error: listError } =
    await supabase.auth.admin.listUsers({
      filter: `email=eq.${email}`,
    });

  const users = userRaw.users;

  const user = users.find((u) => u.email === email);

  if (!user) {
    redirect("/auth");
  }

  const isEmailVerified = user.user_metadata.email_verified;

  if (isEmailVerified === true) {
    redirect("/auth");
  }

  return (
    <section id="login-main" className={classes.authSection}>
      <div className={classes.wrapper}>
        <div id="login-card" className={classes.card}>
          <div id="login-header" className={classes.header}>
            <h1>Verify Email</h1>
            <p>
              A confirmation link has been sent to <b>{email}</b>. Click the
              link in your email to verify. 
            </p>

            <div className={classes.verifyButtonsContainer}>
              <ResendButton
                className={classes.resendButton}
                email={email}
                userId={user.id}
              >
                Resend Link
              </ResendButton>
              <LinkWithProgress href="/auth">Proceed to Login</LinkWithProgress>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
