"use server";

import { createServerClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { sendWelcomeEmail } from "./email";

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const Next_Base_URL = process.env.NEXT_PUBLIC_SITE_URL;

export async function signup(refId, prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  let errors = {};

  if (!email || !email.includes("@")) {
    errors.email = "Please enter a valid email address";
  }

  if (!password || password.trim().length < 8) {
    errors.password = "Password must be atleast 8 characters long.";
  }
  if (password?.trim() !== confirmPassword?.trim()) {
    errors.confirmPassword = "Passwords must match.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  if (!refId) {
    return {
      success: false,
      message: null,
      authError: "no ref",
    };
  }

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

  try {
    const { count, error: countError } = await supabase
      .from("user_profile")
      .select("*", { count: "exact", head: true })
      .eq("user_id", refId);

    if (count < 1) {
      return {
        success: false,
        message: null,
        authError: "Invalid referal link",
      };
    }

    const { data: userRaw, error: listError } =
      await supabase.auth.admin.listUsers({
        filter: `email=eq.${email}`,
      });

    const users = userRaw.users;

    const user = users.find((u) => u.email === email);

    if (user) {
      return {
        success: false,
        message: null,
        authError: "User already registered! Sign in instead",
      };
    }

    const { data: userData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
      },
      {
        redirectTo: `${Next_Base_URL}/dashboard`,
      }
    );

    if (signUpError) throw signUpError;

    await supabase.from("wallet").insert({
      user_id: userData.user.id,
    });

    await supabase.from("referrals").insert({
      user_id: refId,
      referee_id: userData.user.id,
    });
    await supabase.from("referral_earnings_ledger").insert({
      user_id: userData.user.id,
    });

    await sendWelcomeEmail(email);
    
  } catch (error) {
    console.error("Supabase", error.message);
    throw error;
  }
  revalidatePath("/");
  return {
    success: true,
    message: "Account created successfully. Check email for verification link",
    authError: null,
  };
}

export async function signin(refId, prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  let errors = {};

  if (!email || !email.includes("@")) {
    errors.email = "Please enter a valid email address";
  }

  if (!password || password.trim().length < 8) {
    errors.password = "Password must be atleast 8 characters long.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

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

  try {
    const { data: userRaw, error: listError } =
      await supabase.auth.admin.listUsers({
        filter: `email=eq.${email}`,
      });

    const users = userRaw.users;

    const user = users.find((u) => u.email === email);

    if (!user) {
      return {
        success: false,
        message: null,
        authError: "Invalid email or password",
      };
    }

    const { error: signinError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signinError) {
      console.log("login erorr", signinError.message);

      if (signinError.message === "Email not confirmed") {
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
          success: false,
          message: null,
          authError:
            "Email not confirmed yet. Follow the link sent to your email to proceed.",
        };
      }

      return {
        success: false,
        message: null,
        authError: "Invalid email or password",
      };
    }
  } catch (error) {
    console.error("Supabase", error.message);
    throw error;
  }

  revalidatePath("/");

  return {
    success: true,
    message: "Login successful",
    authError: null,
  };
}
