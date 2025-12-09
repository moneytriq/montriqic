import AboutHero from "@/components/aboutHero";

import Section from "@/components/section";
import { terms } from "@/lib/data/aboutData";
import styles from "@/components/aboutInfo.module.css";

export default function AboutPage() {
  return (
    <>
      <Section label="about-company">
        <div className={styles.aboutInfoContainer}>
          <h1>Terms and Conditions</h1>
          <p>{terms.info}</p>
        </div>
      </Section>
      <Section label="about-hero">
        <AboutHero />
      </Section>
    </>
  );
}
