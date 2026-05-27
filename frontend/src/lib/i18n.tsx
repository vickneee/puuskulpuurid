import {createContext, useCallback, useContext, useEffect, useState, type ReactNode} from "react";
import type {GalleryItem} from "@/data/galleryData";

export type Lang = "et" | "en";

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
        "hero.title": "Puuskulptuurid",
        "hero.subtitle": "Käsitsi valmistatud puidust teosed, loodud kannatlikult, kirega ja austusega looduslike materjalide vastu.",
        "hero.cta": "Vaata galeriid",
        // Featured
        "featured.kicker": "Esiletõstetud",
        "featured.title": "Valitud tööd",
        // Gallery
        "gallery.kicker": "Portfoolio",
        "gallery.title": "Kõik tööd",
        "gallery.filter.label": "Kategooria",
        "gallery.filter.all": "Kõik",
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
        "contact.subtitle-2": "Vastupidav puidust valmistatud õueliivakast.",
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
        "admin.dash.tab.photos": "Tooted",
        "admin.dash.tab.categories": "Kategooriad",
        "admin.dash.photos.manage": "Halda tooteid",
        "admin.dash.photos.add": "Lisa toode",
        "admin.dash.photos.edit": "Muuda toodet",
        "admin.dash.photos.new": "Uus toode",
        "admin.dash.form.title": "Pealkiri *",
        "admin.dash.form.titleEt": "Pealkiri (ET) *",
        "admin.dash.form.titleEn": "Pealkiri (EN)",
        "admin.dash.form.imageUrl": "Pildi URL (kleebi link)",
        "admin.dash.form.description": "Kirjeldus",
        "admin.dash.form.descriptionEt": "Kirjeldus (ET) *",
        "admin.dash.form.descriptionEn": "Kirjeldus (EN)",
        "admin.dash.form.featured": "Esiletõstetud projekt",
        "admin.dash.form.update": "Uuenda",
        "admin.dash.form.save": "Lisa toode",
        "admin.dash.form.cancel": "Loobu",
        "admin.dash.empty": "Tooteidd pole veel. Lisa esimene!",
        "admin.dash.categories.manage": "Halda kategooriaid",
        "admin.dash.categories.new": "Uue kategooria nimi",
        "admin.dash.categories.newEt": "Uus kategooria (ET)",
        "admin.dash.categories.newEn": "Uus kategooria (EN)",
        "admin.dash.categories.add": "Lisa",
        "admin.dash.categories.edit": "Muuda kategooriat",
        "admin.dash.categories.update": "Uuenda kategooriat",
        "admin.dash.categories.cancel": "Tühista",
        "admin.dash.categories.count": "toodet",
        "admin.toast.titleCategoryRequired": "Pealkiri ja kategooria on kohustuslikud",
        "admin.toast.photoUpdated": "Toode uuendatud",
        "admin.toast.photoAdded": "Toode lisatud",
        "admin.toast.photoDeleted": "Toode kustutatud",
        "admin.toast.categoryExists": "Kategooria on juba olemas",
        "admin.toast.categoryAdded": "Kategooria lisatud",
        "admin.toast.categoryUpdated": "Kategooria uuendatud",
        "admin.toast.categoryRemoved": "Kategooria eemaldatud",
        // Categories
        "cat.Decor": "Dekoratsioon",
        "cat.Animals": "Loomad",
        "cat.Characters": "Karakterid",
        "cat.Figures": "Figuurid",
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
        "gallery.filter.label": "Category",
        "gallery.filter.all": "All",
        "about.kicker": "About the Craftsman",
        "about.title.l1": "Shaped by Hand,",
        "about.title.l2": "Driven by Passion",
        "about.p1": "With over 15 years of experience, every sculpture begins with carefully selected wood and a deep respect for nature. I combine traditional woodworking skills with a creative artistic touch to create strong and timeless wooden forms.",
        "about.p2": "Each piece carries its own character — from the texture of the wood to the hand-finished details. No wooden sculpture is ever exactly like another, because nature never repeats itself.",
        "about.name": "Juri Vavulin",
        "about.imgAlt": "The craftsman at work",
        "contact.kicker": "Get in Touch",
        "contact.title": "Let's Create Together",
        "contact.subtitle": "Have a custom project in mind? I'd love to hear about it. Reach out and let's bring your vision to life in wood.",
        "contact.subtitle-2": "Durable wooden sandbox for outdoor.",
        "contact.email": "Email",
        "contact.phone": "Phone",
        "contact.workshop": "Workshop",
        "contact.workshop.value": "Estonia",
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
        "admin.dash.tab.photos": "Items",
        "admin.dash.tab.categories": "Categories",
        "admin.dash.photos.manage": "Manage Items",
        "admin.dash.photos.add": "Add Item",
        "admin.dash.photos.edit": "Edit Item",
        "admin.dash.photos.new": "Add New Item",
        "admin.dash.form.title": "Title *",
        "admin.dash.form.titleEt": "Title (ET) *",
        "admin.dash.form.titleEn": "Title (EN)",
        "admin.dash.form.imageUrl": "Image URL (paste link)",
        "admin.dash.form.description": "Description",
        "admin.dash.form.descriptionEt": "Description (ET) *",
        "admin.dash.form.descriptionEn": "Description (EN)",
        "admin.dash.form.featured": "Featured project",
        "admin.dash.form.update": "Update",
        "admin.dash.form.save": "Add Item",
        "admin.dash.form.cancel": "Cancel",
        "admin.dash.empty": "No items yet. Add your first one!",
        "admin.dash.categories.manage": "Manage Categories",
        "admin.dash.categories.new": "New category name",
        "admin.dash.categories.newEt": "New category (ET)",
        "admin.dash.categories.newEn": "New category (EN)",
        "admin.dash.categories.add": "Add",
        "admin.dash.categories.edit": "Edit category",
        "admin.dash.categories.update": "Update category",
        "admin.dash.categories.cancel": "Cancel",
        "admin.dash.categories.count": "items",
        "admin.toast.titleCategoryRequired": "Title and category are required",
        "admin.toast.photoUpdated": "Item updated",
        "admin.toast.photoAdded": "Item added",
        "admin.toast.photoDeleted": "Item deleted",
        "admin.toast.categoryExists": "Category already exists",
        "admin.toast.categoryAdded": "Category added",
        "admin.toast.categoryUpdated": "Category updated",
        "admin.toast.categoryRemoved": "Category removed",
        "cat.Decor": "Decor",
        "cat.Animals": "Animals",
        "cat.Characters": "Characters",
        "cat.Figures": "Figures",
        "cat.Furniture": "Furniture",
        "theme.toggle": "Toggle theme",
        "lang.label": "Language",
    },
};

