import { useLanguage, landingTranslations } from "@/hooks/useLanguage";

const stats = [
  { value: "98.5%" },
  { value: "50+" },
  { value: "<2s" },
  { value: "10K+" },
];

const StatsSection = () => {
  const { language } = useLanguage();
  const labels = landingTranslations[language].stats;

  return (
    <section className="py-16 bg-forest">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={stat.value} className="text-center">
              <p className="font-heading text-3xl md:text-4xl font-bold text-sunshine">{stat.value}</p>
              <p className="text-sm text-primary-foreground/70 mt-1">{labels[index]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
