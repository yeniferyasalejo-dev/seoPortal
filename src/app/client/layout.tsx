import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/login");
  }

  // Get client's project name
  let projectName = "Mi Proyecto";
  if (profile.role === "client") {
    const { data: project } = await supabase
      .from("projects")
      .select("name")
      .eq("client_id", user.id)
      .single();
    if (project) {
      projectName = project.name;
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar role="client" />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav userName={profile.full_name} projectName={projectName} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
