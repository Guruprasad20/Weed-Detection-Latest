import { PageHeader } from "@/components/Glass";
import ContactSection from "@/components/ContactSection";
import { useLanguage } from "@/hooks/useLanguage";
import { dashboardText } from "@/lib/dashboard-translations";

const ContactPage = () => {
  const { language } = useLanguage();
  const t = (text: string) => dashboardText(language, text);

  return (
    <>
      <PageHeader title={t("Contact")} subtitle={t("Reach out to the Weed Vision AI team")} />
      <div className="-mx-4 md:-mx-6">
        <ContactSection />
      </div>
    </>
  );
};
export default ContactPage;
