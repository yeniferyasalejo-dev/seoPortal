import Link from "next/link";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectStatusBadge } from "@/components/shared/StatusBadge";
import { TaskList } from "@/components/dashboard/TaskList";
import { TrafficChart } from "@/components/charts/TrafficChart";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { mockGA4, mockGSC } from "@/lib/mock-data";
import { createClient } from "@/lib/supabase/server";
import { ArrowLeft, Users, MousePointer, Eye, Target, Download } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("*, client:profiles!projects_client_id_fkey(*)")
    .eq("id", id)
    .single();

  if (!project) {
    redirect("/admin/clients");
  }

  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("project_id", id)
    .order("created_at", { ascending: false });

  const { data: documents } = await supabase
    .from("documents")
    .select("*")
    .eq("project_id", id)
    .order("created_at", { ascending: false });

  const allTasks = tasks || [];
  const allDocuments = documents || [];

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

      {/* GA4/GSC metrics - still mock until Google API is connected */}
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard title="Sesiones" value={mockGA4.sessions} change={12.3} icon={Users} />
        <MetricCard title="Clics (GSC)" value={mockGSC.clicks} change={8.1} icon={MousePointer} />
        <MetricCard title="Impresiones" value={mockGSC.impressions} change={15.2} icon={Eye} />
        <MetricCard title="Posicion promedio" value={mockGSC.position} change={-2.4} icon={Target} format="position" />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-secondary border border-border">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="tasks">Tareas ({allTasks.length})</TabsTrigger>
          <TabsTrigger value="documents">Documentos ({allDocuments.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Trafico - Ultimos 30 dias</CardTitle>
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
              {allTasks.length > 0 ? (
                <TaskList tasks={allTasks} />
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No hay tareas para este proyecto.
                </p>
              )}
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
                {allDocuments.map((doc) => (
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
                {allDocuments.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No hay documentos para este proyecto.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
