import {useEffect, useLayoutEffect, useState} from "react";
import {Moon, Sun, Menu, X} from "lucide-react";
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
    const [mobileOpen, setMobileOpen] = useState(false);

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

    useEffect(() => {
        if (mobileOpen) {
            const previousOverflow = document.body.style.overflow;
            const previousPaddingRight = document.body.style.paddingRight;

            return () => {
                document.body.style.overflow = previousOverflow;
                document.body.style.paddingRight = previousPaddingRight;
            };
        }
    }, [mobileOpen]);

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <button type="button" onClick={() => onNavigate("hero")}
                        className="font-display text-xl font-bold text-foreground hover:text-accent transition-colors pointer-events-auto">
                    Puuskulptuurid
                </button>
                <div className="flex items-center gap-4 sm:gap-6">
                    {/* mobile menu button */}
                    <button
                        type="button"
                        onClick={() => setMobileOpen((v) => !v)}
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        className="sm:hidden p-2 rounded-md text-foreground hover:bg-muted pointer-events-auto"
                    >
                        {mobileOpen ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
                    </button>
                    <div className="hidden sm:flex items-center gap-2">
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
            {/* mobile full screen menu: use an overlay + popover so colors stay readable in both themes */}
            {mobileOpen && (
                <div className="fixed inset-0 z-9000 sm:hidden pointer-events-none">
                    {/* dimming overlay (click to close) */}
                    <div
                        // don't cover the fixed header so the theme toggle and other header controls remain usable
                        className="absolute top-16 left-0 right-0 bottom-0 bg-foreground/90 backdrop-blur-sm z-8900 pointer-events-auto"
                        onClick={() => setMobileOpen(false)}
                    />

                    {/* centered popover sheet for menu items */}
                    <div className="relative z-9000 flex items-start justify-center pt-16 pointer-events-none">
                        <div
                            className="w-full max-w-lg mx-4 bg-popover/98 text-popover-foreground rounded-xl px-6 py-8 flex flex-col items-center gap-6 z-10000 pointer-events-auto shadow-md"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {navItems.map((item) => (
                                <button
                                    type="button"
                                    key={item.id}
                                    onClick={() => {
                                        onNavigate(item.id);
                                        setMobileOpen(false);
                                    }}
                                    className="text-2xl font-medium text-popover-foreground hover:text-accent transition-colors pointer-events-auto"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
