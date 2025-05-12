
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ru';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// English and Russian translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // General
    'app.title': '700 AI Startup Ideas',
    'app.subtitle': 'A Compendium of Real-World Generative AI Applications',
    'app.author': 'CL',
    
    // Navigation
    'nav.home': 'Home',
    'nav.archetypes': 'AI Agent Archetypes',
    'nav.industries': 'Industries',
    'nav.order': 'Order Project',
    
    // Footer
    'footer.rights': '© 2024 CL. All rights reserved.',
    'footer.tagline': '700 AI Startup Ideas: A Compendium of Real-World Generative AI Applications',
    'footer.navigation': 'Navigation',
    'footer.contact': 'Contact',
    
    // Archetypes
    'archetype.customer': 'Customer Agent',
    'archetype.employee': 'Employee Agent',
    'archetype.creative': 'Creative Agent',
    'archetype.code': 'Code Agent',
    'archetype.data': 'Data Agent',
    'archetype.security': 'Security Agent',
    
    // Industries
    'industry.sales': 'Sales & Marketing',
    'industry.hr': 'HR & Recruiting',
    'industry.finance': 'Finance & Accounting',
    'industry.legal': 'Legal',
    'industry.healthcare': 'Healthcare',
    'industry.education': 'Education',
    'industry.realestate': 'Real Estate',
    'industry.media': 'Media & Entertainment',
    'industry.manufacturing': 'Manufacturing & Logistics',
    'industry.retail': 'Retail & eCommerce',
    'industry.other': 'Cross-Industry & Other',
    
    // Home page
    'home.introduction': 'A comprehensive collection of real-world generative AI applications and startup opportunities across various industries.'
  },
  ru: {
    // General
    'app.title': '700 идей AI-стартапов',
    'app.subtitle': 'Сборник реальных приложений генеративного ИИ',
    'app.author': 'CL',
    
    // Navigation
    'nav.home': 'Главная',
    'nav.archetypes': 'Архетипы AI Агентов',
    'nav.industries': 'Индустрии',
    'nav.order': 'Заказать проект',
    
    // Footer
    'footer.rights': '© 2024 CL. Все права защищены.',
    'footer.tagline': '700 идей AI-стартапов: Сборник реальных приложений генеративного ИИ',
    'footer.navigation': 'Навигация',
    'footer.contact': 'Контакты',
    
    // Archetypes
    'archetype.customer': 'Клиентский агент',
    'archetype.employee': 'Агент-сотрудник',
    'archetype.creative': 'Креативный агент',
    'archetype.code': 'Код-агент',
    'archetype.data': 'Дата-агент',
    'archetype.security': 'Агент безопасности',
    
    // Industries
    'industry.sales': 'Продажи и Маркетинг',
    'industry.hr': 'HR и Рекрутинг',
    'industry.finance': 'Финансы и Бухгалтерия',
    'industry.legal': 'Юриспруденция',
    'industry.healthcare': 'Здравоохранение',
    'industry.education': 'Образование',
    'industry.realestate': 'Недвижимость',
    'industry.media': 'Медиа и Развлечения',
    'industry.manufacturing': 'Производство и Логистика',
    'industry.retail': 'Розничная торговля и eCommerce',
    'industry.other': 'Кросс-индустриальные и Другие',
    
    // Home page
    'home.introduction': 'Комплексная коллекция реальных применений генеративного ИИ и возможностей для стартапов в различных отраслях.'
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Get initial language from localStorage or default to 'en'
  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem('language') as Language) || 'en'
  );

  useEffect(() => {
    // Save language preference to localStorage whenever it changes
    localStorage.setItem('language', language);
    // Update HTML lang attribute
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === 'en' ? 'ru' : 'en'));
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    toggleLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
