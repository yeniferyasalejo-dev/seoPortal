import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import { Download, FileText } from "lucide-react";
import { formatDate } from "@/lib/utils";

const typeLabels: Record<string, string> = {
  propuesta: "Propuesta",
  reporte: "Reporte",
  auditoria: "Auditoria",
  otro: "Otro",
};

export default async function DocumentsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Get client's project
  const { data: project } = await supabase
    .from("projects")
    .select("id")
    .eq("client_id", user!.id)
    .single();

  let docs: any[] = [];
  if (project) {
    const { data: documents } = await supabase
      .from("documents")
      .select("*")
      .eq("project_id", project.id)
      .eq("visible_to_client", true)
      .order("created_at", { ascending: false });
    docs = documents || [];
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-foreground">Documentos</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {docs.map((doc) => (
          <Card key={doc.id} className="bg-card border-border">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{doc.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                      {typeLabels[doc.type] || doc.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(doc.created_at)}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-4 border-border text-muted-foreground hover:text-foreground"
              >
                <Download className="h-4 w-4 mr-2" />
                Descargar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {docs.length === 0 && (
        <p className="text-center text-sm text-muted-foreground py-12">
          Aun no hay documentos disponibles.
        </p>
      )}
    </div>
  );
}
