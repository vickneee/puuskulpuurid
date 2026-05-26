import { Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import contactImage from "../assets/contact-1.jpg";
// import { useState } from "react";
// import { useToast } from "@/hooks/use-toast";

// Contact form endpoint (Cloud Function)
// const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT ?? "";
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

        <div className="max-w-2xl mx-auto">
          <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-card">
            <img
              src={contactImage}
              alt={t("about.imgAlt")}
              className="w-full h-80 sm:h-105 object-cover object-center"
            />
          </div>
          <p className="mt-4 font-body text-sm text-muted-foreground">
            {t("contact.subtitle-2")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
