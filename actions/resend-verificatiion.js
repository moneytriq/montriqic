"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const Next_Base_URL = process.env.NEXT_PUBLIC_SITE_URL;

export async function resendVerification(email, userId) {
  const cookieStore = await cookies();

  const supabase = createServerClient(supabaseURL, serviceRoleKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
        });
      },
    },
  });

  const { data, error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: {
      emailRedirectTo: `${Next_Base_URL}/auth`,
    },
  });

  if (error) {
    return {
      success: false,
      message: null,
      authError: "Failed to send verification link.",
    };
  }

  return {
    success: true,
    error: null,

  };
}
