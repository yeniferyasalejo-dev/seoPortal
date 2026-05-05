import type { Task } from "@/types";
import { TaskStatusBadge } from "@/components/shared/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

const priorityColors: Record<string, string> = {
  alta: "bg-destructive/15 text-destructive border-destructive/30",
  media: "bg-warning/15 text-warning border-warning/30",
  baja: "bg-muted text-muted-foreground border-border",
};

export function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between rounded-lg border border-border bg-card p-3"
        >
          <div className="flex-1 min-w-0 mr-4">
            <p className="text-sm font-medium text-foreground truncate">
              {task.title}
            </p>
            {task.due_date && (
              <p className="text-xs text-muted-foreground mt-0.5">
                Vence: {formatDate(task.due_date)}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Badge variant="outline" className={`text-xs ${priorityColors[task.priority]}`}>
              {task.priority}
            </Badge>
            <TaskStatusBadge status={task.status} />
          </div>
        </div>
      ))}
    </div>
  );
}
