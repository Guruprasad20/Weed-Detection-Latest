import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Reveal from "@/components/Reveal";
import { useLanguage, landingTranslations } from "@/hooks/useLanguage";

const FAQ = () => {
  const { language } = useLanguage();
  const text = landingTranslations[language].faq;

  return (
    <section id="faq" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-3xl">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">{text.label}</p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">{text.title}</h2>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <Accordion type="single" collapsible className="bg-card rounded-xl shadow-card-custom px-6">
            {text.items.map(([question, answer], index) => (
              <AccordionItem key={question} value={`item-${index}`}>
                <AccordionTrigger className="font-heading text-left">{question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
};

export default FAQ;
