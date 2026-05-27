import { useEffect } from "react";
import Index from "./Index";
import { useLanguage } from "@/lib/i18n";

// Simple route wrapper that ensures the language context is set to Estonian
export default function HomeET() {
  const { setLang } = useLanguage();

  useEffect(() => {
    setLang("et");
  }, [setLang]);

  return <Index />;
}

