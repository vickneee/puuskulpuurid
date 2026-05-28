// import { useEffect } from "react";
import Index from "./Index";
// import { useLanguage } from "@/lib/i18n";

// Simple route wrapper that ensures the language context is set to English
export default function HomeEN() {
  // const { setLang } = useLanguage();
  //
  // useEffect(() => {
  //   setLang("en");
  // }, [setLang]);

  return <Index />;
}

