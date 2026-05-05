"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface KeywordsChartProps {
  data: { query: string; clicks: number; impressions: number; position: number }[];
}

export function KeywordsChart({ data }: KeywordsChartProps) {
  const top = data.slice(0, 10);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={top} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
        <XAxis type="number" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          type="category"
          dataKey="query"
          stroke="#9ca3af"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          width={160}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            color: "#111",
          }}
        />
        <Bar dataKey="clicks" fill="#16a34a" radius={[0, 4, 4, 0]} name="Clics" />
      </BarChart>
    </ResponsiveContainer>
  );
}
