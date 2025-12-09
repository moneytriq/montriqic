"use server";
import { supabase } from "@/lib/db/supabaseClient";

export async function makeAdmin(email, prevState, formData) {
  if (!email || !email.includes("@")) {
    return { success: false, error: "Please enter a valid email addreess" };
  }

  const { data: userProfile, error: userProfileError } = await supabase
    .from("user_profile")
    .select("*")
    .eq("user_email", email);

 
  if (userProfileError) throw userProfileError;

  if (userProfile.length < 1) {
    return { success: false, error: "User does not exist" };
  }

  if (userProfile[0].role === "admin") {
    return { success: false, error: "User is already an admin" };
  }

  const { data: userProfileUpdate, error: userProfileUpdateError } =
    await supabase
      .from("user_profile")
      .update({ role: "admin" })
      .eq("user_email", email);

  if (userProfileUpdateError) throw userProfileUpdateError;

  return { success: true, error: null };
}

export async function removeAdmin(email, prevState, formData) {
  if (!email || !email.includes("@")) {
    return { success: false, error: "Please enter a valid email addreess" };
  }

  const { data: userProfile, error: userProfileError } = await supabase
    .from("user_profile")
    .select("*")
    .eq("user_email", email);

 
  if (userProfileError) throw userProfileError;

  if (userProfile.length < 1) {
    return { success: false, error: "User does not exist" };
  }

  if (userProfile[0].role !== "admin") {
    return { success: false, error: "User is not an admin" };
  }

  const { data: userProfileUpdate, error: userProfileUpdateError } =
    await supabase
      .from("user_profile")
      .update({ role: "user" })
      .eq("user_email", email);

  if (userProfileUpdateError) throw userProfileUpdateError;

  return { success: true, error: null };
}
