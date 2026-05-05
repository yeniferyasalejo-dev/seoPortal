import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProjectStatusBadge } from "@/components/shared/StatusBadge";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { createClient } from "@/lib/supabase/server";
import { Users, CheckSquare, FileText, TrendingUp, Plus } from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("*, client:profiles!projects_client_id_fkey(*)")
    .order("created_at", { ascending: false });

  const { data: tasks } = await supabase
    .from("tasks")
    .select("*");

  const { count: docCount } = await supabase
    .from("documents")
    .select("*", { count: "exact", head: true });

  const allProjects = projects || [];
  const allTasks = tasks || [];
  const activeTasks = allTasks.filter((t) => t.status !== "completado" && t.status !== "cancelado");
  const completedTasks = allTasks.filter((t) => t.status === "completado");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <Link href="/admin/clients/new">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Cliente
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card border-border">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Proyectos activos</p>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-2 text-2xl font-semibold text-foreground">
              {allProjects.filter((p) => p.status === "active").length}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Tareas pendientes</p>
              <CheckSquare className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-2 text-2xl font-semibold text-foreground">{activeTasks.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Tareas completadas</p>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-2 text-2xl font-semibold text-foreground">{completedTasks.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Documentos</p>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-2 text-2xl font-semibold text-foreground">{docCount || 0}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-foreground">Proyectos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {allProjects.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No hay proyectos aun. Crea tu primer cliente.
                </p>
              )}
              {allProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/admin/clients/${project.id}`}
                  className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-secondary transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{project.name}</p>
                    <p className="text-xs text-muted-foreground">{project.domain}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">
                      {project.client?.full_name}
                    </span>
                    <ProjectStatusBadge status={project.status} />
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Actividad reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
