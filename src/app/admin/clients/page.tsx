import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProjectStatusBadge } from "@/components/shared/StatusBadge";
import { createClient } from "@/lib/supabase/server";
import { Plus, ExternalLink } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function ClientsPage() {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("*, client:profiles!projects_client_id_fkey(*)")
    .order("created_at", { ascending: false });

  const allProjects = projects || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Clientes</h1>
        <Link href="/admin/clients/new">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Cliente
          </Button>
        </Link>
      </div>

      <Card className="bg-card border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Proyecto</TableHead>
                <TableHead className="text-muted-foreground">Dominio</TableHead>
                <TableHead className="text-muted-foreground">Cliente</TableHead>
                <TableHead className="text-muted-foreground">Inicio</TableHead>
                <TableHead className="text-muted-foreground">Estado</TableHead>
                <TableHead className="text-muted-foreground text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allProjects.map((project) => (
                <TableRow key={project.id} className="border-border">
                  <TableCell className="font-medium text-foreground">
                    {project.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {project.domain}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {project.client?.full_name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {project.start_date ? formatDate(project.start_date) : "—"}
                  </TableCell>
                  <TableCell>
                    <ProjectStatusBadge status={project.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/admin/clients/${project.id}`}>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
              {allProjects.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No hay clientes aun. Crea tu primer cliente.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
