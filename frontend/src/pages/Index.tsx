import { useRef, useCallback, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GalleryGrid from "@/components/GalleryGrid";
import AboutSection from "@/components/AboutSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { getGalleryItems, type GalleryItem } from "@/data/galleryData";
import { useLanguage } from "@/lib/i18n";

const Index = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const loadItems = async () => {
      try {
        const fetched = await getGalleryItems();
        if (!cancelled) setItems(fetched);
      } catch {
        if (!cancelled) setItems([]);
      }
    };

    loadItems();
    return () => {
      cancelled = true;
    };
  }, []);

  const scrollTo = useCallback((section: string) => {
    const targetRef =
      section === "hero"
        ? heroRef
        : section === "gallery"
          ? galleryRef
          : section === "about"
            ? aboutRef
            : section === "featured"
              ? featuredRef
              : contactRef;

    targetRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [aboutRef, contactRef, featuredRef, galleryRef, heroRef]);

  const featuredItems = items.filter((i) => i.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onNavigate={scrollTo} />

      <div ref={heroRef} className={"pt-16"}>
        <HeroSection onViewGallery={() => scrollTo("gallery")} />
      </div>

      <div ref={featuredRef}>
        <FeaturedProjects items={featuredItems} />
      </div>

      <div ref={galleryRef} className="section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-sm font-body font-semibold uppercase tracking-widest text-accent">
              {t("gallery.kicker")}
            </span>
            <h2 className="section-title mt-2">{t("gallery.title")}</h2>
          </div>
          <GalleryGrid items={items} />
        </div>
      </div>

      <div ref={aboutRef}>
        <AboutSection />
      </div>

      <div ref={contactRef}>
        <ContactSection />
      </div>

      <Footer />
    </div>
  );
};

export default Index;
