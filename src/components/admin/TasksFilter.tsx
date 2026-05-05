"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskStatusBadge } from "@/components/shared/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Plus, EyeOff } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Task, Project } from "@/types";

const priorityColors: Record<string, string> = {
  alta: "bg-destructive/15 text-destructive border-destructive/30",
  media: "bg-warning/15 text-warning border-warning/30",
  baja: "bg-muted text-muted-foreground border-border",
};

export function TasksFilter({
  tasks,
  projects,
}: {
  tasks: Task[];
  projects: Project[];
}) {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [projectFilter, setProjectFilter] = useState<string>("all");

  const filtered = tasks.filter((t) => {
    if (statusFilter !== "all" && t.status !== statusFilter) return false;
    if (projectFilter !== "all" && t.project_id !== projectFilter) return false;
    return true;
  });

  return (
    <>
      <div className="flex gap-3">
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "all")}>
          <SelectTrigger className="w-[180px] bg-secondary border-border">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="pendiente">Pendiente</SelectItem>
            <SelectItem value="en_progreso">En progreso</SelectItem>
            <SelectItem value="completado">Completado</SelectItem>
            <SelectItem value="cancelado">Cancelado</SelectItem>
          </SelectContent>
        </Select>
        <Select value={projectFilter} onValueChange={(v) => setProjectFilter(v ?? "all")}>
          <SelectTrigger className="w-[180px] bg-secondary border-border">
            <SelectValue placeholder="Proyecto" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los proyectos</SelectItem>
            {projects.map((p) => (
              <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="bg-card border-border">
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {filtered.map((task) => {
              const project = projects.find((p) => p.id === task.project_id);
              return (
                <div key={task.id} className="flex items-center justify-between p-4">
                  <div className="flex-1 min-w-0 mr-4">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{task.title}</p>
                      {!task.visible_to_client && (
                        <EyeOff className="h-3 w-3 text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {project?.name}
                      {task.due_date && ` · Vence: ${formatDate(task.due_date)}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="outline" className={`text-xs ${priorityColors[task.priority]}`}>
                      {task.priority}
                    </Badge>
                    <TaskStatusBadge status={task.status} />
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <p className="p-8 text-center text-sm text-muted-foreground">
                No hay tareas con estos filtros.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
