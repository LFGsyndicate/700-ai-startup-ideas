
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
    'app.author': 'By CL',
    
    // Navigation
    'nav.home': 'Home',
    'nav.archetypes': 'AI Agent Archetypes',
    'nav.industries': 'Industries',
    'nav.order': 'Order Project',
    
    // Footer
    'footer.rights': '© 2025 CL. All rights reserved.',
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
    'home.introduction': 'A comprehensive collection of real-world generative AI applications and startup opportunities across various industries.',
    'home.revolution': 'The Generative AI Revolution',
    'home.join_telegram': 'Join our Telegram',
    'home.ideas_by_archetype': 'Ideas by Agent Archetype',
    'home.key_agent_types': 'The Six Key AI Agent Archetypes',
    'home.agent_types_description': 'Every GenAI startup can be categorized into one of these six fundamental agent types.',
    'home.startup_ideas': 'startup ideas',
    'home.explore_agent_types': 'Explore All Agent Types',
    'home.industry_breakdown': 'Industry-by-Industry Breakdown',
    'home.industry_description': 'Discover AI startup opportunities across these major industry sectors.',
    'home.view_all_industries': 'View All Industries',
    'home.distribution': 'Distribution of AI Startup Ideas',
    'home.distribution_description': 'Visualize the spread of AI applications across different industries.',
    'home.distribution_by_industry': 'Distribution by Industry',
    'home.ready': 'Ready to Explore AI Startup Opportunities?',
    'home.ready_description': 'Dive into our comprehensive collection of generative AI applications and find inspiration for your next venture.',
    
    // Industries Page
    'industries.title': 'Industries',
    'industries.description': 'Explore AI startup opportunities across different industry sectors, each with unique challenges and opportunities for generative AI applications.',
    'industries.search_placeholder': 'Search industries...',
    'industries.clear': 'Clear',
    'industries.applications_title': 'Industry-Specific AI Applications',
    'industries.applications_desc1': 'Each industry presents unique opportunities for applying generative AI to solve specific challenges. By exploring these industry-specific applications, entrepreneurs can identify gaps in the market and develop tailored solutions.',
    'industries.applications_desc2': 'From revolutionizing customer service in retail to transforming diagnostic processes in healthcare, generative AI is creating unprecedented opportunities across all sectors of the economy.',
    'industries.browse_archetypes': 'Browse by AI Agent Type Instead',
    'industries.no_results': 'No industries found matching your search.',
    
    // Industry Detail Page
    'industry_detail.back': '← Back to All Industries',
    'industry_detail.search_placeholder': 'Search ideas...',
    'industry_detail.all': 'All',
    'industry_detail.visit_website': 'Visit Website',
    'industry_detail.no_results': 'No ideas found matching your search.',
    
    // Archetypes Page
    'archetypes.title': 'AI Agent Archetypes',
    'archetypes.description': 'Explore the six fundamental AI agent types that form the backbone of generative AI applications across all industries.',
    'archetypes.search_placeholder': 'Search archetypes...',
    'archetypes.no_results': 'No archetypes found matching your search.',
    'archetypes.applications_title': 'Understanding AI Agent Archetypes',
    'archetypes.applications_desc': 'Each AI agent type specializes in different tasks and capabilities. Understanding these archetypes helps entrepreneurs identify the most suitable AI approach for their specific business challenges.',
    'archetypes.browse_industries': 'Browse by Industry Instead',
    
    // Archetype Detail Page
    'archetype_detail.back': '← Back to All Archetypes',
    'archetype_detail.search_placeholder': 'Search ideas...',
    'archetype_detail.all': 'All',
    'archetype_detail.visit_website': 'Visit Website',
    'archetype_detail.no_results': 'No ideas found matching your search.',
    
    // Not Found Page
    'notfound.title': 'Page Not Found',
    'notfound.description': 'Sorry, the page you are looking for does not exist or has been moved.',
    'notfound.back_home': 'Go back home'
  },
  ru: {
    // General
    'app.title': '700 идей AI-стартапов',
    'app.subtitle': 'Сборник реальных приложений генеративного ИИ',
    'app.author': 'Автор: CL',
    
    // Navigation
    'nav.home': 'Главная',
    'nav.archetypes': 'Архетипы AI Агентов',
    'nav.industries': 'Индустрии',
    'nav.order': 'Заказать проект',
    
    // Footer
    'footer.rights': '© 2025 CL. Все права защищены.',
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
    'home.introduction': 'Комплексная коллекция реальных применений генеративного ИИ и возможностей для стартапов в различных отраслях.',
    'home.revolution': 'Революция генеративного ИИ',
    'home.join_telegram': 'Присоединяйтесь к Telegram',
    'home.ideas_by_archetype': 'Идеи по архетипу агента',
    'home.key_agent_types': 'Шесть ключевых архетипов AI агентов',
    'home.agent_types_description': 'Каждый GenAI стартап можно отнести к одному из этих шести фундаментальных типов агентов.',
    'home.startup_ideas': 'идей для стартапа',
    'home.explore_agent_types': 'Исследовать все типы агентов',
    'home.industry_breakdown': 'Разбивка по отраслям',
    'home.industry_description': 'Откройте для себя возможности AI-стартапов в этих основных отраслевых секторах.',
    'home.view_all_industries': 'Просмотреть все индустрии',
    'home.distribution': 'Распределение идей AI-стартапов',
    'home.distribution_description': 'Визуализируйте распространение AI-приложений в различных отраслях.',
    'home.distribution_by_industry': 'Распределение по отраслям',
    'home.ready': 'Готовы изучить возможности AI-стартапов?',
    'home.ready_description': 'Погрузитесь в нашу обширную коллекцию приложений генеративного ИИ и найдите вдохновение для вашего следующего проекта.',
    
    // Industries Page
    'industries.title': 'Индустрии',
    'industries.description': 'Исследуйте возможности AI-стартапов в различных отраслях, каждая из которых имеет уникальные проблемы и возможности для приложений генеративного ИИ.',
    'industries.search_placeholder': 'Поиск индустрий...',
    'industries.clear': 'Очистить',
    'industries.applications_title': 'Отраслевые AI-приложения',
    'industries.applications_desc1': 'Каждая отрасль представляет уникальные возможности для применения генеративного ИИ для решения конкретных задач. Изучая эти отраслевые приложения, предприниматели могут выявить пробелы на рынке и разработать адаптированные решения.',
    'industries.applications_desc2': 'От революции в обслуживании клиентов в розничной торговле до трансформации диагностических процессов в здравоохранении, генеративный ИИ создает беспрецедентные возможности во всех секторах экономики.',
    'industries.browse_archetypes': 'Просматривать по типу AI агента',
    'industries.no_results': 'Отрасли, соответствующие вашему запросу, не найдены.',
    
    // Industry Detail Page
    'industry_detail.back': '← Назад ко всем индустриям',
    'industry_detail.search_placeholder': 'Поиск идей...',
    'industry_detail.all': 'Все',
    'industry_detail.visit_website': 'Посетить сайт',
    'industry_detail.no_results': 'Не найдено идей, соответствующих вашему запросу.',
    
    // Archetypes Page
    'archetypes.title': 'Архетипы AI агентов',
    'archetypes.description': 'Исследуйте шесть фундаментальных типов AI агентов, которые составляют основу приложений генеративного ИИ во всех отраслях.',
    'archetypes.search_placeholder': 'Поиск архетипов...',
    'archetypes.no_results': 'Архетипы, соответствующие вашему запросу, не найдены.',
    'archetypes.applications_title': 'Понимание архетипов AI агентов',
    'archetypes.applications_desc': 'Каждый тип AI агента специализируется на различных задачах и возможностях. Понимание этих архетипов помогает предпринимателям определить наиболее подходящий AI-подход для их конкретных бизнес-задач.',
    'archetypes.browse_industries': 'Просматривать по отраслям',
    
    // Archetype Detail Page
    'archetype_detail.back': '← Назад ко всем архетипам',
    'archetype_detail.search_placeholder': 'Поиск идей...',
    'archetype_detail.all': 'Все',
    'archetype_detail.visit_website': 'Посетить сайт',
    'archetype_detail.no_results': 'Не найдено идей, соответствующих вашему запросу.',
    
    // Not Found Page
    'notfound.title': 'Страница не найдена',
    'notfound.description': 'Извините, страница, которую вы ищете, не существует или была перемещена.',
    'notfound.back_home': 'Вернуться на главную'
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
