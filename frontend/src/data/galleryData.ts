import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";
import gallery9 from "@/assets/gallery-9.jpg";
import gallery10 from "@/assets/gallery-10.jpg";
import gallery11 from "@/assets/gallery-11.jpg";
import gallery12 from "@/assets/gallery-12.jpg";
import gallery13 from "@/assets/gallery-13.jpg";
import gallery14 from "@/assets/gallery-14.jpg";
import gallery15 from "@/assets/gallery-15.jpg";
import gallery16 from "@/assets/gallery-16.jpg";
import gallery17 from "@/assets/gallery-17.jpg";
import gallery18 from "@/assets/gallery-18.jpg";
import gallery19 from "@/assets/gallery-19.jpg";
import gallery20 from "@/assets/gallery-20.jpg";
import gallery21 from "@/assets/gallery-21.jpg";
import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    type DocumentData,
    type QueryDocumentSnapshot,
} from "firebase/firestore";
import {deleteObject, getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {hasFirebase, db, storage, auth} from "@/lib/firebase";

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
    {
        id: 1,
        src: gallery1,
        title: "Faun 3m",
        description: "Käsitsi loodud Faun. Kõrgus 3 meetrit.",
        category: "Characters",
        featured: true
    },
    {id: 2, src: gallery2, title: "Põder", description: "Käsitsi loodud põder.", category: "Animals", featured: true},
    {id: 3, src: gallery3, title: "Koerad", description: "Käsitsi loodud koerad.", category: "Animals"},
    {id: 4, src: gallery4, title: "Mulk", description: "Käsitsi nikerdatud Mulk.", category: "Figures", featured: true},
    {id: 5, src: gallery5, title: "Tiiger", description: "Käsitsi loodud tiiger.", category: "Animals"},
    {id: 6, src: gallery6, title: "Madu", description: "Puidust madu. Kõrgus 8 meetrit.", category: "Animals"},
    {
        id: 7,
        src: gallery7,
        title: "Ingel 3m",
        description: "Käsitsi loodud ingel. Üle 3 meetri kõrgune.",
        category: "Decor"
    },
    {
        id: 8,
        src: gallery8,
        title: "Ajalooline mees",
        description: "Käsitsi loodud ajalooline mees.",
        category: "Figures"
    },
    {id: 9, src: gallery9, title: "Kobras", description: "Puidust kobras.", category: "Animals"},
    {id: 10, src: gallery10, title: "Aia dekoratsioon", description: "Aia dekoratsioon.", category: "Decor"},
    {id: 11, src: gallery11, title: "Otepää künkad", description: "Otepää künkad.", category: "Decor"},
    {id: 12, src: gallery12, title: "Voodi", description: "Öökullidega voodi.", category: "Furniture"},
    {id: 13, src: gallery13, title: "Öökullid", description: "Öökullid.", category: "Animals"},
    {id: 14, src: gallery14, title: "Merineitsi", description: "Merineitsi.", category: "Decor"},
    {id: 15, src: gallery15, title: "Sarikas", description: "Sarikas.", category: "Decor"},
    {id: 16, src: gallery16, title: "Voodi", description: "Voodi karudega.", category: "Furniture"},
    {id: 17, src: gallery17, title: "Koer", description: "Puidust koer.", category: "Animals"},
    {id: 18, src: gallery18, title: "Koer", description: "Koer.", category: "Animals"},
    {id: 19, src: gallery19, title: "Sarikas", description: "Sarikas.", category: "Decor"},
    {id: 20, src: gallery20, title: "Koer", description: "Koer.", category: "Animals"},
    {id: 21, src: gallery21, title: "Voodi hirvega", description: "Voodi hirve ja põdraga.", category: "Furniture"},
];

const GALLERY_COLLECTION = "galleryItems";
const SETTINGS_COLLECTION = "siteContent";
const SETTINGS_DOC_ID = "gallery";

const defaultCategories = ["Animals", "Characters", "Decor", "Figures", "Furniture"];

const categoriesRef = db
    ? doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID)
    : null;

const toItem = (galleryDoc: QueryDocumentSnapshot<DocumentData> | {
    data: () => DocumentData;
    id?: string
}): GalleryItem => {
    const data = galleryDoc.data();
    const idFromDoc = Number(("id" in galleryDoc && typeof galleryDoc.id === "string") ? galleryDoc.id : NaN);
    const idFromData = Number(data.id);
    const resolvedId = Number.isFinite(idFromDoc) ? idFromDoc : (Number.isFinite(idFromData) ? idFromData : 0);

    return {
        id: resolvedId,
        src: String(data.src),
        title: String(data.title),
        description: String(data.description),
        category: String(data.category),
        featured: Boolean(data.featured),
        imagePath: typeof data.imagePath === "string" ? data.imagePath : undefined,
    };
};

const fetchBlob = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch image asset: ${response.status}`);
    }
    return response.blob();
};

const uploadImageFromSource = async (source: File | string, path: string) => {
    if (!storage) {
        throw new Error("Firebase Storage unavailable.");
    }
    const storageRef = ref(storage, path);
    const blob = typeof source === "string" ? await fetchBlob(source) : source;
    await uploadBytes(storageRef, blob);
    return getDownloadURL(storageRef);
};

const bustCache = (url: string) => {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}v=${Date.now()}`;
};

