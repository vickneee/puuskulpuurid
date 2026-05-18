import { useState } from "react";
import ImageCard from "./ImageCard";
import ImageModal from "./ImageModal";
import type { GalleryItem } from "@/data/galleryData";

interface GalleryGridProps {
  items: GalleryItem[];
}

const GalleryGrid = ({ items }: GalleryGridProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5">
        {items.map((item, index) => (
          <div key={item.id} className="break-inside-avoid">
            <ImageCard item={item} onClick={() => openModal(index)} />
          </div>
        ))}
      </div>

      <ImageModal
        items={items}
        currentIndex={currentIndex}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onNavigate={setCurrentIndex}
      />
    </>
  );
};

export default GalleryGrid;
