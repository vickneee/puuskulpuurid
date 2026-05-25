import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "et" | "en" | "ru";

type Dict = Record<string, string>;
type Translations = Record<Lang, Dict>;

const translations: Translations = {
  et: {
    // Nav
    "nav.gallery": "Galerii",
    "nav.about": "Minust",
    "nav.featured": "Esiletõstetud",
    "nav.contact": "Kontakt",
    // Hero
    "hero.title": "Puuskulptuur",
    "hero.subtitle": "Käsitsi valmistatud puidust teosed, loodud kannatlikult, kirega ja austusega looduslike materjalide vastu.",
    "hero.cta": "Vaata galeriid",
    // Featured
    "featured.kicker": "Esiletõstetud",
    "featured.title": "Valitud tööd",
    // Gallery
    "gallery.kicker": "Portfoolio",
    "gallery.title": "Kõik tööd",
    // About
    "about.kicker": "Minust",
    "about.title.l1": "Käte all sündinud,",
    "about.title.l2": "kire poolt juhitud",
    "about.p1": "Üle 15-aastase kogemusega algab iga skulptuur hoolikalt valitud puidust ja sügavast lugupidamisest looduse vastu. Ühendan traditsioonilise puutööoskuse ja loomingulise käekirja, et luua tugevaid ja ajatuid puidust vorme.",
    "about.p2": "Iga teos kannab oma iseloomu — alates puidu struktuurist kuni käsitsi viimistletud detailideni. Ükski puuskulptuur ei ole täpselt teise sarnane, sest loodus ei korda end kunagi.",
    "about.name": "Juri Vavulin",
    "about.imgAlt": "Meister LOODUSES",
    // Contact
    "contact.kicker": "Võta ühendust",
    "contact.title": "Loome koos",
    "contact.subtitle": "Kas Teil on idee? Kirjutage julgelt ja toome Teie nägemuse puidust ellu.",
    "contact.email": "E-post",
    "contact.phone": "Telefon",
    "contact.workshop": "Töökoda",
    "contact.workshop.value": "Eesti",
    "contact.form.name": "Teie nimi",
    "contact.form.email": "Teie e-post",
    "contact.form.message": "Rääkige oma projektist...",
    "contact.form.send": "Saada sõnum",
    // Footer
    "footer.rights": "Kõik õigused kaitstud.",
    "footer.admin": "Admin",
    // Admin
    "admin.login.title": "Administraatori sisselogimine",
    "admin.login.subtitle": "Sisesta parool sisu haldamiseks",
    "admin.login.password": "Parool",
    "admin.login.signIn": "Logi sisse",
    "admin.login.back": "← Tagasi avalehele",
    "admin.login.demo": "Demo parool:",
    "admin.login.error": "Vale parool",
    // Admin dashboard
    "admin.dash.title": "Halduspaneel",
    "admin.dash.logout": "Logi välja",
    "admin.dash.tab.photos": "Fotod",
    "admin.dash.tab.categories": "Kategooriad",
    "admin.dash.photos.manage": "Halda fotosid",
    "admin.dash.photos.add": "Lisa foto",
    "admin.dash.photos.edit": "Muuda fotot",
    "admin.dash.photos.new": "Uus foto",
    "admin.dash.form.title": "Pealkiri *",
    "admin.dash.form.imageUrl": "Pildi URL (kleebi link)",
    "admin.dash.form.description": "Kirjeldus",
    "admin.dash.form.featured": "Esiletõstetud projekt",
    "admin.dash.form.update": "Uuenda",
    "admin.dash.form.save": "Lisa foto",
    "admin.dash.form.cancel": "Loobu",
    "admin.dash.empty": "Fotosid pole veel. Lisa esimene!",
    "admin.dash.categories.manage": "Halda kategooriaid",
    "admin.dash.categories.new": "Uue kategooria nimi",
    "admin.dash.categories.add": "Lisa",
    "admin.dash.categories.count": "fotot",
    "admin.toast.titleCategoryRequired": "Pealkiri ja kategooria on kohustuslikud",
    "admin.toast.photoUpdated": "Foto uuendatud",
    "admin.toast.photoAdded": "Foto lisatud",
    "admin.toast.photoDeleted": "Foto kustutatud",
    "admin.toast.categoryExists": "Kategooria on juba olemas",
    "admin.toast.categoryAdded": "Kategooria lisatud",
    "admin.toast.categoryRemoved": "Kategooria eemaldatud",
    // Categories
    "cat.Decor": "Dekoratsioon",
    "cat.Lighting": "Valgustus",
    "cat.Animals": "Loomad",
    "cat.Abstract": "Abstraktne",
    "cat.Persons": "Inimesed",
    "cat.Furniture": "Mööbel",
    // Theme
    "theme.toggle": "Vaheta teemat",
    "lang.label": "Keel",
  },
  en: {
    "nav.gallery": "Gallery",
    "nav.about": "About",
    "nav.featured": "Featured",
    "nav.contact": "Contact",
    "hero.title": "Wood Sculptures",
    "hero.subtitle": "Handmade wooden creations shaped with patience, passion, and respect for natural materials.",
    "hero.cta": "View Gallery",
    "featured.kicker": "Highlights",
    "featured.title": "Featured Projects",
    "gallery.kicker": "Portfolio",
    "gallery.title": "All Projects",
    "about.kicker": "About the Craftsman",
    "about.title.l1": "Shaped by Hand,",
    "about.title.l2": "Driven by Passion",
    "about.p1": "With over 15 years of experience, every piece begins with carefully selected timber and a deep respect for the natural grain. Working from a small workshop, I combine traditional joinery techniques with modern design sensibilities to create objects that are both functional and beautiful.",
    "about.p2": "Each creation tells a story — from the species of wood chosen to the hand-applied finish. No two pieces are ever alike, because nature never repeats itself.",
    "about.name": "Juri Vavulin",
    "about.imgAlt": "The craftsman at work",
    "contact.kicker": "Get in Touch",
    "contact.title": "Let's Create Together",
    "contact.subtitle": "Have a custom project in mind? I'd love to hear about it. Reach out and let's bring your vision to life in wood.",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.workshop": "Workshop",
    "contact.workshop.value": "Tallinn, Estonia",
    "contact.form.name": "Your Name",
    "contact.form.email": "Your Email",
    "contact.form.message": "Tell me about your project...",
    "contact.form.send": "Send Message",
    "footer.rights": "All rights reserved.",
    "footer.admin": "Admin",
    "admin.login.title": "Admin Login",
    "admin.login.subtitle": "Enter the admin password to manage content",
    "admin.login.password": "Password",
    "admin.login.signIn": "Sign In",
    "admin.login.back": "← Back to site",
    "admin.login.demo": "Demo password:",
    "admin.login.error": "Incorrect password",
    "admin.dash.title": "Admin Dashboard",
    "admin.dash.logout": "Logout",
    "admin.dash.tab.photos": "Photos",
    "admin.dash.tab.categories": "Categories",
    "admin.dash.photos.manage": "Manage Photos",
    "admin.dash.photos.add": "Add Photo",
    "admin.dash.photos.edit": "Edit Photo",
    "admin.dash.photos.new": "Add New Photo",
    "admin.dash.form.title": "Title *",
    "admin.dash.form.imageUrl": "Image URL (paste link)",
    "admin.dash.form.description": "Description",
    "admin.dash.form.featured": "Featured project",
    "admin.dash.form.update": "Update",
    "admin.dash.form.save": "Add Photo",
    "admin.dash.form.cancel": "Cancel",
    "admin.dash.empty": "No photos yet. Add your first one!",
    "admin.dash.categories.manage": "Manage Categories",
    "admin.dash.categories.new": "New category name",
    "admin.dash.categories.add": "Add",
    "admin.dash.categories.count": "photos",
    "admin.toast.titleCategoryRequired": "Title and category are required",
    "admin.toast.photoUpdated": "Photo updated",
    "admin.toast.photoAdded": "Photo added",
    "admin.toast.photoDeleted": "Photo deleted",
    "admin.toast.categoryExists": "Category already exists",
    "admin.toast.categoryAdded": "Category added",
    "admin.toast.categoryRemoved": "Category removed",
    "cat.Decor": "Decor",
    "cat.Lighting": "Lighting",
    "cat.Animals": "Animals",
    "cat.Abstract": "Abstract",
    "cat.Persons": "Persons",
    "cat.Furniture": "Furniture",
    "theme.toggle": "Toggle theme",
    "lang.label": "Language",
  },
  ru: {
    "nav.gallery": "Галерея",
    "nav.about": "Обо мне",
    "nav.featured": "Избранное",
    "nav.contact": "Контакты",
    "hero.title": "Деревянные скульптуры",
    "hero.subtitle": "Изделия ручной работы из дерева, созданные с терпением, страстью и уважением к природным материалам.",
    "hero.cta": "Смотреть галерею",
    "featured.kicker": "Избранное",
    "featured.title": "Избранные работы",
    "gallery.kicker": "Портфолио",
    "gallery.title": "Все работы",
    "about.kicker": "О мастере",
    "about.title.l1": "Создано руками,",
    "about.title.l2": "ведомо страстью",
    "about.p1": "Имея более 15 лет опыта, каждое изделие начинается с тщательно отобранной древесины и глубокого уважения к её природной фактуре. Работая в небольшой мастерской, я сочетаю традиционные столярные техники с современным дизайном, создавая предметы, одновременно функциональные и красивые.",
    "about.p2": "Каждое изделие рассказывает свою историю — от выбранной породы дерева до отделки, нанесённой вручную. Двух одинаковых работ не бывает, ведь природа никогда не повторяется.",
    "about.name": "Juri Vavulin",
    "about.imgAlt": "Мастер за работой",
    "contact.kicker": "Связаться",
    "contact.title": "Создадим вместе",
    "contact.subtitle": "Есть идея для индивидуального проекта? Напишите — и воплотим вашу идею в дереве.",
    "contact.email": "Эл. почта",
    "contact.phone": "Телефон",
    "contact.workshop": "Мастерская",
    "contact.workshop.value": "Таллинн, Эстония",
    "contact.form.name": "Ваше имя",
    "contact.form.email": "Ваша эл. почта",
    "contact.form.message": "Расскажите о вашем проекте...",
    "contact.form.send": "Отправить",
    "footer.rights": "Все права защищены.",
    "footer.admin": "Админ",
    "admin.login.title": "Вход для администратора",
    "admin.login.subtitle": "Введите пароль для управления контентом",
    "admin.login.password": "Пароль",
    "admin.login.signIn": "Войти",
    "admin.login.back": "← На главную",
    "admin.login.demo": "Демо-пароль:",
    "admin.login.error": "Неверный пароль",
    "admin.dash.title": "Панель администратора",
    "admin.dash.logout": "Выйти",
    "admin.dash.tab.photos": "Фото",
    "admin.dash.tab.categories": "Категории",
    "admin.dash.photos.manage": "Управление фото",
    "admin.dash.photos.add": "Добавить фото",
    "admin.dash.photos.edit": "Редактировать фото",
    "admin.dash.photos.new": "Новое фото",
    "admin.dash.form.title": "Название *",
    "admin.dash.form.imageUrl": "URL изображения (вставьте ссылку)",
    "admin.dash.form.description": "Описание",
    "admin.dash.form.featured": "Избранный проект",
    "admin.dash.form.update": "Обновить",
    "admin.dash.form.save": "Добавить фото",
    "admin.dash.form.cancel": "Отмена",
    "admin.dash.empty": "Фотографий пока нет. Добавьте первую!",
    "admin.dash.categories.manage": "Управление категориями",
    "admin.dash.categories.new": "Название новой категории",
    "admin.dash.categories.add": "Добавить",
    "admin.dash.categories.count": "фото",
    "admin.toast.titleCategoryRequired": "Название и категория обязательны",
    "admin.toast.photoUpdated": "Фото обновлено",
    "admin.toast.photoAdded": "Фото добавлено",
    "admin.toast.photoDeleted": "Фото удалено",
    "admin.toast.categoryExists": "Категория уже существует",
    "admin.toast.categoryAdded": "Категория добавлена",
    "admin.toast.categoryRemoved": "Категория удалена",
    "cat.Decor": "Декор",
    "cat.Lighting": "Освещение",
    "cat.Animals": "Животные",
    "cat.Abstract": "Абстрактное",
    "cat.Persons": "Люди",
    "cat.Furniture": "Мебель",
    "theme.toggle": "Сменить тему",
    "lang.label": "Язык",
  },
};

