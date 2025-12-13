import MakeAdminForm from "@/components/user/make-admin-form";
import PageHeader from "@/components/user/pageHeader";
import RecentActivitiesGrid from "@/components/user/recent-activities-grid";
import Section from "@/components/user/section";
import { supabase } from "@/lib/db/supabaseClient";

export default async function MakeAdminPage() {
  let users;

  try {
    const { data: userList, error: userListError } = await supabase
      .from("user_profile")
      .select("*")
      .order("created_at", { ascending: false });

    if (userListError) throw userListError;

    users = userList.map((user) => ({
      id: user.user_id,
      type: "users",
      title: user.user_email,
      date: user.created_at,
      status: "users",
    }));
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

  return (
    <>
      <Section label="page-header">
        <PageHeader
          banner="User"
          title="Manage Users"
          description="Here, you can manage your users and administrators!"
        />
      </Section>

      <Section
        label="users-section"
        title="Manage Users"
        // description={[
        //   { type: "text", text: "Use the link below to invite your friends" },
        // ]}
      >
        <RecentActivitiesGrid
          activities={users}
          label="users"
          isManageUsers="admin"
          baseUrl="/admin/manage-users"
        />
      </Section>

      {/* <Section>
        <MakeAdminForm label="make-admin" title="Make user admin" />
      </Section>
      <Section>
        <MakeAdminForm label="remove-admin" title="Remove user as admin" />
      </Section> */}
    </>
  );
}
