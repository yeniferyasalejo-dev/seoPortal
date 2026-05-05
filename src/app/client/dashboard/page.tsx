import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { TaskList } from "@/components/dashboard/TaskList";
import { TrafficChart } from "@/components/charts/TrafficChart";
import { mockGA4, mockGSC, mockTasks } from "@/lib/mock-data";
import { Users, MousePointer, Eye, Target } from "lucide-react";

export default function ClientDashboard() {
  const visibleTasks = mockTasks
    .filter((t) => t.project_id === "1" && t.visible_to_client)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard title="Sesiones" value={mockGA4.sessions} change={12.3} icon={Users} />
        <MetricCard title="Clics" value={mockGSC.clicks} change={8.1} icon={MousePointer} />
        <MetricCard title="Impresiones" value={mockGSC.impressions} change={15.2} icon={Eye} />
        <MetricCard title="Posición prom." value={mockGSC.position} change={-2.4} icon={Target} format="position" />
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Tráfico - Últimos 30 días</CardTitle>
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
          <TaskList tasks={visibleTasks} />
        </CardContent>
      </Card>
    </div>
  );
}
