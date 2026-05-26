import { useState } from "react";
import type { GalleryItem } from "@/data/galleryData";
import { useLanguage } from "@/lib/i18n";
import ImageModal from "./ImageModal";

interface FeaturedProjectsProps {
  items?: GalleryItem[];
}

const FeaturedProjects = ({ items }: FeaturedProjectsProps) => {
  const { t, tCategory, tItem } = useLanguage();
  const featured = items && items.length > 0 ? items : [];
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  if (featured.length === 0) return null;

  return (
    <section className="section-padding pb-0 sm:pb-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-sm font-body font-semibold uppercase tracking-widest text-accent">
            {t("featured.kicker")}
          </span>
          <h2 className="section-title mt-2">{t("featured.title")}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {featured.map((item, idx) => (
            <div
              key={`${item.id}-${item.src}`}
              className="group rounded-lg overflow-hidden bg-card shadow-card hover-lift"
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => openModal(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openModal(idx);
                }}
                className="overflow-hidden aspect-4/3 cursor-pointer"
              >
                <img
                  src={item.src}
                  alt={tItem(item.id, "title", item.title)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-body font-semibold uppercase tracking-widest text-accent">
                  {tCategory(item.category)}
                </span>
                <h3 className="font-display text-xl font-semibold text-card-foreground mt-1 mb-2">
                  {tItem(item.id, "title", item.title)}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {tItem(item.id, "description", item.description)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ImageModal
        items={featured}
        currentIndex={currentIndex}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onNavigate={setCurrentIndex}
      />
    </section>
  );
};

export default FeaturedProjects;
