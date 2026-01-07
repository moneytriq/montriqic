"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function toggleReferral(required) {
  const cookieStore = await cookies();

  const supabase = createServerClient(supabaseURL, serviceRoleKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) =>
          cookieStore.set(name, value, options)
        );
      },
    },
  });

  const { error } = await supabase
    .from("app_settings")
    .update({ referral_required: required })
    .eq("id", "1beb0946-08d5-4145-9122-54ff85cb57f6");

  if (error) throw error;

  revalidatePath("/admin");
  return { success: true };
}
