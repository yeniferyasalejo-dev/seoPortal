import { CheckCircle2, Upload, FileText, BarChart3 } from "lucide-react";

const activities = [
  { icon: CheckCircle2, text: "Auditoría técnica completada", project: "Tpaga Studio", time: "Hace 2 días", color: "text-success" },
  { icon: Upload, text: "Reporte mensual subido", project: "Tpaga Studio", time: "Hace 3 días", color: "text-blue-400" },
  { icon: BarChart3, text: "Métricas GA4 actualizadas", project: "Dental Pro", time: "Hace 5 días", color: "text-primary" },
  { icon: FileText, text: "Propuesta SEO enviada", project: "FitLife Gym", time: "Hace 1 semana", color: "text-warning" },
];

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity, i) => (
        <div key={i} className="flex items-start gap-3">
          <activity.icon className={`h-4 w-4 mt-0.5 ${activity.color}`} />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-foreground">{activity.text}</p>
            <p className="text-xs text-muted-foreground">
              {activity.project} · {activity.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
