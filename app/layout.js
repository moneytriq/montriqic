import ProgressBar from "@/components/ui/progress-bar";
import "./globals.css";
import "@/lib/styles/colors.css";
import MobileNavContextProvider from "@/store/mobileNav-context";
import { createSupabaseServerClient } from "@/lib/db/supabaseServer";
import UserContextProvider from "@/store/user-context";
import { Toaster } from "sonner";
import TawkTo from "@/components/ui/tawkto";

export const metadata = {
  title: "Monetriq Inc",
  description: "Home of financial freedom.",
};

export default async function RootLayout({ children }) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let userDetails;

  if (user) {
    const {
      data: [userProfile],
      error: userProfileError,
    } = await supabase.from("user_profile").select("*").eq("user_id", user.id);
    if (userProfileError) throw userProfileError;

    try {
      userDetails = {
        id: user.id,
        email: user.email,
        fullName: userProfile.full_name || "",
        displayName: userProfile.display_name || "",
        phone: userProfile.phone || "",
        telegram: userProfile.telegram || "",
        gender: userProfile.gender || "",
        dateOfBirth: userProfile.date_of_birth || "",
        country: userProfile.country || "",
        address: userProfile.address || "",
        kycStatus: userProfile.kyc_status || "",
        walletAddress: userProfile.wallet_address || "",
        role: userProfile.role || "",
      };
    } catch (error) {
      console.error("Supabase error", error.message);
      return (
        <p className="data-fetching-error ">
          Something Went Wrong, please try again
        </p>
      );
    }
  }
  return (
    <html lang="en">
      <body>
        <UserContextProvider userDetails={userDetails}>
          <MobileNavContextProvider>
            <ProgressBar />
            <TawkTo/>
            {children}
            <Toaster />
          </MobileNavContextProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
