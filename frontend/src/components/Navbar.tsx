import {useState, useLayoutEffect} from "react";
import {Moon, Sun} from "lucide-react";
// import {useLanguage, type Lang} from "@/lib/i18n";

interface NavbarProps {
    onNavigate: (section: string) => void;
}

const Navbar = ({onNavigate}: NavbarProps) => {
    // const [langOpen, setLangOpen] = useState(false);
    // const {lang, setLang, t} = useLanguage();

    // const langs: { code: Lang; label: string }[] = [
    //{code: "et", label: "ET"},
    //{code: "en", label: "EN"},
    //{code: "ru", label: "RU"},
    //];

    const [isDark, setIsDark] = useState(false);

    useLayoutEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);
    }, [isDark]);

    const toggleTheme = () => {
        const next = !isDark;
        setIsDark(next);
        localStorage.setItem("theme", next ? "dark" : "light");
    };

    const navItems = [
        {id: "gallery", label: ("Galerii")},
        {id: "about", label: ("Minust")},
        {id: "featured", label: ("Esiletõstetud")},
        {id: "contact", label: ("Kontakt")},
    ];

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <button onClick={() => onNavigate("hero")}
                        className="font-display text-xl font-bold text-foreground hover:text-accent transition-colors">
                    Puuskulptuurid
                </button>
                <div className="flex items-center gap-4 sm:gap-6">
                    <div className="hidden sm:flex items-center gap-8">
                        {navItems.map((item) => (
                            <button key={item.id} onClick={() => onNavigate(item.id)}
                                    className="font-body text-sm font-medium text-foreground hover:text-foreground transition-colors">
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* Language switcher */}
                    {/*<div className="relative">*/}
                    {/*    <button onClick={() => setLangOpen((v) => !v)}*/}
                    {/*            onBlur={() => setTimeout(() => setLangOpen(false), 150)} aria-label={t("lang.label")}*/}
                    {/*            className="flex items-center gap-1 p-2 rounded-md text-foreground hover:text-foreground hover:bg-muted transition-colors">*/}
                    {/*        <Globe className="w-4 h-4"/>*/}
                    {/*        <span className="font-body text-xs font-semibold uppercase">{lang}</span>*/}
                    {/*    </button>*/}
                    {/*    {langOpen && (*/}
                    {/*        <div*/}
                    {/*            className="absolute right-0 top-full z-40 mt-1 min-w-[40px] rounded-md border border-border bg-popover shadow-card overflow-hidden">*/}
                    {/*            {langs.map((l) => (*/}
                    {/*                <button key={l.code} onMouseDown={(e) => {*/}
                    {/*                    e.preventDefault();*/}
                    {/*                    setLang(l.code);*/}
                    {/*                    setLangOpen(false);*/}
                    {/*                }}*/}
                    {/*                        className={`block w-full text-left px-3 py-2 font-body text-xs font-medium transition-colors ${*/}
                    {/*                            lang === l.code*/}
                    {/*                                ? "bg-accent text-accent-foreground"*/}
                    {/*                                : "text-foreground hover:text-foreground hover:bg-muted"*/}
                    {/*                        }`}>*/}
                    {/*                    {l.label}*/}
                    {/*                </button>*/}
                    {/*            ))}*/}
                    {/*        </div>*/}
                    {/*    )}*/}
                    {/*</div>*/}

                    <button onClick={toggleTheme} aria-label={("theme.toggle")}
                            className="p-2 rounded-md text-foreground hover:bg-muted transition-colors">
                        {isDark ? <Sun className="w-4 h-4"/> : <Moon className="w-4 h-4"/>}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
