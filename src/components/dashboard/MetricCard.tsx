import { Card, CardContent } from "@/components/ui/card";
import { cn, formatNumber, formatPercent } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: number;
  change: number;
  icon: React.ElementType;
  format?: "number" | "decimal" | "position";
}

export function MetricCard({ title, value, change, icon: Icon, format = "number" }: MetricCardProps) {
  const isPositive = change >= 0;

  const displayValue =
    format === "decimal"
      ? value.toFixed(1) + "%"
      : format === "position"
        ? value.toFixed(1)
        : formatNumber(value);

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{title}</p>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="mt-2 flex items-end gap-2">
          <p className="text-2xl font-semibold text-foreground">{displayValue}</p>
          <span
            className={cn(
              "flex items-center text-xs font-medium",
              isPositive ? "text-success" : "text-destructive"
            )}
          >
            {isPositive ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {formatPercent(change)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
