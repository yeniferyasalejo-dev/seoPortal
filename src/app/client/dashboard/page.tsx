import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { TaskList } from "@/components/dashboard/TaskList";
import { TrafficChart } from "@/components/charts/TrafficChart";
import { mockGA4, mockGSC } from "@/lib/mock-data";
import { createClient } from "@/lib/supabase/server";
import { Users, MousePointer, Eye, Target } from "lucide-react";

export default async function ClientDashboard() {
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
      .order("created_at", { ascending: false })
      .limit(5);
    visibleTasks = tasks || [];
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>

      {/* GA4/GSC metrics - mock until Google API connected */}
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard title="Sesiones" value={mockGA4.sessions} change={12.3} icon={Users} />
        <MetricCard title="Clics" value={mockGSC.clicks} change={8.1} icon={MousePointer} />
        <MetricCard title="Impresiones" value={mockGSC.impressions} change={15.2} icon={Eye} />
        <MetricCard title="Posicion prom." value={mockGSC.position} change={-2.4} icon={Target} format="position" />
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Trafico - Ultimos 30 dias</CardTitle>
        </CardHeader>
        <CardContent>
          <TrafficChart data={mockGA4.sessionsByDate} />
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Tareas recientes</CardTitle>
        </CardHeader>
        <CardContent>
          {visibleTasks.length > 0 ? (
            <TaskList tasks={visibleTasks} />
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No hay tareas asignadas aun.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
