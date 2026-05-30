import type { GalleryItem } from "@/data/galleryData";
import { useLanguage } from "@/lib/i18n";
import { useEffect, useState } from "react";

interface ImgProps {
  src: string;
  alt: string;
}

function ImageWithDims({ src, alt }: ImgProps) {
  const [dims, setDims] = useState<{ width?: number; height?: number }>({});

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.src = src;
    img.decode?.().catch(() => null);
    img.onload = () => {
      if (!cancelled) setDims({ width: img.naturalWidth, height: img.naturalHeight });
    };
    return () => {
      cancelled = true;
    };
  }, [src]);

  return (
    <div className="rounded-t-lg overflow-hidden">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        width={dims.width}
        height={dims.height}
        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>
  );
}

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
      <ImageWithDims src={item.src} alt={tItem(item, "title", item.title)} />
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
