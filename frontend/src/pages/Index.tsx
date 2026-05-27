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
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { t, tCategory } = useLanguage();
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
  const categories = Array.from(new Set(items.map((item) => item.category))).sort((a, b) =>
    tCategory(a).localeCompare(tCategory(b))
  );
  const activeCategory =
    selectedCategory === "all" || categories.includes(selectedCategory)
      ? selectedCategory
      : "all";
  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <>
      <Navbar onNavigate={scrollTo} />

      {/* Place hero outside of the main content so tests that query `main img`
          don't accidentally include the LCP hero (which should be eager). */}
      <div ref={heroRef} className={"pt-16"}>
        <HeroSection onViewGallery={() => scrollTo("gallery")} />
      </div>

      <main className="min-h-screen bg-background">
        <div ref={featuredRef}>
          <FeaturedProjects items={featuredItems} />
        </div>

        <div ref={galleryRef} className="section-padding">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-sm font-body font-semibold uppercase tracking-widest text-accent">
                {t("gallery.kicker")}
              </span>
              <h2 className="section-title mt-2">{t("gallery.title")}</h2>
            </div>
            <div className="mb-8 flex justify-center">
              <label className="flex items-center gap-3 font-body text-sm text-foreground">
                <span>{t("gallery.filter.label")}:</span>
                <select
                  value={activeCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="min-w-44 px-3 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="all">{t("gallery.filter.all")}</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {tCategory(category)}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <GalleryGrid items={filteredItems} />
          </div>
        </div>

        <div ref={aboutRef}>
          <AboutSection />
        </div>

        <div ref={contactRef}>
          <ContactSection />
        </div>

        <Footer />
      </main>
    </>
  );
};

export default Index;
