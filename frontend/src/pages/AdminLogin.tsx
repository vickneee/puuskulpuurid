import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/contexts/useAdmin";
import { Lock } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { isAdmin, loading: authLoading } = useAdmin();
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    if (!authLoading && isAdmin) {
      navigate("/admin", { replace: true });
    }
  }, [authLoading, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authLoading) return;
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (err: unknown) {
      // Firebase error codes: invalid-credential, user-not-found, wrong-password
      if (err instanceof Error) {
        // optionally show Firebase-specific message: err.message
      }
      setError(t("admin.login.error"));
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
          <p className="font-body text-muted-foreground">Loading...</p>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-accent" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              {t("admin.login.title")}
            </h1>
            <p className="font-body text-sm text-muted-foreground mt-1">
              {t("admin.login.subtitle")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="admin@email.com"
                className="w-full px-5 py-3 rounded-lg bg-card border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-shadow"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder={t("admin.login.password")}
                className="w-full px-5 py-3 rounded-lg bg-card border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-shadow"
            />
            {error && <p className="text-sm text-destructive font-body">{error}</p>}
            <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-accent text-accent-foreground font-body font-semibold tracking-wide transition-all duration-300 hover:brightness-110 disabled:opacity-50"
            >
              {loading ? "..." : t("admin.login.signIn")}
            </button>
            <button
                type="button"
                onClick={() => navigate("/")}
                className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("admin.login.back")}
            </button>
          </form>
        </div>
      </div>
  );
};

export default AdminLogin;