// Translations for default gallery items (id -> {title, description})
type ItemDict = Record<number, { title: string; description: string }>;
const itemTranslations: Record<Lang, ItemDict> = {
  et: {
    1: { title: "Faun 3m", description: "Käsitsi loodud Faun. Kõrgus 3 meetrit." },
    2: { title: "Põder", description: "Käsitsi loodud põder." },
    3: { title: "Koerad", description: "Käsitsi loodud koerad." },
    4: { title: "Mulk", description: "Käsitsi nikerdatud Mulk." },
    5: { title: "Tiiger", description: "Käsitsi loodud tiiger." },
    6: { title: "Madu", description: "Käsitsi loodud madu. Kõrgus 8 meetrit." },
    7: { title: "Ingel", description: "Käsitsi loodud ingel. Üle 3 meetri kõrgune." },
    8: { title: "Ajalooline mees", description: "Käsitsi loodud ajalooline mees." },
  },
    en: {
    1: { title: "Faun 3m", description: "Hand-carved Faun. Height 3 meters." },
    2: { title: "Moose", description: "Hand-carved moose." },
    3: { title: "Dogs", description: "Hand-carved dogs." },
    4: { title: "Mulk", description: "Hand-carved Mulk." },
    5: { title: "Tiger", description: "Hand-carved tiger." },
    6: { title: "Snake", description: "Hand-carved snake. Height 8 meters." },
    7: { title: "Angel", description: "Hand-carved angel. Over 3 meters tall." },
    8: { title: "Historical Man", description: "Hand-carved historical man." },
    },
  ru: {
    1: { title: "Фаун 3м", description: "Резной фаун. Высота 3 метра." },
    2: { title: "Лось", description: "Резной лось." },
    3: { title: "Собаки", description: "Резные собаки." },
    4: { title: "Мулк", description: "Резной Мулк." },
    5: { title: "Тигр", description: "Резной тигр." },
    6: { title: "Змея", description: "Резная змея. Высота 8 метров." },
    7: { title: "Ангел", description: "Резной ангел. Высотой более 3 метров." },
    8: { title: "Исторический человек", description: "Резной исторический человек." },
    },
};

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  tCategory: (cat: string) => string;
  tItem: (id: number, field: "title" | "description", fallback: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "et";

    const stored = localStorage.getItem("lang");
    return stored === "et" || stored === "en" || stored === "ru" ? stored : "et";
  });

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
    document.documentElement.lang = l;
  }, []);

  const t = useCallback((key: string) => translations[lang][key] ?? translations.et[key] ?? key, [lang]);
  const tCategory = useCallback(
      (cat: string) =>
          translations[lang][`cat.${cat}`] ??
          translations.et[`cat.${cat}`] ??
          cat,
      [lang]
  );
  const tItem = useCallback(
    (id: number, field: "title" | "description", fallback: string) =>
      itemTranslations[lang]?.[id]?.[field] ?? fallback,
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tCategory, tItem }}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
