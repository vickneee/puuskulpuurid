import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="py-10 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-body text-sm text-muted-foreground">
          © {new Date().getFullYear()} Puuskulptuurid. {t("footer.rights")}
        </p>
        <Link
          to="/admin/login"
          className="flex items-center gap-1.5 font-body text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors"
        >
          <Lock className="w-3 h-3" />
          {t("footer.admin")}
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
