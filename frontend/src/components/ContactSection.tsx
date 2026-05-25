import { Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Contact form endpoint (Cloud Function)
const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT ?? "";
const FACEBOOK_URL = import.meta.env.VITE_FACEBOOK_URL ?? "https://www.facebook.com/puuskulptuur";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M13.5 8.5V6.9c0-.6.4-.9 1-.9h1.5V3.2h-2.1c-2.3 0-3.9 1.4-3.9 3.8v1.5H8v2.8h2v8.5h3.5v-8.5H16l.4-2.8h-2.9z" />
  </svg>
);

const ContactSection = () => {
  const { t } = useLanguage();
  return (
    <section className="section-padding bg-card pt-4 sm:pt-16">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-sm font-body font-semibold uppercase tracking-widest text-accent">
          {t("contact.kicker")}
        </span>
        <h2 className="section-title mt-2 mb-4">{t("contact.title")}</h2>
        <p className="section-subtitle mx-auto mb-12">
          {t("contact.subtitle")}
        </p>

        <div className="grid sm:grid-cols-4 gap-8 mb-14">
          {[
            { icon: Mail, label: t("contact.email"), value: "jurivavulin@gmail.com", href: "mailto:jurivavulin@gmail.com" },
            { icon: Phone, label: t("contact.phone"), value: "+372 58 540 107" },
            { icon: MapPin, label: t("contact.workshop"), value: t("contact.workshop.value") },
            { icon: FacebookIcon, label: "Facebook", value: "@puuskulptuur", href: FACEBOOK_URL },
          ].map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              {href ? (
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                >
                  <Icon className="w-5 h-5 text-accent" />
                </a>
              ) : (
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
              )}
              <span className="font-body text-sm font-semibold text-foreground">{label}</span>
              {href ? (
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="font-body text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  {value}
                </a>
              ) : (
                <span className="font-body text-sm text-muted-foreground">{value}</span>
              )}
            </div>
          ))}
        </div>

        <div className="max-w-lg mx-auto flex flex-col gap-4">
          {/* Controlled form */}
          <ContactForm t={t} />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

function ContactForm({ t }: { t: (k: string) => string }) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (value: string) => {
    return /^\S+@\S+\.\S+$/.test(value);
  };

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast({ title: t("contact.form.send"), description: "Please fill in all fields.", variant: "destructive" });
      return;
    }

    if (!validateEmail(email)) {
      toast({ title: t("contact.form.send"), description: "Please enter a valid email.", variant: "destructive" });
      return;
    }

    if (!CONTACT_ENDPOINT) {
      toast({ title: t("contact.form.send"), description: "Contact endpoint not configured.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      });

      console.log(`[Contact Form] Response status: ${res.status}`);

      if (!res.ok) {
        let errorMsg = `Status ${res.status}`;
        try {
          const json = await res.json();
          errorMsg = json.error || JSON.stringify(json);
          console.error("[Contact Form] Backend error:", json);
        } catch {
          const text = await res.text().catch(() => "");
          errorMsg = text || errorMsg;
          console.error("[Contact Form] Backend error (text):", text);
        }
        throw new Error(errorMsg);
      }

      const responseData = await res.json().catch(() => ({}));
      console.log("[Contact Form] Success:", responseData);

      toast({ title: t("contact.form.send"), description: "Message sent — thank you!", variant: "default" });
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("[Contact Form] Full error:", errorMessage);
      toast({
        title: t("contact.form.send"),
        description: `Failed to send message: ${errorMessage}`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="w-full flex flex-col gap-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={t("contact.form.name")}
        className="w-full px-5 py-3 rounded-lg bg-background border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-shadow"
        aria-label={t("contact.form.name")}
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("contact.form.email")}
        className="w-full px-5 py-3 rounded-lg bg-background border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-shadow"
        aria-label={t("contact.form.email")}
      />

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={t("contact.form.message")}
        rows={4}
        className="w-full px-5 py-3 rounded-lg bg-background border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-shadow resize-none"
        aria-label={t("contact.form.message")}
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3.5 rounded-lg ${loading ? "opacity-70 cursor-wait" : "bg-accent hover:brightness-110"} text-white dark:text-white font-body font-semibold tracking-wide transition-all duration-300`}
      >
        {loading ? "Sending..." : t("contact.form.send")}
      </button>
    </form>
  );
}
