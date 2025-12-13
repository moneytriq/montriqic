"use server";

import { createServerClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

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

  console.log("REFID", refId);

  if (!refId) {
    throw new Error("No ref");
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
      throw new Error("Invalid referal link");
    }

    const { data: userRaw, error: listError } =
      await supabase.auth.admin.listUsers({
        filter: `email=eq.${email}`,
      });

    const users = userRaw.users;

    const user = users.find((u) => u.email === email);

    if (user) {
      throw new Error("User already registered");
    }

    const { data: userData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
      },
      {
        redirectTo: `${Next_Base_URL}`,
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
  } catch (error) {
    console.error("Supabase", error.message);
    throw error;
  }
  revalidatePath("/");
  return {
    success: true,
    message: "Account created successfully.",
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
      throw new Error("Invalid login credentials");
    }

    const { error: signinError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (signinError) throw signinError;
  } catch (error) {
    console.error("Supabase", error.message);
    throw error;
  }

  revalidatePath("/");

  return {
    success: true,
    message: "Login successful",
  };
}
