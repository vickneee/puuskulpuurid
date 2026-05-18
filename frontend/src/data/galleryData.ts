import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";

export interface GalleryItem {
  id: number;
  src: string;
  title: string;
  description: string;
  category: string;
  featured?: boolean;
}

const defaultItems: GalleryItem[] = [
  { id: 1, src: gallery1, title: "Walnut Cutting Board", description: "Hand-shaped cutting board crafted from premium walnut and maple wood with natural oil finish.", category: "Kitchen", featured: true },
  { id: 2, src: gallery2, title: "Cherry Wood Bowl", description: "Elegant hand-turned bowl carved from a single piece of cherry wood with a silky smooth finish.", category: "Tableware", featured: true },
  { id: 3, src: gallery3, title: "Reclaimed Wood Frame", description: "Rustic picture frame made from reclaimed barn wood, preserving the character of each plank.", category: "Decor" },
  { id: 4, src: gallery4, title: "Olive Wood Spoon Set", description: "A set of hand-carved cooking spoons made from sustainably sourced olive wood.", category: "Kitchen", featured: true },
  { id: 5, src: gallery5, title: "Walnut Jewelry Box", description: "Dovetail-jointed jewelry box in rich walnut with brass hardware and velvet lining.", category: "Storage" },
  { id: 6, src: gallery6, title: "Oak Desk Lamp", description: "Minimalist desk lamp sculpted from solid oak with an integrated warm LED light.", category: "Lighting" },
  { id: 7, src: gallery7, title: "Walnut Serving Tray", description: "Round serving tray with sculpted handles, finished with food-safe natural oils.", category: "Kitchen" },
  { id: 8, src: gallery8, title: "Artisan Coaster Set", description: "Set of four coasters made from different wood species, showcasing natural grain patterns.", category: "Tableware" },
];

const STORAGE_KEY = "woodcraft_gallery";
const CATEGORIES_KEY = "woodcraft_categories";

const defaultCategories = ["Kitchen", "Tableware", "Decor", "Storage", "Lighting"];

const readStorage = <T,>(key: string): T | null => {
  const stored = localStorage.getItem(key);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as T;
  } catch {
    return null;
  }
};

const writeStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Failed to read image file"));
    reader.readAsDataURL(file);
  });

const getNextId = (items: GalleryItem[]) =>
  items.reduce((max, item) => Math.max(max, item.id), 0) + 1;

export function getCategories(): string[] {
  const stored = readStorage<string[]>(CATEGORIES_KEY);
  if (stored) return stored;
  writeStorage(CATEGORIES_KEY, defaultCategories);
  return defaultCategories;
}

export function saveCategories(categories: string[]) {
  writeStorage(CATEGORIES_KEY, categories);
}

export function getGalleryItems(): GalleryItem[] {
  const stored = readStorage<GalleryItem[]>(STORAGE_KEY);
  if (stored) return stored;
  writeStorage(STORAGE_KEY, defaultItems);
  return defaultItems;
}

export function saveGalleryItems(items: GalleryItem[]) {
  writeStorage(STORAGE_KEY, items);
}

export async function addGalleryItem(
  file: File,
  data: Omit<GalleryItem, "id" | "src">,
): Promise<GalleryItem> {
  const items = getGalleryItems();
  const newItem: GalleryItem = {
    id: getNextId(items),
    src: await fileToDataUrl(file),
    ...data,
  };
  saveGalleryItems([...items, newItem]);
  return newItem;
}

export async function updateGalleryItem(
  id: number,
  updates: Partial<Omit<GalleryItem, "id" | "src">>,
  file?: File,
): Promise<GalleryItem> {
  const items = getGalleryItems();
  const existing = items.find((item) => item.id === id);

  if (!existing) {
    throw new Error("Gallery item not found");
  }

  const updatedItem: GalleryItem = {
    ...existing,
    ...updates,
    src: file ? await fileToDataUrl(file) : existing.src,
  };

  saveGalleryItems(items.map((item) => (item.id === id ? updatedItem : item)));
  return updatedItem;
}

export async function deleteGalleryItem(id: number) {
  const items = getGalleryItems();
  saveGalleryItems(items.filter((item) => item.id !== id));
}

