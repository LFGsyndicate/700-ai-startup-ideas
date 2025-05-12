
import HomePage from './HomePage';
import { useLanguage } from '@/hooks/use-language';
import { useEffect } from 'react';

const Index = () => {
  const { language } = useLanguage();
  
  useEffect(() => {
    // Update document title based on language
    document.title = language === 'en' 
      ? '700 AI Startup Ideas: A Compendium of Real-World Generative AI Applications'
      : '700 идей AI-стартапов: Сборник реальных приложений генеративного ИИ';
      
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', language === 'en'
        ? 'A comprehensive collection of real-world generative AI applications and startup opportunities across various industries.'
        : 'Комплексная коллекция реальных применений генеративного ИИ и возможностей для стартапов в различных отраслях.');
    }
    
    // Update Open Graph meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', language === 'en'
        ? '700 AI Startup Ideas: A Compendium'
        : '700 идей AI-стартапов: Сборник');
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', language === 'en'
        ? 'A comprehensive collection of real-world generative AI applications and startup opportunities across various industries.'
        : 'Комплексная коллекция реальных применений генеративного ИИ и возможностей для стартапов в различных отраслях.');
    }
  }, [language]);
  
  return <HomePage />;
};

export default Index;
