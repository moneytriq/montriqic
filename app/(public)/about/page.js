import AboutHero from "@/components/aboutHero";
import AboutInfo from "@/components/aboutInfo";


import Section from "@/components/section";

export default function AboutPage() {
  return (
    <>
      <Section label="about-company">
        <AboutInfo />
      </Section>
      <Section label="about-hero">
        <AboutHero />
      </Section>
    </>
  );
}
