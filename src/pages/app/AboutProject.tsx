import { Glass, PageHeader } from "@/components/Glass";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Target, Lightbulb, Rocket, Users, Award, BookOpen } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { dashboardText } from "@/lib/dashboard-translations";

const AboutProject = () => {
  const { language } = useLanguage();
  const t = (text: string) => dashboardText(language, text);

  return (
  <>
    <PageHeader title={t("About the Project")} subtitle={t("Smart Weed Detection System using AI, IoT & Computer Vision")} />

    <div className="grid lg:grid-cols-3 gap-4">
      <Card className="lg:col-span-2 bg-card/60 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" /> {t("Abstract")}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-relaxed text-muted-foreground space-y-3">
          <p>
            <strong className="text-foreground">Weed Vision AI</strong> {t("is an end-to-end smart agriculture platform that")}
            {" "}{t("combines deep learning, computer vision, IoT and drone monitoring to identify weed species in real time and")}
            {" "}{t("automate targeted herbicide spraying. The system reduces chemical usage by up to")} <strong className="text-primary">60%</strong>,
            {" "}{t("improves crop yield, and offers multilingual on-screen guidance.")}
          </p>
          <p>
            {t("A YOLOv8 detector locates weeds in field imagery, a MobileNetV2 classifier assigns species labels with 96% accuracy, and a recommendation engine maps each species to its optimal herbicide and dosage. An ESP32-based sprayer executes the action while sensors stream tank, pressure and weather data back to the cloud dashboard.")}
          </p>
        </CardContent>
      </Card>

      <Glass className="p-5">
        <h3 className="font-heading font-semibold flex items-center gap-2"><Award className="w-4 h-4 text-secondary" /> {t("Project Snapshot")}</h3>
        <dl className="text-sm mt-3 space-y-2">
          <div className="flex justify-between"><dt className="text-muted-foreground">{t("Type")}</dt><dd>{t("Final Year Major Project")}</dd></div>
          <div className="flex justify-between"><dt className="text-muted-foreground">{t("Domain")}</dt><dd>AI · IoT · {t("AgriTech")}</dd></div>
          <div className="flex justify-between"><dt className="text-muted-foreground">{t("Dataset")}</dt><dd>12,400 {t("images")}</dd></div>
          <div className="flex justify-between"><dt className="text-muted-foreground">{t("Model mAP")}</dt><dd className="text-primary font-semibold">91.7%</dd></div>
          <div className="flex justify-between"><dt className="text-muted-foreground">{t("Latency")}</dt><dd>~120 ms</dd></div>
        </dl>
      </Glass>
    </div>

    <div className="grid md:grid-cols-3 gap-4 mt-4">
      {[
        { icon: Target, title: "Objective", body: "Detect and classify weeds with high accuracy and trigger precise herbicide application." },
        { icon: Lightbulb, title: "Innovation", body: "Combines drone aerial imagery, ESP32 IoT spraying and multilingual dashboard support." },
        { icon: Rocket, title: "Impact", body: "Cuts pesticide cost up to 60%, raises yield, and reduces environmental damage." },
      ].map((b) => (
        <Glass key={b.title} className="p-5">
          <div className="w-10 h-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center mb-3">
            <b.icon className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-semibold">{t(b.title)}</h3>
          <p className="text-sm text-muted-foreground mt-1">{t(b.body)}</p>
        </Glass>
      ))}
    </div>

    <Card className="mt-4 bg-card/60 backdrop-blur">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5 text-primary" /> {t("Future Scope")}</CardTitle>
        <CardDescription>{t("Roadmap beyond the prototype")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="grid md:grid-cols-2 gap-3 text-sm text-muted-foreground list-disc pl-5">
          <li>{t("Edge inference on Jetson Nano for offline farms")}</li>
          <li>{t("Satellite imagery integration for large-scale mapping")}</li>
          <li>{t("Federated learning across multiple farm clusters")}</li>
          <li>{t("Soil & nutrient sensor fusion for prescription mapping")}</li>
          <li>{t("Robotic weeder integration for chemical-free farming")}</li>
          <li>{t("Government APMC market price recommendations")}</li>
        </ul>
      </CardContent>
    </Card>
  </>
  );
};

export default AboutProject;
