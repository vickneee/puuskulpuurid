import hero from "@/assets/hero-new.jpg";
import { useLanguage } from "@/lib/i18n";

interface HeroSectionProps {
  onViewGallery: () => void;
}

const HeroSection = ({ onViewGallery }: HeroSectionProps) => {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Render the hero image as a real <img> so the browser can discover it in the DOM
          and treat it as the LCP candidate. Use eager loading and high fetch priority. */}
      <img
        src={hero}
        alt="Puuskulptuurid - käsitsi valmistatud puidust skulptuur"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover brightness-55"
      />
      <div className="absolute inset-0" />
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold dark:text-white text-white mb-6 animate-fade-up">
          {t("hero.title")}
        </h1>
        <p
          className="font-body text-md md:text-lg lg:text-xl dark:text-white text-white mb-10 max-w-xl mx-auto animate-fade-up"
          style={{ animationDelay: "0.15s" }}
        >
          {t("hero.subtitle")}
        </p>
        <button
          onClick={onViewGallery}
          className="animate-fade-up inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-accent dark:text-white text-white font-body font-semibold text-base tracking-wide transition-all duration-300 hover:brightness-110 hover:shadow-card-hover"
          style={{ animationDelay: "0.3s" }}
        >
          {t("hero.cta")}
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
