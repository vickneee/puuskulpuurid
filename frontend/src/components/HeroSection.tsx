import hero from "@/assets/hero-new.jpg";
import { useLanguage } from "@/lib/i18n";

interface HeroSectionProps {
  onViewGallery: () => void;
}

const HeroSection = ({ onViewGallery }: HeroSectionProps) => {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center brightness-55"
        style={{ backgroundImage: `url(${hero})` }}
      />
      <div className="absolute inset-0" />
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold dark:text-white text-white mb-6 animate-fade-up">
          {t("hero.title")}
        </h1>
        <p
          className="font-body text-lg md:text-xl dark:text-white text-white mb-10 max-w-xl mx-auto animate-fade-up"
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
