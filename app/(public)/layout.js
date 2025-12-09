import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Section from "@/components/section";
import { createSupabaseServerClient } from "@/lib/db/supabaseServer";
import React from "react";

export default async function PublicLayout({ children }) {
    const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <>
      <Navbar user={user}/>
      {children}
      <Section label="footer-section">
        <Footer user={user}/>
      </Section>
    </>
  );
}
