import { Brain, Database, Globe, ShieldCheck } from "lucide-react";
import { useLanguage, landingTranslations } from "@/hooks/useLanguage";

const featureIcons = [Brain, Database, Globe, ShieldCheck];

const AboutSection = () => {
  const { language } = useLanguage();
  const text = landingTranslations[language].about;

  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">{text.label}</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">{text.title}</h2>
          <p className="mt-4 text-muted-foreground">{text.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {text.features.map(([title, description], index) => {
            const Icon = featureIcons[index];
            return (
              <div key={title} className="flex gap-5 bg-card rounded-xl p-6 shadow-card-custom">
                <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
