import aboutMeImg from "@/assets/about-me.jpg";
import { useLanguage } from "@/lib/i18n";

const AboutSection = () => {
  const { t } = useLanguage();
  return (
    <section className="section-padding bg-card">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="overflow-hidden rounded-lg shadow-card">
          <img
            src={aboutMeImg}
            alt={t("about.imgAlt")}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <span className="text-sm font-body font-semibold uppercase tracking-widest text-accent">
            {t("about.kicker")}
          </span>
          <h2 className="section-title mt-2 mb-6">
            {t("about.title.l1")}<br />{t("about.title.l2")}
          </h2>
          <p className="font-body text-muted-foreground leading-relaxed mb-4">
            {t("about.p1")}
          </p>
          <p className="font-body text-muted-foreground leading-relaxed">
            {t("about.p2")}
          </p>
          <p className="font-display text-lg pt-3 text-foreground font-semibold leading-relaxed">
            {t("about.name")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
