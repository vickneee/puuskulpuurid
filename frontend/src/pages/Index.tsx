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

  useEffect(() => {
    setItems(getGalleryItems());
    const handleStorage = () => setItems(getGalleryItems());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    gallery: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    featured: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  const scrollTo = useCallback((section: string) => {
    const ref = sectionRefs[section as keyof typeof sectionRefs];
    ref?.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const featuredItems = items.filter((i) => i.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onNavigate={scrollTo} />

      <div ref={sectionRefs.hero} className={"py-16"}>
        <HeroSection onViewGallery={() => scrollTo("gallery")} />
      </div>

      <div ref={sectionRefs.featured}>
        <FeaturedProjects items={featuredItems} />
      </div>

      <div ref={sectionRefs.gallery} className="section-padding">
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

      <div ref={sectionRefs.about}>
        <AboutSection />
      </div>

      <div ref={sectionRefs.contact}>
        <ContactSection />
      </div>

      <Footer />
    </div>
  );
};

export default Index;
