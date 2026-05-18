import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  type DocumentData,
} from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { auth } from "@/lib/firebase";

export interface GalleryItem {
  id: number;
  src: string;
  title: string;
  description: string;
  category: string;
  featured?: boolean;
  imagePath?: string;
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

const GALLERY_COLLECTION = "galleryItems";
const SETTINGS_COLLECTION = "siteContent";
const SETTINGS_DOC_ID = "gallery";

const defaultCategories = ["Kitchen", "Tableware", "Decor", "Storage", "Lighting"];

const categoriesRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID);

const toItem = (data: DocumentData): GalleryItem => ({
  id: Number(data.id),
  src: String(data.src),
  title: String(data.title),
  description: String(data.description),
  category: String(data.category),
  featured: Boolean(data.featured),
  imagePath: typeof data.imagePath === "string" ? data.imagePath : undefined,
});

const fetchBlob = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image asset: ${response.status}`);
  }
  return response.blob();
};

const uploadImageFromSource = async (source: File | string, path: string) => {
  const storageRef = ref(storage, path);
  const blob = typeof source === "string" ? await fetchBlob(source) : source;
  await uploadBytes(storageRef, blob);
  return getDownloadURL(storageRef);
};

const makeStoragePath = (id: number, name: string) => {
  const cleanName = name.replace(/[^a-zA-Z0-9.\-_]/g, "-");
  return `gallery/${id}-${cleanName}`;
};

const getNextId = (items: GalleryItem[]) =>
  items.reduce((max, item) => Math.max(max, item.id), 0) + 1;

const isPermissionError = (error: unknown) =>
  error instanceof Error && /(permission|cors|cross-origin)/i.test(error.message);

const getFirebaseErrorCode = (error: unknown) => {
  if (typeof error === "object" && error !== null && "code" in error) {
    const code = (error as { code?: unknown }).code;
    if (typeof code === "string") return code;
  }
  return null;
};

const isFirebasePermissionCode = (code: string | null) =>
  code === "storage/unauthorized" || code === "permission-denied" || code === "firestore/permission-denied";

const buildWriteErrorMessage = (error: unknown) => {
  const code = getFirebaseErrorCode(error);
  const uid = auth.currentUser?.uid ?? "none";

  if (isFirebasePermissionCode(code)) {
    return `Firebase denied the write (${code}). Signed-in uid: ${uid}. Confirm Storage/Firestore rules are published in the same project and bucket, then sign out/in and retry.`;
  }

  if (code === "storage/retry-limit-exceeded" || code === "storage/unknown" || isPermissionError(error)) {
    return `Upload failed (${code ?? "unknown"}). This is often a bucket CORS or network/preflight issue. Signed-in uid: ${uid}. Verify Storage CORS on your active bucket and retry.`;
  }

  if (error instanceof Error) return error.message;
  return "Failed to write to Firebase.";
};

const requireAdminUser = async () => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("You must be signed in as an admin before saving content.");
  }

  // Force Firebase Auth to refresh/attach a current token before Storage or
  // Firestore writes. This avoids a race where the dashboard opens before the
  // SDK has fully hydrated the authenticated session.
  await currentUser.getIdToken();
};

const withFriendlyWriteError = async <T,>(operation: () => Promise<T>) => {
  try {
    return await operation();
  } catch (error) {
    const message = buildWriteErrorMessage(error);
    console.error("Firebase write error", {
      code: getFirebaseErrorCode(error),
      uid: auth.currentUser?.uid ?? null,
      email: auth.currentUser?.email ?? null,
      error,
    });
    throw new Error(message, { cause: error });
  }
};

export async function getCategories(): Promise<string[]> {
  const snapshot = await getDoc(categoriesRef).catch(() => null);
  if (!snapshot || !snapshot.exists()) return defaultCategories;
  const categories = snapshot.data()?.categories;
  return Array.isArray(categories) && categories.every((cat) => typeof cat === "string")
    ? categories
    : defaultCategories;
}

export async function saveCategories(categories: string[]) {
  await requireAdminUser();
  await withFriendlyWriteError(() => setDoc(categoriesRef, { categories }, { merge: true }));
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const snapshot = await getDocs(query(collection(db, GALLERY_COLLECTION))).catch(() => null);
  if (!snapshot || snapshot.empty) return defaultItems;
  return snapshot.docs
    .map((galleryDoc) => toItem(galleryDoc.data()))
    .sort((a, b) => a.id - b.id);
}

export async function updateGalleryItem(
  id: number,
  updates: Partial<Omit<GalleryItem, "id" | "src">>,
  file?: File,
): Promise<GalleryItem> {
  const itemRef = doc(db, GALLERY_COLLECTION, String(id));
  const snapshot = await getDoc(itemRef);
  const existing = snapshot.exists() ? toItem(snapshot.data()) : null;

  if (!existing) {
    throw new Error("Gallery item not found");
  }

  let src = existing.src;
  let imagePath = existing.imagePath;
  if (file) {
    const nextPath = makeStoragePath(id, file.name);
    await requireAdminUser();
    src = await withFriendlyWriteError(() => uploadImageFromSource(file, nextPath));
    imagePath = nextPath;
    if (existing.imagePath) {
      await deleteObject(ref(storage, existing.imagePath)).catch(() => {});
    }
  }

  const updatedItem: GalleryItem = {
    ...existing,
    ...updates,
    src,
    imagePath,
  };

  await requireAdminUser();
  await withFriendlyWriteError(() => setDoc(itemRef, updatedItem));
  return updatedItem;
}

export async function addGalleryItem(
  file: File,
  data: Omit<GalleryItem, "id" | "src">,
): Promise<GalleryItem> {
  await requireAdminUser();
  const items = await getGalleryItems();
  const id = getNextId(items);
  const imagePath = makeStoragePath(id, file.name);
  const src = await withFriendlyWriteError(() => uploadImageFromSource(file, imagePath));
  const newItem: GalleryItem = { id, src, imagePath, ...data };
  await withFriendlyWriteError(() => setDoc(doc(db, GALLERY_COLLECTION, String(id)), newItem));
  return newItem;
}

export async function deleteGalleryItem(id: number) {
  await requireAdminUser();
  const itemRef = doc(db, GALLERY_COLLECTION, String(id));
  const snapshot = await getDoc(itemRef);
  if (snapshot.exists()) {
    const existing = toItem(snapshot.data());
    if (existing.imagePath) {
      await withFriendlyWriteError(() => deleteObject(ref(storage, existing.imagePath))).catch(() => {});
    }
    await withFriendlyWriteError(() => deleteDoc(itemRef));
  }
}

