
import { createContext, useContext, useState } from 'react';

// Add language definitions for English and Russian
const translations = {
  en: {
    'app.author': 'Author: CL',
    'home.introduction': 'A comprehensive industry analysis of 700 real-world generative AI applications, providing insights into how this technology is transforming businesses across sectors.',
    'home.introduction_full': 'The world is witnessing a Generative AI revolution. Unlike previous technological waves, GenAI\'s impact spans almost every industry and role, creating opportunities for entrepreneurs to build valuable products that augment human capabilities. This compendium presents real-world applications categorized by industry and AI agent archetype, providing inspiration for your next venture.',
    'home.revolution': 'The Generative AI Revolution',
    'home.key_agent_types': 'Key AI Agent Archetypes',
    'home.agent_types_description': 'Explore the six principal AI agent archetypes that are transforming organizations across industries.',
    'home.startup_ideas': 'startup ideas',
    'home.explore_agent_types': 'Explore All Agent Types',
    'home.industry_breakdown': 'Industry Breakdown',
    'home.industry_description': 'Discover how generative AI is being applied across different sectors of the economy.',
    'home.view_all_industries': 'View All Industries',
    'home.ideas_by_archetype': 'AI Ideas by Agent Type',
    'home.distribution': 'Distribution of AI Applications',
    'home.distribution_description': 'Visualize the distribution of generative AI applications across industries and agent archetypes.',
    'home.distribution_by_industry': 'Distribution by Industry',
    'home.ideas_count': 'AI Applications',
    'home.ready': 'Ready to Explore?',
    'home.ready_description': 'Dive into our comprehensive collection of 700 real-world generative AI applications across industries.',
    'home.help_telegram': 'Help in Telegram',
    'home.join_telegram': 'Help in Telegram',
    'nav.home': 'Home',
    'nav.archetypes': 'AI Agent Archetypes',
    'nav.industries': 'Industries',
    'footer.navigation': 'Navigation',
    'footer.contact': 'Contact',
    'archetype.customer': 'Customer Agent',
    'archetype.employee': 'Employee Agent',
    'archetype.creative': 'Creative Agent',
    'archetype.code': 'Code Agent',
    'archetype.data': 'Data Agent',
    'archetype.security': 'Security Agent',
    'industry.automotive': 'Automotive & Logistics',
    'industry.financial': 'Financial Services & Insurance',
    'industry.healthcare': 'Healthcare & Pharmaceuticals',
    'industry.manufacturing': 'Manufacturing & Electronics',
    'industry.retail': 'Retail & E-commerce',
    'industry.media': 'Media & Entertainment',
    'industry.telecom': 'Telecom & Technology',
    'industry.energy': 'Energy & Utilities',
    'industry.government': 'Government & Public Sector',
    'industry.education': 'Education & Research',
    'industry.travel': 'Travel & Hospitality',
    'industry.sales': 'Sales',
    'industry.hr': 'HR',
    'industry.finance': 'Finance',
    'industry.legal': 'Legal',
    'industry.real': 'Real Estate',
    'industry.cross': 'Cross Industry',
    'industries.browse_archetypes': 'Browse Types',
    'industries.title': 'Industry Sectors',
    'industries.description': 'Explore how generative AI is transforming different sectors of the economy with real-world applications.',
    'industries.search_placeholder': 'Search industries...',
    'industries.clear': 'Clear',
    'industries.no_results': 'No industries found matching your search.',
    'industry_detail.back': 'Back to All Industries',
    'industry_detail.search_placeholder': 'Search ideas by company or description...',
    'industry_detail.all': 'All Ideas',
    'industry_detail.no_results': 'No ideas found matching your search.',
    'industry_detail.visit_website': 'Visit Website',
    // Добавляем описания индустрий на английском
    'industry_description.sales': 'The Sales & Marketing sector is leveraging generative AI to transform customer interactions, campaign design, lead generation, and personalized outreach, driving higher engagement and conversion rates.',
    'industry_description.hr': 'In HR & Recruiting, generative AI is streamlining candidate screening, interview processes, employee onboarding, and creating personalized learning experiences, leading to more efficient talent acquisition and development.',
    'industry_description.finance': 'The Finance & Accounting industry is employing generative AI for advanced financial analysis, automated reporting, fraud detection, and personalized financial advice, enhancing decision-making and operational efficiency.',
    'industry_description.legal': 'Legal firms are utilizing generative AI to accelerate contract review, legal research, document analysis, and case preparation, significantly reducing time spent on routine tasks and improving accuracy.',
    'industry_description.healthcare': 'Healthcare organizations are applying generative AI for medical image analysis, clinical documentation, patient engagement, treatment planning, and drug discovery, leading to improved care outcomes and operational efficiency.',
    'industry_description.education': 'The Education sector is implementing generative AI for personalized learning content, automated assessment, intelligent tutoring, and administrative task automation, creating more engaging and effective learning experiences.',
    'industry_description.realestate': 'In Real Estate, generative AI is transforming property listings, virtual tours, market analysis, and customer relationship management, enhancing the buying, selling, and renting experience.',
    'industry_description.media': 'Media & Entertainment companies are leveraging generative AI for content creation, personalized recommendations, audience analysis, and production automation, driving engagement and operational efficiency.',
    'industry_description.manufacturing': 'The Manufacturing & Logistics industry is employing generative AI for predictive maintenance, supply chain optimization, quality control, and design innovation, increasing productivity and reducing costs.',
    'industry_description.retail': 'Retail & eCommerce businesses are using generative AI for personalized shopping experiences, inventory management, visual search, and customer service automation, enhancing customer satisfaction and operational efficiency.',
    'industry_description.cross': 'Cross-industry applications of generative AI include knowledge management, internal communications, project management, and business intelligence, driving efficiency and innovation across organizational functions.',
  },
  ru: {
    'app.author': 'Автор: CL',
    'home.introduction': 'Комплексный отраслевой анализ 700 реальных примеров применения генеративного ИИ, дающий представление о том, как эта технология трансформирует бизнес в различных секторах.',
    'home.introduction_full': 'Мир переживает революцию Генеративного ИИ. В отличие от предыдущих технологических волн, влияние GenAI охватывает практически все отрасли и роли, создавая возможности для предпринимателей создавать ценные продукты, расширяющие человеческие возможности. Этот сборник представляет реальные приложения, классифицированные по отраслям и архетипам ИИ-агентов, предоставляя вдохновение для вашего следующего проекта.',
    'home.revolution': 'Революция Генеративного ИИ',
    'home.key_agent_types': 'Ключевые Архетипы AI Агентов',
    'home.agent_types_description': 'Изучите шесть основных архетипов ИИ-агентов, которые трансформируют организации в различных отраслях.',
    'home.startup_ideas': 'идей стартапов',
    'home.explore_agent_types': 'Изучить Все Типы Агентов',
    'home.industry_breakdown': 'Анализ По Индустриям',
    'home.industry_description': 'Узнайте, как генеративный ИИ применяется в различных секторах экономики.',
    'home.view_all_industries': 'Просмотреть Все Индустрии',
    'home.ideas_by_archetype': 'AI Идеи по Типу Агента',
    'home.distribution': 'Распределение AI Приложений',
    'home.distribution_description': 'Визуализация распределения приложений генеративного ИИ по отраслям и архетипам агентов.',
    'home.distribution_by_industry': 'Распределение по Индустриям',
    'home.ideas_count': 'AI Приложений',
    'home.ready': 'Готовы Изучать?',
    'home.ready_description': 'Погрузитесь в нашу комплексную коллекцию из 700 реальных приложений генеративного ИИ в различных отраслях.',
    'home.help_telegram': 'Помощь в Telegram',
    'home.join_telegram': 'Помощь в Telegram',
    'nav.home': 'Главная',
    'nav.archetypes': 'Архетипы AI Агентов',
    'nav.industries': 'Индустрии',
    'footer.navigation': 'Навигация',
    'footer.contact': 'Контакты',
    'archetype.customer': 'Агент для Клиентов',
    'archetype.employee': 'Агент для Сотрудников',
    'archetype.creative': 'Креативный Агент',
    'archetype.code': 'Агент Кода',
    'archetype.data': 'Агент Данных',
    'archetype.security': 'Агент Безопасности',
    'industry.automotive': 'Автомобильная и Логистика',
    'industry.financial': 'Финансовые Услуги и Страхование',
    'industry.healthcare': 'Здравоохранение и Фармацевтика',
    'industry.manufacturing': 'Производство и Электроника',
    'industry.retail': 'Розничная Торговля и Э-коммерция',
    'industry.media': 'Медиа и Развлечения',
    'industry.telecom': 'Телекоммуникации и Технологии',
    'industry.energy': 'Энергетика и Коммунальные Услуги',
    'industry.government': 'Государственный и Общественный Сектор',
    'industry.education': 'Образование и Исследования',
    'industry.travel': 'Путешествия и Гостиничный Бизнес',
    'industry.sales': 'Продажи',
    'industry.hr': 'HR',
    'industry.finance': 'Финансы',
    'industry.legal': 'Юридические услуги',
    'industry.real': 'Недвижимость',
    'industry.cross': 'Кросс-индустрия',
    'industries.browse_archetypes': 'Просмотр Типов',
    'industries.title': 'Отрасли',
    'industries.description': 'Узнайте, как генеративный ИИ трансформирует различные секторы экономики на примерах реальных приложений.',
    'industries.search_placeholder': 'Поиск по отраслям...',
    'industries.clear': 'Очистить',
    'industries.no_results': 'Не найдено отраслей, соответствующих вашему запросу.',
    'industry_detail.back': 'Назад к списку отраслей',
    'industry_detail.search_placeholder': 'Поиск идей по компании или описанию...',
    'industry_detail.all': 'Все идеи',
    'industry_detail.no_results': 'Не найдено идей, соответствующих вашему запросу.',
    'industry_detail.visit_website': 'Перейти на сайт',
    // Добавляем описания индустрий на русском
    'industry_description.sales': 'Сектор продаж и маркетинга использует генеративный ИИ для трансформации взаимодействия с клиентами, разработки кампаний, генерации лидов и персонализированного взаимодействия, что приводит к повышению вовлеченности и конверсии.',
    'industry_description.hr': 'В сфере HR и рекрутинга генеративный ИИ оптимизирует отбор кандидатов, процессы собеседований, адаптацию сотрудников и создает персонализированный опыт обучения, что ведет к более эффективному привлечению и развитию талантов.',
    'industry_description.finance': 'Индустрия финансов и бухгалтерии применяет генеративный ИИ для продвинутого финансового анализа, автоматизированной отчетности, выявления мошенничества и персонализированных финансовых консультаций, улучшая процесс принятия решений и операционную эффективность.',
    'industry_description.legal': 'Юридические фирмы используют генеративный ИИ для ускорения проверки контрактов, юридических исследований, анализа документов и подготовки дел, значительно сокращая время, затрачиваемое на рутинные задачи, и повышая точность.',
    'industry_description.healthcare': 'Организации здравоохранения применяют генеративный ИИ для анализа медицинских изображений, клинической документации, взаимодействия с пациентами, планирования лечения и открытия новых лекарств, что приводит к улучшению результатов лечения и операционной эффективности.',
    'industry_description.education': 'Сектор образования внедряет генеративный ИИ для персонализированного учебного контента, автоматизированной оценки, интеллектуального репетиторства и автоматизации административных задач, создавая более увлекательный и эффективный опыт обучения.',
    'industry_description.realestate': 'В сфере недвижимости генеративный ИИ трансформирует объявления о недвижимости, виртуальные туры, анализ рынка и управление взаимоотношениями с клиентами, улучшая опыт покупки, продажи и аренды.',
    'industry_description.media': 'Компании медиа и развлечений используют генеративный ИИ для создания контента, персонализированных рекомендаций, анализа аудитории и автоматизации производства, повышая вовлеченность и операционную эффективность.',
    'industry_description.manufacturing': 'Индустрия производства и логистики применяет генеративный ИИ для предиктивного обслуживания, оптимизации цепочек поставок, контроля качества и инноваций в проектировании, повышая производительность и снижая затраты.',
    'industry_description.retail': 'Предприятия розничной торговли и электронной коммерции используют генеративный ИИ для персонализированного опыта покупок, управления запасами, визуального поиска и автоматизации обслуживания клиентов, повышая удовлетворенность клиентов и операционную эффективность.',
    'industry_description.cross': 'Кросс-индустриальные применения генеративного ИИ включают управление знаниями, внутренние коммуникации, управление проектами и бизнес-аналитику, повышая эффективность и инновации во всех организационных функциях.',
  }
};

type LanguageContextType = {
  language: string;
  toggleLanguage: () => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState('en'); // Default language is English

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ru' : 'en');
  };

  const t = (key: string) => {
    return translations[language as keyof typeof translations][key as keyof typeof translations[keyof typeof translations]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
