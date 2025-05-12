
import { Github, Telegram } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 font-bold text-xl mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">700 AI</span>
              <span>Startup Ideas</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
              A comprehensive collection of real-world generative AI applications and startup opportunities across various industries.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a 
                href="https://t.me/ruhunt" 
                target="_blank" 
                rel="noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Telegram"
              >
                <Telegram className="h-5 w-5" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/archetypes" className="text-sm text-muted-foreground hover:text-primary transition-colors">AI Agent Archetypes</Link>
              </li>
              <li>
                <Link to="/industries" className="text-sm text-muted-foreground hover:text-primary transition-colors">Industries</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://t.me/ruhunt" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Telegram: @ruhunt
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 CL. All rights reserved.
          </p>
          <div className="text-sm text-muted-foreground">
            700 AI Startup Ideas: A Compendium of Real-World Generative AI Applications
          </div>
        </div>
      </div>
    </footer>
  );
}
