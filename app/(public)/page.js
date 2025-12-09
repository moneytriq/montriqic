import DownloadGrid from "@/components/download-section";
import ExperienceGrid from "@/components/experience-grid";
import FeaturesGrid from "@/components/features-grid";
import Hero from "@/components/hero";
import NeedHelpGrid from "@/components/need-help-grid";
import Section from "@/components/section";
import SecurityGrid from "@/components/security-grid";
import TradingViewWidget from "@/components/tradingview-widget";
import { createSupabaseServerClient } from "@/lib/db/supabaseServer";

export default async function HomePage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Section label="home-hero-section">
        <Hero user={user} />
      </Section>

      <Section label="features-section" sectionBgGray="gray-bg">
        <FeaturesGrid />
      </Section>

      <Section label="security-section">
        <SecurityGrid user={user}/>
      </Section>

      <Section label="tradingview-widget-section">
        <TradingViewWidget />
      </Section>
      <Section label="experience-section">
        <ExperienceGrid />
      </Section>
      <Section label="download-section" sectionBgGray="gray-bg">
        <DownloadGrid />
      </Section>
      <Section label="need-help-section">
        <NeedHelpGrid />
      </Section>
    </>
  );
}
