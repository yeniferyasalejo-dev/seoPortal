import { Button } from "@/components/ui/button";
import { TasksFilter } from "@/components/admin/TasksFilter";
import { createClient } from "@/lib/supabase/server";
import { Plus } from "lucide-react";

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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Tareas</h1>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Nueva Tarea
        </Button>
      </div>

      <TasksFilter tasks={tasks || []} projects={projects || []} />
    </div>
  );
}
