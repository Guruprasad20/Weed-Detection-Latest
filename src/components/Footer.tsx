import { Leaf } from "lucide-react";
import { useLanguage, landingTranslations } from "@/hooks/useLanguage";

const Footer = () => {
  const { language } = useLanguage();
  const text = landingTranslations[language].footer;

  return (
    <footer className="bg-forest py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-primary-foreground font-heading font-bold text-lg">
            <Leaf className="w-5 h-5" />
            Weed Vision AI
          </div>
          <div className="flex gap-6 text-sm text-primary-foreground/60">
            <a href="#home" className="hover:text-primary-foreground transition-colors">{text.home}</a>
            <a href="#how-it-works" className="hover:text-primary-foreground transition-colors">{text.how}</a>
            <a href="#classification" className="hover:text-primary-foreground transition-colors">{text.classification}</a>
            <a href="#upload" className="hover:text-primary-foreground transition-colors">{text.upload}</a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/40">
          © 2026 Weed Vision AI — {text.tagline}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
