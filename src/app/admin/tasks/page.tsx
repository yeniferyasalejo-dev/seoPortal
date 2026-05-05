import { TasksFilter } from "@/components/admin/TasksFilter";
import { createClient } from "@/lib/supabase/server";

export default async function TasksPage() {
  const supabase = await createClient();

  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: projects } = await supabase
    .from("projects")
    .select("id, name, domain, status, client_id, created_at, updated_at, start_date, ga4_property_id, gsc_site_url, ga4_credentials, gsc_credentials")
    .order("name");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-foreground">Tareas</h1>
      <TasksFilter tasks={tasks || []} projects={projects || []} />
    </div>
  );
}
