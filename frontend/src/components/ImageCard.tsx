import type { GalleryItem } from "@/data/galleryData";
import { useLanguage } from "@/lib/i18n";

interface ImageCardProps {
  item: GalleryItem;
  onClick: () => void;
}

const ImageCard = ({ item, onClick }: ImageCardProps) => {
  const { tCategory, tItem } = useLanguage();
  return (
    <button
      onClick={onClick}
      className="group block w-full text-left rounded-lg overflow-hidden bg-card shadow-card hover-lift focus:outline-none focus:ring-2 focus:ring-accent,
      backdrop-blur-md, transition-shadow duration-300"
    >
      <div className="overflow-hidden">
        <img
          src={item.src}
          alt={tItem(item, "title", item.title)}
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110 rounded-lg"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <span className="text-xs font-body font-semibold uppercase tracking-widest text-accent">
          {tCategory(item.category)}
        </span>
        <h3 className="font-display text-base font-semibold text-card-foreground mt-1">
          {tItem(item, "title", item.title)}
        </h3>
      </div>
    </button>
  );
};

export default ImageCard;
