import PageHeader from "@/components/user/pageHeader";
import Section from "@/components/user/section";

import ProgressContextProvider from "@/store/progress-context";

export default function KycLayout({ children }) {
  return (
    <>
      <ProgressContextProvider>
     
          <Section label="page-header">
            <PageHeader
              banner="Help Us Know You"
              title="Identity Verification"
              description="To comply with our regulations, you will have to go through identity verification."
            />
          </Section>
          {children}
   
      </ProgressContextProvider>
    </>
  );
}
