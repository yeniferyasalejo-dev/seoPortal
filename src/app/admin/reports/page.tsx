import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { Download, FileText } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function ReportsPage() {
  const supabase = await createClient();

  const { data: documents } = await supabase
    .from("documents")
    .select("*, project:projects(name)")
    .order("created_at", { ascending: false });

  const allDocs = documents || [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-foreground">Reportes y Documentos</h1>

      <Card className="bg-card border-border">
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {allDocs.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{doc.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {doc.project?.name} · {doc.type} · {formatDate(doc.created_at)}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {allDocs.length === 0 && (
              <p className="p-8 text-center text-sm text-muted-foreground">
                No hay documentos aun.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
