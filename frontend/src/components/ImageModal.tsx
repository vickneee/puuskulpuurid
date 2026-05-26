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

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    // Push two history states so back button works correctly:
    // 1. First, push a "base" state to anchor us to this page
    // 2. Then push the modal state
    // This way, back closes modal without leaving the page
    if (window.history.length === 1) {
      // If this is the first page load, push a base state first
      window.history.pushState({ type: "pageBase" }, "");
    }
    window.history.pushState({ type: "modalOpen" }, "");

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    const handlePopState = () => {
      // When popstate fires, we've gone back one entry
      // If modal is currently open (which it is), close it
      onClose();
    };

    window.addEventListener("keydown", handleKey);
    window.addEventListener("popstate", handlePopState, true);
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("popstate", handlePopState, true);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 9999999 }}>
      {/* Overlay: use page background so it follows light/dark theme (dark in dark mode) */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-zoom-in"
        onClick={onClose}
        style={{ zIndex: 9999998 }}
      />

      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 p-3 rounded-full bg-accent/40 text-popover-foreground hover:bg-accent/50 transition-colors pointer-events-auto"
        aria-label="Close image modal"
        style={{ zIndex: 10000000 }}
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev */}
      <button
        type="button"
        onClick={handlePrev}
        className="hidden md:block absolute left-4 md:left-8 p-2 rounded-full bg-popover/10 text-popover-foreground hover:bg-popover/20 transition-colors"
        style={{ zIndex: 9999999 }}
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      {/* Next */}
      <button
        type="button"
        onClick={handleNext}
        className="hidden md:block absolute right-4 md:right-8 p-2 rounded-full bg-popover/10 text-popover-foreground hover:bg-popover/20 transition-colors"
        style={{ zIndex: 9999999 }}
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* Content */}
      <div className="relative max-w-4xl w-full mx-4 animate-zoom-in" style={{ zIndex: 9999999 }}>
        {/* Keep rounded corners but preserve the image's intrinsic size/ratio. */}
        {/* Use popover background so the sheet follows the theme (light in light mode, dark in dark mode) */}
        <div className="max-h-[70vh] overflow-hidden rounded-lg bg-popover/95 flex items-center justify-center">
          <img
            src={item.src}
            alt={tItem(item, "title", item.title)}
            className="max-h-[70vh] max-w-[90vw] object-contain block"
          />
        </div>
        <div className="mt-4 text-center">
          <h3 className="font-display text-2xl font-semibold text-popover-foreground">
            {tItem(item, "title", item.title)}
          </h3>
          <p className="font-body text-popover-foreground/70 mt-1 max-w-lg mx-auto">
            {tItem(item, "description", item.description)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