// Translations for default gallery items (id -> {title, description})
type ItemDict = Record<number, { title: string; description: string }>;
const itemTranslations: Record<Lang, ItemDict> = {
    et: {
        1: {title: "Faun 3m", description: "Käsitsi loodud Faun. Kõrgus 3 meetrit."},
        2: {title: "Põder", description: "Puidust põder."},
        3: {title: "Öökull", description: "Puidust meisterdatud öökull."},
        4: {title: "Mulk", description: "Käsitsi nikerdatud Mulk."},
        5: {title: "Tiiger", description: "Puidust tiiger."},
        6: {title: "Madu 8m", description: "Puidust madu. Kõrgus 8 meetrit."},
        7: {title: "Ingel 3m", description: "Käsitsi loodud ingel. Üle 3 meetri kõrgune."},
        8: {title: "Ludwig van Beethoven", description: "Ludwig van Beethoven."},
        9: {title: "Kobras", description: "Puidust kobras."},
        10: {title: "Aia dekoratsioon", description: "Aia dekoratsioon."},
        11: {title: "Otepää künkad 3m", description: "Otepää künkad. Üle 3 meetri kõrgune."},
        12: {title: "Voodi öökullidega", description: "Öökullidega puidust voodi."},
        13: {title: "Öökullid", description: "Kolm öökulli."},
        14: {title: "Merineitsi", description: "Merineitsi."},
        15: {title: "Sarikas", description: "Sarikas."},
        16: {title: "Voodi karudega", description: "Karudega puidust voodi."},
        17: {title: "Koer", description: "Puidust koer."},
        18: {title: "Koer", description: "Koer."},
        19: {title: "Sarikas", description: "Sarikas."},
        20: {title: "Koer", description: "Koer."},
        21: {title: "Voodi hirvega", description: "Voodi hirve ja põdraga."},
        22: {title: "Voodi hirvega otsevaade", description: "Voodi hirve ja põdraga otsevaade."},
        23: {title: "Troll 6m", description: "Troll. Umbes 6 meetri kõrgune."},
        24: {title: "Buratiino", description: "Buratiino."},
        25: {title: "Ludwig van Beethoven", description: "Ludwig van Beethoven."},
        26: {title: "Oinas", description: "Oinas."},
        27: {title: "Voodi madudega", description: "Oinas."},
        28: {title: "Laud saare puust 2,5m", description: "Laud saare puust. Pikkus 2,5 meetrit."},
        29: {title: "Albert", description: "Albert."},
        30: {title: "Albert Einstein", description: "Albert Einstein."},
        31: {title: "Sarikas", description: "Sarikas."},
        32: {title: "Shrek", description: "Shrek."},
        33: {title: "Eesel", description: "Puidust eesel."},
        34: {title: "Kaamel", description: "Puidust kaamel."},
        35: {title: "Jahimehe voodi", description: "Jahimehe voodi."},
        36: {title: "Jahimehe voodi otsevaade", description: "Jahimehe voodi otsevaade."},
        37: {title: "Hirv", description: "Hirv."},
        38: {title: "Hirv", description: "Hirv."},
        39: {title: "Poni mõõdus hobune", description: "Poni mõõdus hobune."},
        40: {title: "Laud 3,2 x 1,7m", description: "Puust laud. Pikkus 3,2 meetrit, laius 1,7 meetrit."},
        41: {title: "Koer", description: "Koer."},
        42: {title: "Karu", description: "Karu."},
        43: {title: "Voodi loomadega", description: "Voodi loomadega."},
        44: {title: "Ilves", description: "Ilves."},
        45: {title: "Sarikas", description: "Sarikas."},
        46: {title: "Koer", description: "Koer."},
        47: {title: "Voodi jääradega", description: "Voodi jääradega."},
        48: {title: "Koer", description: "Koer."},
        49: {title: "Elizabeth II", description: "Elizabeth II."},
        50: {title: "Oinas 285kg", description: "Oinas 285kg."},
        51: {title: "Öökull", description: "Öökull."},
        52: {title: "Linnud", description: "Lendavad linnud."},
        53: {title: "Koer", description: "Koer."},
        54: {title: "Valvur", description: "Valvur."},
        55: {title: "Valvurid", description: "Valvurid."},
        56: {title: "Kilpkonnad", description: "Kilpkonnad."},
        57: {title: "Ilves", description: "Ilves."},
        58: {title: "Põder II", description: "Põder II."},

    },
    en: {
        1: {title: "Faun 3m", description: "Hand-carved Faun. Height 3 meters."},
        2: {title: "Moose", description: "Hand-carved moose."},
        3: {title: "Owl", description: "Hand-carved owl."},
        4: {title: "A Mulk (person from southern Estonia near Viljandi)", description: "Hand-carved Mulk."},
        5: {title: "Tiger", description: "Hand-carved tiger."},
        6: {title: "Snake 8m", description: "Hand-carved snake. Height 8 meters."},
        7: {title: "Angel 3m", description: "Hand-carved angel. Over 3 meters tall."},
        8: {title: "Ludwig van Beethoven", description: "Ludwig van Beethoven."},
        9: {title: "Beaver", description: "Wooden beaver."},
        10: {title: "Garden decoration", description: "Garden decoration."},
        11: {title: "Otepää Hills 3m", description: "Otepää hills. Over 3 meters tall."},
        12: {title: "Bed with owls", description: "Bed with owls."},
        13: {title: "Owls", description: "Owls."},
        14: {title: "Merimaid", description: "Merimaid."},
        15: {title: "Rafter", description: "Rafter."},
        16: {title: "Bed with bears", description: "Bed with bears."},
        17: {title: "Dog", description: "Wooden dog."},
        18: {title: "Dog", description: "Dog."},
        19: {title: "Rafter", description: "Rafter."},
        20: {title: "Dog", description: "Dog."},
        21: {title: "Bed with deer", description: "Bed with deer and moose."},
        22: {title: "Bed with elk front view", description: "Bed with elk and moose front view."},
        23: {title: "Troll 6m", description: "Troll. About 6 meters tall."},
        24: {title: "Buratino", description: "Buratino."},
        25: {title: "Ludwig van Beethoven", description: "Ludwig van Beethoven."},
        26: {title: "Aries", description: "Aries."},
        27: {title: "Bed with snakes", description: "Bed with snakes."},
        28: {title: "Table made of ash wood, 2.5m", description: "Table made of ash wood, 2.5 meters."},
        29: {title: "Albert", description: "Albert."},
        30: {title: "Albert Einstein", description: "Albert Einstein."},
        31: {title: "Rafter", description: "Rafter."},
        32: {title: "Shrek", description: "Shrek."},
        33: {title: "Donkey", description: "Wooden donkey."},
        34: {title: "Camel", description: "Wooden camel."},
        35: {title: "Hunter's bed", description: "Hunter's bed."},
        36: {title: "Hunter's bed front view", description: "Hunter's bed front view."},
        37: {title: "Deer.", description: "Deer."},
        38: {title: "Deer", description: "Deer."},
        39: {title: "Female figure", description: "Female figure."},
        40: {title: "Table size 3,2 x 1,7 m", description: "Wooden table. Length 3,2 meters, width 1,7 meters."},
        41: {title: "Dog", description: "Dog."},
        42: {title: "Bear", description: "Bear."},
        43: {title: "Bed with animals", description: "Bed with animals."},
        44: {title: "Lynx", description: "Lynx."},
        45: {title: "Rafter", description: "Rafter."},
        46: {title: "Dog", description: "Dog."},
        47: {title: "Bed with rams", description: "Bed with rams."},
        48: {title: "Dog", description: "Dog."},
        49: {title: "Elizabeth II", description: "Elizabeth II."},
        50: {title: "Aries 285kg", description: "Aries 285kg."},
        51: {title: "Owl", description: "Owl."},
        52: {title: "Birds", description: "Flying birds."},
        53: {title: "Dog", description: "Dog."},
        54: {title: "Guard", description: "Guard."},
        55: {title: "Guards", description: "Guards."},
        56: {title: "Turtles", description: "Turtles."},
        57: {title: "Lynx", description: "Lynx."},
        58: {title: "Moose II", description: "Moose II."},
    },
};

