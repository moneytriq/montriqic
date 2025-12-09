export const dynamic = "force-dynamic";

import Section from "@/components/user/section";
import { createSupabaseServerClient } from "@/lib/db/supabaseServer";

import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const supabase = await createSupabaseServerClient({
    fetchOptions: { cache: "no-store" },
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isAdmin = true;

  if (user) {
    try {
      const {
        data: [userProfile],
        error: userProfileError,
      } = await supabase
        .from("user_profile")
        .select("*")
        .eq("user_id", user.id);
      if (userProfileError) throw userProfileError;

      if (userProfile.role !== "admin") {
        isAdmin = false;
      }
    } catch (error) {
      console.error("Supabase error", error.message);
      return (
        <Section>
          <p className="data-fetching-error ">
            Something Went Wrong, please try again
          </p>
        </Section>
      );
    }
  }

  if (!isAdmin) {
    redirect("/dashboard");
  }
  return <>{children}</>;
}