const makeStoragePath = (id: number, name: string) => {
    const cleanName = name.replace(/[^a-zA-Z0-9.\-_]/g, "-");
    return `gallery/${id}-${cleanName}`;
};

const getNextId = (items: GalleryItem[]) => {
    const used = new Set(items.map((item) => item.id));
    let candidate = 1;
    while (used.has(candidate)) candidate += 1;
    return candidate;
};

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
    const uid = auth?.currentUser?.uid ?? "none";

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
    if (!auth) {
        throw new Error("Firebase auth unavailable.");
    }
    const currentUser = auth?.currentUser;
    if (!currentUser) {
        throw new Error("You must be signed in as an admin before saving content.");
    }

    // Force Firebase Auth to refresh/attach a current token before Storage or
    // Firestore writes. This avoids a race where the dashboard opens before the
    // SDK has fully hydrated the authenticated session.
    await currentUser.getIdToken();
};

const withFriendlyWriteError = async <T, >(operation: () => Promise<T>) => {
    try {
        return await operation();
    } catch (error) {
        const message = buildWriteErrorMessage(error);
        console.error("Firebase write error", {
            code: getFirebaseErrorCode(error),
            uid: auth?.currentUser?.uid ?? null,
            email: auth?.currentUser?.email ?? null,
            error,
        });
        throw new Error(message, {cause: error});
    }
};

export async function getCategories(): Promise<string[]> {
    if (!hasFirebase || !db || !categoriesRef) {
        return defaultCategories;
    }

    const snapshot = await getDoc(categoriesRef).catch(() => null);
    if (!snapshot || !snapshot.exists()) return defaultCategories;
    const categories = snapshot.data()?.categories;
    return Array.isArray(categories) && categories.every((cat) => typeof cat === "string")
        ? categories
        : defaultCategories;
}

export async function saveCategories(categories: string[]) {
    if (!hasFirebase || !db || !categoriesRef) {
        throw new Error("Firebase disabled. Categories cannot be saved without a database connection.");
    }

    await requireAdminUser();
    await withFriendlyWriteError(() => setDoc(categoriesRef!, {categories}, {merge: true}));
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
    if (!hasFirebase || !db) {
        return defaultItems;
    }

    const snapshot = await getDocs(query(collection(db, GALLERY_COLLECTION))).catch(() => null);
    if (!snapshot || snapshot.empty) return defaultItems;
    return snapshot.docs
        .map((galleryDoc) => toItem(galleryDoc))
        .sort((a, b) => a.id - b.id);
}

export async function updateGalleryItem(
    id: number,
    updates: Partial<Omit<GalleryItem, "id" | "src">>,
    file?: File,
): Promise<GalleryItem> {
    if (!hasFirebase || !db) {
        throw new Error("Firebase disabled. Gallery items cannot be edited without a database connection.");
    }

    const itemRef = doc(db!, GALLERY_COLLECTION, String(id));
    const snapshot = await getDoc(itemRef);
    const existing = snapshot.exists() ? toItem({data: () => snapshot.data()!, id: snapshot.id}) : null;

    if (!existing) {
        throw new Error("Gallery item not found");
    }

    let src = existing.src;
    let imagePath = existing.imagePath;
    if (file) {
        const nextPath = makeStoragePath(id, file.name);
        await requireAdminUser();
      src = bustCache(await withFriendlyWriteError(() => uploadImageFromSource(file, nextPath)));
        imagePath = nextPath;
      if (existing.imagePath && existing.imagePath !== nextPath) {
            await deleteObject(ref(storage!, existing.imagePath)).catch(() => {
            });
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
    if (!hasFirebase || !db) {
        throw new Error("Firebase disabled. New gallery items cannot be added without a database connection.");
    }

    await requireAdminUser();
    const items = await getGalleryItems();
    const id = getNextId(items);
    const imagePath = makeStoragePath(id, file.name);
      const src = bustCache(await withFriendlyWriteError(() => uploadImageFromSource(file, imagePath)));
    const newItem: GalleryItem = {id, src, imagePath, ...data};
    await withFriendlyWriteError(() => setDoc(doc(db!, GALLERY_COLLECTION, String(id)), newItem));
    return newItem;
}

export async function deleteGalleryItem(id: number) {
    if (!hasFirebase || !db) {
        throw new Error("Firebase disabled. Gallery items cannot be deleted without a database connection.");
    }

    await requireAdminUser();
    const itemRef = doc(db!, GALLERY_COLLECTION, String(id));
    const snapshot = await getDoc(itemRef);
    if (snapshot.exists()) {
        const existing = toItem({data: () => snapshot.data()!, id: snapshot.id});
        if (existing.imagePath) {
            await withFriendlyWriteError(() => deleteObject(ref(storage!, existing.imagePath))).catch(() => {
            });
        }
        await withFriendlyWriteError(() => deleteDoc(itemRef));
    }
}
