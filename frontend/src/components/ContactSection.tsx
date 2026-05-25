import { Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const ContactSection = () => {
  const { t } = useLanguage();
  return (
    <section className="section-padding bg-card pt-4 sm:pt-16">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-sm font-body font-semibold uppercase tracking-widest text-accent">
          {t("contact.kicker")}
        </span>
        <h2 className="section-title mt-2 mb-4">{t("contact.title")}</h2>
        <p className="section-subtitle mx-auto mb-12">
          {t("contact.subtitle")}
        </p>

        <div className="grid sm:grid-cols-3 gap-8 mb-14">
          {[
            { icon: Mail, label: t("contact.email"), value: "jurivavulin@gmail.com" },
            { icon: Phone, label: t("contact.phone"), value: "+372 58 540 107" },
            { icon: MapPin, label: t("contact.workshop"), value: t("contact.workshop.value") },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <Icon className="w-5 h-5 text-accent" />
              </div>
              <span className="font-body text-sm font-semibold text-foreground">{label}</span>
              <span className="font-body text-sm text-muted-foreground">{value}</span>
            </div>
          ))}
        </div>

        <form className="max-w-lg mx-auto flex flex-col gap-4">
          <input
            type="text"
            placeholder={t("contact.form.name")}
            className="w-full px-5 py-3 rounded-lg bg-background border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-shadow"
          />
          <input
            type="email"
            placeholder={t("contact.form.email")}
            className="w-full px-5 py-3 rounded-lg bg-background border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-shadow"
          />
          <textarea
            placeholder={t("contact.form.message")}
            rows={4}
            className="w-full px-5 py-3 rounded-lg bg-background border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-shadow resize-none"
          />
          <button
            type="submit"
            className="w-full py-3.5 rounded-lg bg-accent text-white dark:text-white font-body font-semibold tracking-wide transition-all duration-300 hover:brightness-110"
          >
            {t("contact.form.send")}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
