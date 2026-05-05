import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { TrafficChart } from "@/components/charts/TrafficChart";
import { ClicksChart } from "@/components/charts/ClicksChart";
import { KeywordsChart } from "@/components/charts/KeywordsChart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockGA4, mockGSC } from "@/lib/mock-data";
import { Users, MousePointer, Eye, Target, Percent, BarChart3 } from "lucide-react";
import { formatNumber } from "@/lib/utils";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-foreground">Analytics</h1>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <MetricCard title="Sesiones" value={mockGA4.sessions} change={12.3} icon={Users} />
        <MetricCard title="Usuarios" value={mockGA4.totalUsers} change={9.7} icon={Users} />
        <MetricCard title="Páginas vistas" value={mockGA4.screenPageViews} change={18.5} icon={Eye} />
        <MetricCard title="Clics (GSC)" value={mockGSC.clicks} change={8.1} icon={MousePointer} />
        <MetricCard title="CTR" value={mockGSC.ctr} change={1.2} icon={Percent} format="decimal" />
        <MetricCard title="Posición prom." value={mockGSC.position} change={-2.4} icon={Target} format="position" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Sesiones (GA4)</CardTitle>
          </CardHeader>
          <CardContent>
            <TrafficChart data={mockGA4.sessionsByDate} />
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Clics e Impresiones (GSC)</CardTitle>
          </CardHeader>
          <CardContent>
            <ClicksChart data={mockGSC.clicksByDate} />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Top Keywords</CardTitle>
        </CardHeader>
        <CardContent>
          <KeywordsChart data={mockGSC.topQueries} />
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Top 10 Páginas (GA4)</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Página</TableHead>
                  <TableHead className="text-muted-foreground text-right">Vistas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockGA4.topPages.map((page) => (
                  <TableRow key={page.path} className="border-border">
                    <TableCell className="text-foreground text-sm">{page.path}</TableCell>
                    <TableCell className="text-muted-foreground text-right text-sm">
                      {formatNumber(page.views)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Top Keywords (GSC)</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Keyword</TableHead>
                  <TableHead className="text-muted-foreground text-right">Clics</TableHead>
                  <TableHead className="text-muted-foreground text-right">Pos.</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockGSC.topQueries.map((q) => (
                  <TableRow key={q.query} className="border-border">
                    <TableCell className="text-foreground text-sm">{q.query}</TableCell>
                    <TableCell className="text-muted-foreground text-right text-sm">
                      {formatNumber(q.clicks)}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-right text-sm">
                      {q.position.toFixed(1)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
