import MakeAdminForm from "@/components/user/make-admin-form";
import PageHeader from "@/components/user/pageHeader";
import Section from "@/components/user/section";

export default function MakeAdminPage() {
  return (
    <>
      <Section label="page-header">
        <PageHeader
          banner="Admin"
          title="Manage Administrators"
          description="Here, you can manage administrators!"
        />
      </Section>

      <Section>
        <MakeAdminForm label="make-admin" title="Make user admin" />
      </Section>
      <Section>
        <MakeAdminForm label="remove-admin" title="Remove user as admin" />
      </Section>
    </>
  );
}
