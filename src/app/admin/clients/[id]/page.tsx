import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectStatusBadge } from "@/components/shared/StatusBadge";
import { TaskList } from "@/components/dashboard/TaskList";
import { TrafficChart } from "@/components/charts/TrafficChart";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { mockProjects, mockTasks, mockDocuments, mockGA4, mockGSC } from "@/lib/mock-data";
import { ArrowLeft, Users, MousePointer, Eye, Target, Download } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = mockProjects.find((p) => p.id === id) || mockProjects[0];
  const tasks = mockTasks.filter((t) => t.project_id === project.id);
  const documents = mockDocuments.filter((d) => d.project_id === project.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/clients">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{project.name}</h1>
          <p className="text-sm text-muted-foreground">{project.domain}</p>
        </div>
        <ProjectStatusBadge status={project.status} />
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard title="Sesiones" value={mockGA4.sessions} change={12.3} icon={Users} />
        <MetricCard title="Clics (GSC)" value={mockGSC.clicks} change={8.1} icon={MousePointer} />
        <MetricCard title="Impresiones" value={mockGSC.impressions} change={15.2} icon={Eye} />
        <MetricCard title="Posición promedio" value={mockGSC.position} change={-2.4} icon={Target} format="position" />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-secondary border border-border">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="tasks">Tareas ({tasks.length})</TabsTrigger>
          <TabsTrigger value="documents">Documentos ({documents.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Tráfico - Últimos 30 días</CardTitle>
            </CardHeader>
            <CardContent>
              <TrafficChart data={mockGA4.sessionsByDate} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Tareas del proyecto</CardTitle>
            </CardHeader>
            <CardContent>
              <TaskList tasks={tasks} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Documentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">{doc.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {doc.type} · {formatDate(doc.created_at)}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
