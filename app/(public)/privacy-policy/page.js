import AboutHero from "@/components/aboutHero";
import styles from "@/components/aboutInfo.module.css";

import Section from "@/components/section";
import { privacy } from "@/lib/data/aboutData";

export default function AboutPage() {
  return (
    <>
      <Section label="about-company">
         <div className={styles.aboutInfoContainer}>
          <h1>Terms and Conditions</h1>
          <p>{privacy.info}</p>
        </div>
      </Section>
      <Section label="about-hero">
        <AboutHero />
      </Section>
    </>
  );
}
