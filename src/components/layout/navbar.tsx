
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, X, Search, Github, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { useLanguage } from '@/hooks/use-language';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 w-full border-b transition-all duration-200 ${
        scrolled ? 'bg-background/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <div className="flex flex-1 items-center gap-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">700 AI</span>
            <span>Startup Ideas</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/' ? 'text-primary' : 'text-foreground/60'}`}
          >
            {language === 'en' ? 'Home' : 'Главная'}
          </Link>
          <Link 
            to="/archetypes" 
            className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname.startsWith('/archetypes') ? 'text-primary' : 'text-foreground/60'}`}
          >
            {language === 'en' ? 'AI Agent Archetypes' : 'Архетипы AI Агентов'}
          </Link>
          <Link 
            to="/industries" 
            className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname.startsWith('/industries') ? 'text-primary' : 'text-foreground/60'}`}
          >
            {language === 'en' ? 'Industries' : 'Индустрии'}
          </Link>
          <Link to="https://t.me/ruhunt" target="_blank" rel="noreferrer" className="text-sm font-medium transition-colors hover:text-primary">
            Telegram
          </Link>
          <a href="https://aiix.pro" target="_blank" rel="noreferrer" className="text-sm font-medium transition-colors px-3 py-1 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
            {language === 'en' ? 'Order Project' : 'Заказать проект'}
          </a>
        </nav>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleLanguage}>
            <Globe className="h-5 w-5" />
            <span className="sr-only">
              {language === 'en' ? 'Switch to Russian' : 'Переключить на английский'}
            </span>
          </Button>
          <ThemeToggle />
          <Button 
            variant="ghost"
            size="icon" 
            className="md:hidden" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container flex flex-col gap-4 py-4">
            <Link 
              to="/" 
              className={`px-2 py-2 rounded-md text-sm font-medium transition-all hover:bg-muted ${location.pathname === '/' ? 'text-primary bg-muted' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {language === 'en' ? 'Home' : 'Главная'}
            </Link>
            <Link 
              to="/archetypes" 
              className={`px-2 py-2 rounded-md text-sm font-medium transition-all hover:bg-muted ${location.pathname.startsWith('/archetypes') ? 'text-primary bg-muted' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {language === 'en' ? 'AI Agent Archetypes' : 'Архетипы AI Агентов'}
            </Link>
            <Link 
              to="/industries" 
              className={`px-2 py-2 rounded-md text-sm font-medium transition-all hover:bg-muted ${location.pathname.startsWith('/industries') ? 'text-primary bg-muted' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {language === 'en' ? 'Industries' : 'Индустрии'}
            </Link>
            <Link 
              to="https://t.me/ruhunt" 
              target="_blank" 
              rel="noreferrer" 
              className="px-2 py-2 rounded-md text-sm font-medium transition-all hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              Telegram
            </Link>
            <a 
              href="https://aiix.pro" 
              target="_blank" 
              rel="noreferrer" 
              className="px-2 py-2 rounded-md text-sm font-medium transition-all hover:bg-muted text-primary"
              onClick={() => setIsOpen(false)}
            >
              {language === 'en' ? 'Order Project' : 'Заказать проект'}
            </a>
            <div className="flex items-center justify-between border-t pt-4 mt-2">
              <span className="text-sm text-muted-foreground">© 2024 CL</span>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
