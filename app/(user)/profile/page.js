import DashboardFooter from "@/components/user/dashboard-footer";
import PageHeader from "@/components/user/pageHeader";
import PageNav from "@/components/user/pageNav";
import ProfileSectionSelector from "@/components/user/profile-section-selector";
import Section from "@/components/user/section";
import PageNavContextProvider from "@/store/pagNav-context";

const navigations = ["profile", "account"];

export default function ProfilePage() {
  return (
    <>
      <Section label="page-header">
        <PageHeader
          banner="Your Profile"
          title="Profile Info"
          description="You have the full access to manage your own account settings"
        />
      </Section>

      <PageNavContextProvider defaultNav="profile">
        <Section label="transactions-section">
          <PageNav navigations={navigations} />
        </Section>

        <ProfileSectionSelector />
      </PageNavContextProvider>
      <Section label="footer-section">
        <DashboardFooter />
      </Section>
    </>
  );
}
