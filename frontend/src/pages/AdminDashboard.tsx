import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/contexts/useAdmin";
import {
  getGalleryItems, addGalleryItem, updateGalleryItem,
  deleteGalleryItem, getCategories, saveCategories, type GalleryItem
} from "@/data/galleryData";
import { Plus, Pencil, Trash2, LogOut, Tag, Image, ArrowLeft, X, Star } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/lib/i18n";

const AdminDashboard = () => {
  const { isAdmin, loading: authLoading, logout } = useAdmin();
  const navigate = useNavigate();
  const { t, tCategory } = useLanguage();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<"photos" | "categories">("photos");
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const [formTitle, setFormTitle] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formFile, setFormFile] = useState<File | null>(null);
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formFeatured, setFormFeatured] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!isAdmin) { navigate("/admin/login", { replace: true }); return; }
    const load = async () => {
      try {
        const [fetchedItems, fetchedCats] = await Promise.all([
          getGalleryItems(),
          getCategories(),
        ]);
        setItems(fetchedItems);
        setCategories(fetchedCats);
      } catch {
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [authLoading, isAdmin, navigate]);

  const resetForm = () => {
    setFormTitle(""); setFormDesc(""); setFormCategory("");
    setFormFile(null); setFormImageUrl(""); setFormFeatured(false);
    setEditingItem(null); setShowForm(false);
  };

  const openAddForm = () => {
    resetForm();
    setFormCategory(categories[0] || "");
    setShowForm(true);
  };

  const openEditForm = (item: GalleryItem) => {
    setEditingItem(item);
    setFormTitle(item.title);
    setFormDesc(item.description);
    setFormCategory(item.category);
    setFormImageUrl(item.src);
    setFormFeatured(!!item.featured);
    setShowForm(true);
  };

  const handleSaveItem = async () => {
    if (!formTitle.trim() || !formCategory.trim()) {
      toast.error(t("admin.toast.titleCategoryRequired"));
      return;
    }
    setSaving(true);
    try {
      if (editingItem) {
        await updateGalleryItem(
            editingItem.id,
            { title: formTitle, description: formDesc, category: formCategory, featured: formFeatured },
            formFile || undefined
        );
        const updated = getGalleryItems();
        setItems(updated);
        toast.success(t("admin.toast.photoUpdated"));
      } else {
        if (!formFile) { toast.error("Please select an image"); setSaving(false); return; }
        const newItem = await addGalleryItem(formFile, {
          title: formTitle,
          description: formDesc,
          category: formCategory,
          featured: formFeatured,
        });
        setItems((prev) => [...prev, newItem]);
        toast.success(t("admin.toast.photoAdded"));
      }
      resetForm();
    } catch {
      toast.error("Failed to save item");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteItem = async (id: number) => {
    try {
      await deleteGalleryItem(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      toast.success(t("admin.toast.photoDeleted"));
    } catch {
      toast.error("Failed to delete item");
    }
  };

  const handleAddCategory = async () => {
    const name = newCategory.trim();
    if (!name) return;
    if (categories.includes(name)) { toast.error(t("admin.toast.categoryExists")); return; }
    const updated = [...categories, name];
    setCategories(updated);
    saveCategories(updated);
    setNewCategory("");
    toast.success(t("admin.toast.categoryAdded"));
  };

  const handleDeleteCategory = async (cat: string) => {
    const updated = categories.filter((c) => c !== cat);
    setCategories(updated);
    saveCategories(updated);
    toast.success(t("admin.toast.categoryRemoved"));
  };

  const handleLogout = () => { logout(); navigate("/"); };

  if (authLoading || loading) return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="font-body text-muted-foreground">Loading...</p>
      </div>
  );

  return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-30 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-display text-xl font-bold text-foreground">{t("admin.dash.title")}</h1>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground font-body text-sm font-medium hover:brightness-95 transition-all">
            <LogOut className="w-4 h-4" /> {t("admin.dash.logout")}
          </button>
        </header>

        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex gap-2 mb-8">
            <button onClick={() => setTab("photos")} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-body text-sm font-medium transition-all ${tab === "photos" ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground hover:brightness-95"}`}>
              <Image className="w-4 h-4" aria-hidden="true" /> {t("admin.dash.tab.photos")} ({items.length})
            </button>
            <button onClick={() => setTab("categories")} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-body text-sm font-medium transition-all ${tab === "categories" ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground hover:brightness-95"}`}>
              <Tag className="w-4 h-4" /> {t("admin.dash.tab.categories")} ({categories.length})
            </button>
          </div>

          {tab === "photos" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-lg font-semibold text-foreground">{t("admin.dash.photos.manage")}</h2>
                  <button onClick={openAddForm} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent text-accent-foreground font-body text-sm font-semibold hover:brightness-110 transition-all">
                    <Plus className="w-4 h-4" /> {t("admin.dash.photos.add")}
                  </button>
                </div>

                {showForm && (
                    <div className="mb-8 p-6 rounded-lg bg-card border border-border shadow-card">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-display text-base font-semibold text-foreground">
                          {editingItem ? t("admin.dash.photos.edit") : t("admin.dash.photos.new")}
                        </h3>
                        <button onClick={resetForm} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <input value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder={t("admin.dash.form.title")}
                               className="w-full px-4 py-2.5 rounded-lg bg-background border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent text-sm" />
                        <select value={formCategory} onChange={(e) => setFormCategory(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg bg-background border border-border font-body text-foreground focus:outline-none focus:ring-2 focus:ring-accent text-sm">
                          {categories.map((c) => <option key={c} value={c}>{tCategory(c)}</option>)}
                        </select>
                        <div className="sm:col-span-2">
                          <input type="file" accept="image/*" onChange={(e) => setFormFile(e.target.files?.[0] || null)}
                                 className="w-full px-4 py-2.5 rounded-lg bg-background border border-border font-body text-foreground text-sm" />
                          {(formFile || formImageUrl) && (
                              <img src={formFile ? URL.createObjectURL(formFile) : formImageUrl}
                                   alt={formTitle || "Preview image"}
                                   className="mt-2 w-full h-40 object-cover rounded-lg" />
                          )}
                        </div>
                        <textarea value={formDesc} onChange={(e) => setFormDesc(e.target.value)} placeholder={t("admin.dash.form.description")} rows={3}
                                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent text-sm sm:col-span-2 resize-none" />
                        <label className="flex items-center gap-2 font-body text-sm text-foreground sm:col-span-2">
                          <input type="checkbox" checked={formFeatured} onChange={(e) => setFormFeatured(e.target.checked)} className="w-4 h-4 rounded border-border accent-accent" />
                          {t("admin.dash.form.featured")}
                        </label>
                      </div>
                      <div className="flex gap-3 mt-5">
                        <button onClick={handleSaveItem} disabled={saving}
                                className="px-6 py-2.5 rounded-lg bg-accent text-accent-foreground font-body text-sm font-semibold hover:brightness-110 transition-all disabled:opacity-50">
                          {saving ? "Saving..." : editingItem ? t("admin.dash.form.update") : t("admin.dash.form.save")}
                        </button>
                        <button onClick={resetForm} className="px-6 py-2.5 rounded-lg bg-secondary text-secondary-foreground font-body text-sm font-medium hover:brightness-95 transition-all">
                          {t("admin.dash.form.cancel")}
                        </button>
                      </div>
                    </div>
                )}

                <div className="space-y-3">
                  {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:shadow-card transition-shadow">
                        <img src={item.src} alt={item.title} className="w-16 h-16 rounded-md object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-display text-sm font-semibold text-foreground truncate">{item.title}</h4>
                            {item.featured && <Star className="w-3.5 h-3.5 text-accent shrink-0" />}
                          </div>
                          <p className="font-body text-xs text-muted-foreground truncate">{item.description}</p>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-body text-xs">{tCategory(item.category)}</span>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button onClick={() => openEditForm(item)} className="p-2 rounded-lg bg-secondary text-secondary-foreground hover:brightness-95 transition-all">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeleteItem(item.id)} className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                  ))}
                  {items.length === 0 && <p className="text-center py-12 font-body text-muted-foreground">{t("admin.dash.empty")}</p>}
                </div>
              </div>
          )}

          {tab === "categories" && (
              <div>
                <h2 className="font-display text-lg font-semibold text-foreground mb-6">{t("admin.dash.categories.manage")}</h2>
                <div className="flex gap-3 mb-6">
                  <input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder={t("admin.dash.categories.new")}
                         onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
                         className="flex-1 px-4 py-2.5 rounded-lg bg-card border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent text-sm" />
                  <button onClick={handleAddCategory} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-accent-foreground font-body text-sm font-semibold hover:brightness-110 transition-all">
                    <Plus className="w-4 h-4" /> {t("admin.dash.categories.add")}
                  </button>
                </div>
                <div className="space-y-2">
                  {categories.map((cat) => {
                    const count = items.filter((i) => i.category === cat).length;
                    return (
                        <div key={cat} className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
                          <div className="flex items-center gap-3">
                            <Tag className="w-4 h-4 text-accent" />
                            <span className="font-body text-sm font-medium text-foreground">{tCategory(cat)}</span>
                            <span className="font-body text-xs text-muted-foreground">({count} {t("admin.dash.categories.count")})</span>
                          </div>
                          <button onClick={() => handleDeleteCategory(cat)} className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                    );
                  })}
                </div>
              </div>
          )}
        </div>
      </div>
  );
};

export default AdminDashboard;