const categoryTranslations
    :
    Record<Lang, Record<string, string>> = {
    et: {
        Decor: "Dekoratsioon",
        Animals: "Loomad",
        Characters: "Karakterid",
        Figures: "Figuurid",
        Furniture: "Mööbel",
        Dekoratsioon: "Dekoratsioon",
        Loomad: "Loomad",
        Karakterid: "Karakterid",
        Figuurid: "Figuurid",
        Mööbel: "Mööbel",
    },
    en: {
        Decor: "Decor",
        Animals: "Animals",
        Characters: "Characters",
        Figures: "Figures",
        Furniture: "Furniture",
        Dekoratsioon: "Decor",
        Loomad: "Animals",
        Karakterid: "Characters",
        Figuurid: "Figures",
        Mööbel: "Furniture",
    },
};

interface LanguageContextValue {
    lang: Lang;
    setLang: (l: Lang) => void;
    t: (key: string) => string;
    tCategory: (cat: string) => string;
    tItem: (item: LocalizedGalleryItem, field: "title" | "description", fallback: string) => string;
}

type LocalizedGalleryItem = Pick<GalleryItem, "id" | "title" | "description" | "titleEt" | "titleEn" | "descriptionEt" | "descriptionEn">;

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider = ({children}: { children: ReactNode }) => {
    const [lang, setLangState] = useState<Lang>(() => {
        if (typeof window === "undefined") return "et";

        const stored = localStorage.getItem("lang");
        return stored === "et" || stored === "en" ? stored : "et";
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
        (cat: string) => categoryTranslations[lang][cat] ?? categoryTranslations.et[cat] ?? cat,
        [lang]
    );
    const tItem = useCallback(
        (
            item: LocalizedGalleryItem,
            field: "title" | "description",
            fallback: string
        ) => {
            const localizedField = ((field === "title"
                ? (lang === "et" ? item?.titleEt : item?.titleEn)
                : (lang === "et" ? item?.descriptionEt : item?.descriptionEn)) ?? "") as string;

            return localizedField.trim() || itemTranslations[lang]?.[item.id]?.[field] || fallback;
        },
        [lang]
    );

    return (
        <LanguageContext.Provider value={{lang, setLang, t, tCategory, tItem}}>
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
