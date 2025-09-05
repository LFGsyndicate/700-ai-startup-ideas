
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getDocumentMetadata } from '@/data/mock-data';
import { Industry } from '@/types';
import { industryKeyForLabel } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, X, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { Helmet } from 'react-helmet-async';

export default function IndustriesPage() {
  const { title } = getDocumentMetadata();
  const industries = Object.values(Industry);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { t } = useLanguage();
  
  const filteredIndustries = industries.filter(industry => 
    industry.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="container px-4 py-8 md:py-12 md:px-6">
      <Helmet>
        <title>AI Startup Ideas by Industry - {title}</title>
        <meta name="description" content="Explore generative AI startup ideas across various industries." />
      </Helmet>
      <div className="flex flex-col space-y-6 md:space-y-8">
        <div>
          <h1 className="page-title mb-3">{t('industries.title')}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-[900px]">
            {t('industries.description')}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder={t('industries.search_placeholder')}
              className="flex h-10 w-full rounded-full border border-input bg-background pl-10 pr-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button 
            variant="outline"
            onClick={() => setSearchTerm("")}
            disabled={!searchTerm}
            className="rounded-full border-primary/20 hover:border-primary/50"
          >
            {t('industries.clear')}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIndustries.map((industry) => (
            <Card key={industry} className="card-hover border-primary/10">
              <CardHeader>
                <CardTitle>{t(`industry.${industryKeyForLabel(industry)}`)}</CardTitle>
                <CardDescription>{t('home.explore_agent_types')}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to={`/industries/${encodeURIComponent(industry)}`}>
                  <Button variant="default" className="w-full flex items-center justify-center gap-2">
                    {t('home.view_all_industries')}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
          
          {filteredIndustries.length === 0 && (
            <div className="col-span-full text-center py-8">
              <p className="text-muted-foreground">{t('industries.no_results')}</p>
              <Button variant="link" onClick={() => setSearchTerm("")} className="text-primary">
                {t('industries.clear')}
              </Button>
            </div>
          )}
        </div>
        
        <div className="pt-8 border-t border-primary/10">
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link to="/archetypes" className="flex items-center gap-2">
              {t('industries.browse_archetypes')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
