import { Glass, PageHeader } from "@/components/Glass";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, PolarAngleAxis,
  PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { useLanguage } from "@/hooks/useLanguage";
import { dashboardText } from "@/lib/dashboard-translations";

const monthly = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  .map((m, i) => ({ m, weeds: 80 + Math.round(Math.sin(i / 2) * 40 + Math.random() * 30) }));

const radar = [
  { metric: "Accuracy", v: 96 }, { metric: "Precision", v: 95 },
  { metric: "Recall", v: 93 }, { metric: "F1", v: 94 }, { metric: "mAP", v: 92 }, { metric: "Speed", v: 90 },
];

// 8x12 farm heatmap (intensity 0..1)
const heat = Array.from({ length: 8 }, () =>
  Array.from({ length: 12 }, () => Math.round(Math.random() * 100) / 100));

const heatColor = (v: number) => `hsl(${145 - v * 145}, ${50 + v * 40}%, ${75 - v * 35}%)`;

const Analytics = () => {
  const { language } = useLanguage();
  const t = (text: string) => dashboardText(language, text);
  const chartMonthly = monthly.map((item) => ({ ...item, m: t(item.m) }));
  const chartRadar = radar.map((item) => ({ ...item, metric: t(item.metric) }));

  return (
  <>
    <PageHeader title={t("Farm Analytics")} subtitle={t("Detection trends, model metrics & farm-wide weed heatmap")} />

    <div className="grid lg:grid-cols-3 gap-4">
      <Card className="lg:col-span-2 bg-card/60 backdrop-blur">
        <CardHeader>
          <CardTitle>{t("Monthly Detections")}</CardTitle>
          <CardDescription>{t("Total weeds detected per month (current year)")}</CardDescription>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer>
            <BarChart data={chartMonthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="m" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Bar dataKey="weeds" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-card/60 backdrop-blur">
        <CardHeader>
          <CardTitle>{t("Model Radar")}</CardTitle>
          <CardDescription>{t("YOLOv8 + CNN performance")}</CardDescription>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer>
            <RadarChart data={chartRadar}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11 }} />
              <Radar dataKey="v" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.4} />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>

    <Card className="mt-4 bg-card/60 backdrop-blur">
      <CardHeader>
        <CardTitle>{t("Farm Heatmap")}</CardTitle>
        <CardDescription>{t("Weed density across 96 grid sectors (Field A · 4.2 acres)")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(12, minmax(0, 1fr))" }}>
          {heat.flatMap((row, ri) =>
            row.map((v, ci) => (
              <div key={`${ri}-${ci}`}
                className="aspect-square rounded-sm hover:scale-110 hover:z-10 transition cursor-pointer"
                style={{ background: heatColor(v) }}
                title={`${t("Sector")} ${String.fromCharCode(65 + ri)}${ci + 1} · ${(v * 100).toFixed(0)}% ${t("density")}`}
              />
            )),
          )}
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-4">
          <span>{t("Low density")}</span>
          <div className="flex-1 h-2 mx-4 rounded-full" style={{ background: "linear-gradient(90deg, hsl(145,90%,40%), hsl(35,80%,55%), hsl(0,80%,40%))" }} />
          <span>{t("High density")}</span>
        </div>
      </CardContent>
    </Card>

    <div className="grid lg:grid-cols-2 gap-4 mt-4">
      <Card className="bg-card/60 backdrop-blur">
        <CardHeader>
          <CardTitle>{t("Crop Health Trend")}</CardTitle>
          <CardDescription>{t("NDVI score over 30 days")}</CardDescription>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer>
            <LineChart data={Array.from({ length: 30 }, (_, d) => ({ d: d + 1, ndvi: 0.55 + 0.25 * Math.sin(d / 5) + Math.random() * 0.05 }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="d" tick={{ fontSize: 11 }} />
              <YAxis domain={[0.3, 1]} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Line type="monotone" dataKey="ndvi" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-card/60 backdrop-blur">
        <CardHeader>
          <CardTitle>{t("Dataset Distribution")}</CardTitle>
          <CardDescription>{t("Training samples per class · 12,400 images")}</CardDescription>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={[
                { name: "Crabgrass", value: 2800 }, { name: "Pigweed", value: 2400 },
                { name: "Dandelion", value: 2100 }, { name: "Foxtail", value: 1800 },
                { name: "Bindweed", value: 1500 }, { name: "Healthy crop", value: 1800 },
              ].map((item) => ({ ...item, name: t(item.name) }))} dataKey="value" nameKey="name" outerRadius={80} label={{ fontSize: 10 }}>
                {["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(145 50% 55%)", "hsl(35 80% 60%)", "hsl(0 70% 60%)", "hsl(200 60% 55%)"]
                  .map((c, i) => <Cell key={i} fill={c} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  </>
  );
};

export default Analytics;
