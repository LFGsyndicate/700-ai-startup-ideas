
import { useLanguage } from '@/hooks/use-language';
import { getDocumentMetadata } from '@/data/mock-data';
import { ExternalLink } from "lucide-react";
import { Button } from '@/components/ui/button';

export function IntroSection() {
  const { introduction, telegramLink } = getDocumentMetadata();
  const { t, language } = useLanguage();

  return (
    <div className="glass-card p-6 card-hover space-y-4 border border-primary/30">
      <h2 className="text-2xl font-bold text-primary dark:text-primary">
        {t('home.revolution')}
      </h2>
      
      <div className="prose prose-green max-w-none dark:prose-invert">
        <p className="text-gray-800 dark:text-gray-300">
          {language === "en" ? introduction : t('home.introduction_full')}
        </p>
      </div>
      
      <div className="flex gap-4">
        <Button asChild variant="outline" size="sm" className="border-primary/20 hover:border-primary/50 bg-transparent text-primary">
          <a href={telegramLink} target="_blank" rel="noreferrer" className="flex items-center gap-1">
            {t('home.help_telegram')}
            <ExternalLink className="h-3 w-3" />
          </a>
        </Button>
      </div>
    </div>
  );
}
