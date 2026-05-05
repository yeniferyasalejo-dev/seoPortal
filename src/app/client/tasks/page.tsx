import { createClient } from "@/lib/supabase/server";
import { ClientTasksFilter } from "@/components/client/ClientTasksFilter";

export default async function ClientTasksPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Get client's project
  const { data: project } = await supabase
    .from("projects")
    .select("id")
    .eq("client_id", user!.id)
    .single();

  let visibleTasks: any[] = [];
  if (project) {
    const { data: tasks } = await supabase
      .from("tasks")
      .select("*")
      .eq("project_id", project.id)
      .eq("visible_to_client", true)
      .order("created_at", { ascending: false });
    visibleTasks = tasks || [];
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-foreground">Tareas</h1>
      <ClientTasksFilter tasks={visibleTasks} />
    </div>
  );
}
