
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
      className="rounded-full flex items-center gap-2 bg-background hover:bg-muted border-primary/20"
    >
      <Globe className="h-[1.2rem] w-[1.2rem] text-primary" />
      <span className="font-medium">{language === "en" ? "EN" : "RU"}</span>
    </Button>
  );
}
