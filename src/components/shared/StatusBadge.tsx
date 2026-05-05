import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { TaskStatus, ProjectStatus } from "@/types";

const taskStatusConfig: Record<TaskStatus, { label: string; className: string }> = {
  pendiente: { label: "Pendiente", className: "bg-warning/15 text-warning border-warning/30" },
  en_progreso: { label: "En progreso", className: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
  completado: { label: "Completado", className: "bg-success/15 text-success border-success/30" },
  cancelado: { label: "Cancelado", className: "bg-muted text-muted-foreground border-border" },
};

const projectStatusConfig: Record<ProjectStatus, { label: string; className: string }> = {
  active: { label: "Activo", className: "bg-success/15 text-success border-success/30" },
  paused: { label: "Pausado", className: "bg-warning/15 text-warning border-warning/30" },
  completed: { label: "Completado", className: "bg-muted text-muted-foreground border-border" },
};

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  const config = taskStatusConfig[status];
  return (
    <Badge variant="outline" className={cn("text-xs", config.className)}>
      {config.label}
    </Badge>
  );
}

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  const config = projectStatusConfig[status];
  return (
    <Badge variant="outline" className={cn("text-xs", config.className)}>
      {config.label}
    </Badge>
  );
}
