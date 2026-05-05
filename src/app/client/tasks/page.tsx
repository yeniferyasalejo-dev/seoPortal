"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskList } from "@/components/dashboard/TaskList";
import { mockTasks } from "@/lib/mock-data";

export default function ClientTasksPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const visibleTasks = mockTasks.filter(
    (t) => t.project_id === "1" && t.visible_to_client
  );

  const filtered = visibleTasks.filter((t) => {
    if (statusFilter !== "all" && t.status !== statusFilter) return false;
    return true;
  });

  const completed = visibleTasks.filter((t) => t.status === "completado").length;
  const progress = visibleTasks.length > 0 ? (completed / visibleTasks.length) * 100 : 0;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-foreground">Tareas</h1>

      <Card className="bg-card border-border">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Progreso del proyecto</p>
            <p className="text-sm font-medium text-foreground">
              {completed}/{visibleTasks.length} completadas
            </p>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "all")}>
          <SelectTrigger className="w-[180px] bg-secondary border-border">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="pendiente">Pendiente</SelectItem>
            <SelectItem value="en_progreso">En progreso</SelectItem>
            <SelectItem value="completado">Completado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          {filtered.length > 0 ? (
            <TaskList tasks={filtered} />
          ) : (
            <p className="text-center text-sm text-muted-foreground py-8">
              No hay tareas con estos filtros.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
