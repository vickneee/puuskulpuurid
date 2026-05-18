import { useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryItem } from "@/data/galleryData";
import { useLanguage } from "@/lib/i18n";

interface ImageModalProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const ImageModal = ({ items, currentIndex, isOpen, onClose, onNavigate }: ImageModalProps) => {
  const { tItem } = useLanguage();
  const item = items[currentIndex];

  const handlePrev = useCallback(() => {
    onNavigate((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-foreground/80 backdrop-blur-sm animate-zoom-in"
        onClick={onClose}
      />

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-2 rounded-full bg-card/20 text-primary-foreground hover:bg-card/40 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev */}
      <button
        onClick={handlePrev}
        className="absolute left-4 md:left-8 z-50 p-2 rounded-full bg-card/20 text-primary-foreground hover:bg-card/40 transition-colors"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      {/* Next */}
      <button
        onClick={handleNext}
        className="absolute right-4 md:right-8 z-50 p-2 rounded-full bg-card/20 text-primary-foreground hover:bg-card/40 transition-colors"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* Content */}
      <div className="relative z-40 max-w-4xl w-full mx-4 animate-zoom-in">
        <img
          src={item.src}
          alt={tItem(item.id, "title", item.title)}
          className="w-full max-h-[70vh] object-contain rounded-lg"
        />
        <div className="mt-4 text-center">
          <h3 className="font-display text-2xl font-semibold text-primary-foreground">
            {tItem(item.id, "title", item.title)}
          </h3>
          <p className="font-body text-primary-foreground/70 mt-1 max-w-lg mx-auto">
            {tItem(item.id, "description", item.description)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
