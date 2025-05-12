
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      onClick={toggleLanguage}
      aria-label="Toggle language"
      className="rounded-full flex items-center gap-2 bg-white/40 hover:bg-white/60 dark:bg-gray-800/40 dark:hover:bg-gray-800/60 backdrop-blur-sm border-primary/10"
    >
      <Globe className="h-[1.2rem] w-[1.2rem] text-primary" />
      <span className="font-medium">{language === "en" ? "EN" : "RU"}</span>
    </Button>
  );
}
