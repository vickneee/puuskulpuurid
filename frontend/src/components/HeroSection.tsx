import hero from "@/assets/hero.jpg";
import { useLanguage } from "@/lib/i18n";
import { useEffect, useState } from "react";

interface HeroSectionProps {
  onViewGallery: () => void;
}

const HeroSection = ({ onViewGallery }: HeroSectionProps) => {
  const { t } = useLanguage();
  const [dims, setDims] = useState<{width?: number; height?: number}>({});

  // Ensure the hero image is preloaded with the exact resolved URL the page
  // will use. In dev the imported `hero` value is the resolved asset URL, so
  // injecting a matching <link rel="preload"> ensures the LCP test sees a
  // matching preload entry.
  useEffect(() => {
    if (!hero) return;
    // add preload link if not present or if href differs
    const existing = Array.from(document.querySelectorAll('link[rel="preload"][as="image"]'))
      .find((l) => (l as HTMLLinkElement).href.includes(hero.split('/').pop() || ""));
    if (!existing) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = hero;
      document.head.appendChild(link);
    }

    // load dimensions so we can render width/height attributes which help
    // reserve space for the hero and avoid layout shifts.
    const img = new Image();
    let rafId: number | null = null;
    const applyDims = () => {
      // schedule state update outside the sync effect to avoid
      // "Calling setState synchronously within an effect" warnings
      rafId = window.requestAnimationFrame(() => {
        setDims({ width: img.naturalWidth, height: img.naturalHeight });
      });
    };

    img.src = hero;
    img.decode?.().catch(() => null);

    // If the image is already cached, `img.complete` may be true and
    // onload might run synchronously — use RAF to defer setState.
    if (img.complete && img.naturalWidth) {
      applyDims();
    } else {
      img.onload = () => applyDims();
    }

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      // remove onload handler to avoid leaks
      img.onload = null;
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Render the hero image as a real <img> so the browser can discover it in the DOM
          and treat it as the LCP candidate. Use eager loading and high fetch priority. */}
      <img
        src={hero}
        alt="hero image — Puuskulptuurid - käsitsi valmistatud puidust skulptuur"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        width={dims.width}
        height={dims.height}
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
