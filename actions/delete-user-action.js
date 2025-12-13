"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";


const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function deleteUser(userId) {


  const supabase = createClient(supabaseURL, serviceRoleKey);

  const { data: userRaw, error: listError } =
    await supabase.auth.admin.listUsers({
      filter: `id=eq.${userId}`,
    });

  const users = userRaw.users;

  const user = users.find((u) => u.id === userId);

  if (!user) {
    throw new Error("User does not exist");
  }

  await supabase.auth.admin.deleteUser(userId);

  revalidatePath("/", "layout");

  return {
    success: true,
    message: "User deleted successfully.",
  };
}
