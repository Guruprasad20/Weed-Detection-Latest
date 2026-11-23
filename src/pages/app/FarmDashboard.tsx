import { Glass, PageHeader } from "@/components/Glass";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Activity, Sprout, Droplets, AlertTriangle, TrendingUp, Cpu, Plane, ScanLine,
} from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart,
  Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { dashboardText } from "@/lib/dashboard-translations";

const detections = [
  { day: "Mon", weeds: 24, healthy: 120 },
  { day: "Tue", weeds: 31, healthy: 132 },
  { day: "Wed", weeds: 18, healthy: 145 },
  { day: "Thu", weeds: 42, healthy: 138 },
  { day: "Fri", weeds: 29, healthy: 156 },
  { day: "Sat", weeds: 36, healthy: 162 },
  { day: "Sun", weeds: 22, healthy: 170 },
];

const species = [
  { name: "Crabgrass", value: 38 },
  { name: "Pigweed", value: 27 },
  { name: "Dandelion", value: 19 },
  { name: "Foxtail", value: 14 },
  { name: "Bindweed", value: 9 },
];

const colors = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(145 50% 55%)", "hsl(35 80% 60%)", "hsl(0 70% 60%)"];

type StatProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: string;
  accent: string;
};

const Stat = ({ icon: Icon, label, value, trend, accent }: StatProps) => (
  <Glass className="p-5">
    <div className="flex items-center justify-between">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${accent}`}>
        <Icon className="w-5 h-5" />
      </div>
      {trend && <span className="text-xs font-semibold text-primary flex items-center gap-1"><TrendingUp className="w-3 h-3" />{trend}</span>}
    </div>
    <div className="mt-3 font-heading text-3xl font-bold">{value}</div>
    <div className="text-xs text-muted-foreground mt-1">{label}</div>
  </Glass>
);

const FarmDashboard = () => {
  const { language } = useLanguage();
  const t = (text: string) => dashboardText(language, text);
  const chartDetections = detections.map((d) => ({ ...d, day: t(d.day) }));
  const chartSpecies = species.map((s) => ({ ...s, name: t(s.name) }));

  return (
  <>
    <PageHeader
      title={t("Farm Dashboard")}
      subtitle={t("Real-time overview of detection, spraying & crop health")}
      right={
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm"><Link to="/app/detection"><ScanLine className="w-4 h-4 mr-2" />{t("New Scan")}</Link></Button>
          <Button asChild size="sm"><Link to="/app/drone"><Plane className="w-4 h-4 mr-2" />{t("Drone Sweep")}</Link></Button>
        </div>
      }
    />

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Stat icon={Activity} label={t("Total Detections (7d)")} value="1,284" trend="+12%" accent="bg-primary/15 text-primary" />
      <Stat icon={Sprout} label={t("Crop Health Index")} value="92%" trend="+3%" accent="bg-accent text-accent-foreground" />
      <Stat icon={Droplets} label={t("Sprayer Usage")} value="14.6 L" trend="-8%" accent="bg-secondary/15 text-secondary" />
      <Stat icon={AlertTriangle} label={t("High-Risk Zones")} value="3" accent="bg-destructive/15 text-destructive" />
    </div>

    <div className="grid lg:grid-cols-3 gap-4 mt-4">
      <Card className="lg:col-span-2 bg-card/60 backdrop-blur">
        <CardHeader>
          <CardTitle>{t("Detection Trend")}</CardTitle>
          <CardDescription>{t("Weeds vs healthy crop scans (last 7 days)")}</CardDescription>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer>
            <AreaChart data={chartDetections}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Area type="monotone" dataKey="healthy" name={t("Healthy crop")} stroke="hsl(var(--primary))" fill="url(#g1)" />
              <Area type="monotone" dataKey="weeds" name={t("Weeds")} stroke="hsl(var(--secondary))" fill="url(#g2)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-card/60 backdrop-blur">
        <CardHeader>
          <CardTitle>{t("Top Species")}</CardTitle>
          <CardDescription>{t("Most detected weeds")}</CardDescription>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={chartSpecies} dataKey="value" nameKey="name" outerRadius={90} innerRadius={50} paddingAngle={2}>
                {chartSpecies.map((_, i) => <Cell key={i} fill={colors[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>

    <div className="grid lg:grid-cols-2 gap-4 mt-4">
      <Card className="bg-card/60 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Cpu className="w-5 h-5 text-primary" /> {t("Model Performance")}</CardTitle>
          <CardDescription>{t("YOLOv8 + MobileNetV2 classifier")}</CardDescription>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer>
            <BarChart data={[
              { m: "Accuracy", v: 96.2 }, { m: "Precision", v: 94.8 },
              { m: "Recall", v: 93.5 }, { m: "F1-Score", v: 94.1 }, { m: "mAP@0.5", v: 91.7 },
            ].map((item) => ({ ...item, m: t(item.m) }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="m" tick={{ fontSize: 11 }} />
              <YAxis domain={[80, 100]} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Bar dataKey="v" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-card/60 backdrop-blur">
        <CardHeader>
          <CardTitle>{t("Soil Moisture (24h)")}</CardTitle>
          <CardDescription>{t("IoT sensor stream from Field A")}</CardDescription>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer>
            <LineChart data={Array.from({ length: 24 }, (_, h) => ({ h: `${h}h`, m: 40 + Math.round(15 * Math.sin(h / 3) + (h % 5)) }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="h" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Line type="monotone" dataKey="m" stroke="hsl(var(--secondary))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  </>
  );
};

export default FarmDashboard;
