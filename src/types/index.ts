export type UserRole = "admin" | "client";

export type ProjectStatus = "active" | "paused" | "completed";

export type TaskCategory =
  | "tecnico"
  | "contenido"
  | "enlaces"
  | "analytics"
  | "otro";

export type TaskStatus =
  | "pendiente"
  | "en_progreso"
  | "completado"
  | "cancelado";

export type TaskPriority = "alta" | "media" | "baja";

export type DocumentType = "propuesta" | "reporte" | "auditoria" | "otro";

export type MetricType = "ga4" | "gsc";

export type DateRange = "7d" | "30d" | "90d";

export interface Profile {
  id: string;
  full_name: string;
  role: UserRole;
  avatar_url: string | null;
  created_at: string;
}

export interface Project {
  id: string;
  name: string;
  domain: string;
  ga4_property_id: string | null;
  gsc_site_url: string | null;
  ga4_credentials: Record<string, unknown> | null;
  gsc_credentials: Record<string, unknown> | null;
  status: ProjectStatus;
  start_date: string | null;
  client_id: string | null;
  created_at: string;
  updated_at: string;
  client?: Profile;
}

export interface Task {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  category: TaskCategory;
  status: TaskStatus;
  priority: TaskPriority;
  assigned_to: string | null;
  due_date: string | null;
  visible_to_client: boolean;
  created_at: string;
  updated_at: string;
  project?: Project;
  assignee?: Profile;
}

export interface Document {
  id: string;
  project_id: string;
  title: string;
  type: DocumentType;
  file_url: string | null;
  content: string | null;
  visible_to_client: boolean;
  created_at: string;
  project?: Project;
}

export interface MetricsCache {
  id: string;
  project_id: string;
  metric_type: MetricType;
  date_range: DateRange;
  data: Record<string, unknown>;
  fetched_at: string;
}

export interface ActivityLog {
  id: string;
  project_id: string;
  user_id: string | null;
  action: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
  user?: Profile;
  project?: Project;
}

export interface GA4Metrics {
  sessions: number;
  totalUsers: number;
  screenPageViews: number;
  bounceRate: number;
  sessionsByDate: { date: string; sessions: number }[];
  topPages: { path: string; views: number }[];
}

export interface GSCMetrics {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  clicksByDate: { date: string; clicks: number; impressions: number }[];
  topQueries: { query: string; clicks: number; impressions: number; position: number }[];
  topPages: { page: string; clicks: number; impressions: number }[];
}
