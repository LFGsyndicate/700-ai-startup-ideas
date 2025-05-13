
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getIndustryDescription, getIdeasByIndustry } from '@/data/mock-data';
import { AgentArchetype, Industry, StartupIdea } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, Search, X, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

export default function IndustryDetailPage() {
  const { industry } = useParams<{ industry: string }>();
  const [description, setDescription] = useState<string>("");
  const [ideas, setIdeas] = useState<StartupIdea[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeArchetype, setActiveArchetype] = useState<string>("all");
  const { t, language } = useLanguage();
  
  useEffect(() => {
    if (industry) {
      const decodedIndustry = decodeURIComponent(industry) as Industry;
      
      // In a real implementation, this would fetch data from the Google Doc
      setDescription(getIndustryDescription(decodedIndustry));
      setIdeas(getIdeasByIndustry(decodedIndustry));
    }
  }, [industry]);
  
  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = 
      idea.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      idea.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesArchetype = activeArchetype === "all" || idea.archetype === activeArchetype;
    
    return matchesSearch && matchesArchetype;
  });
  
  // Group ideas by archetype
  const archetypes = Object.values(AgentArchetype);
  const ideasByArchetype = archetypes.reduce((acc, archetype) => {
    acc[archetype] = ideas.filter(idea => idea.archetype === archetype);
    return acc;
  }, {} as Record<string, StartupIdea[]>);

  // Функция для получения локализованного описания компании
  const getLocalizedDescription = (idea: StartupIdea) => {
    // Если русский язык и есть русское описание, используем его
    if (language === 'ru' && idea.descriptionRu) {
      return idea.descriptionRu;
    }
    // Иначе используем оригинальное описание на английском
    return idea.description;
  };
  
  return (
    <div className="container px-4 py-8 md:py-12 md:px-6">
      <div className="flex flex-col space-y-6 md:space-y-8">
        <div>
          <Link 
            to="/industries" 
            className="text-sm text-primary hover:text-primary/80 transition-colors mb-3 inline-flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('industry_detail.back')}
          </Link>
          <h1 className="page-title mb-3">
            {industry && t(`industry.${(industry as string).split(' & ')[0].toLowerCase()}`)}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-[900px]">
            {language === 'ru' ? t(`industry_description.${(industry as string).split(' & ')[0].toLowerCase()}`) : description}
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder={t('industry_detail.search_placeholder')}
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
            className="md:w-auto w-full rounded-full border-primary/20 hover:border-primary/50"
          >
            {t('industries.clear')}
          </Button>
        </div>
        
        <Tabs defaultValue="all" onValueChange={setActiveArchetype} className="w-full">
          <TabsList className="inline-flex h-auto p-1 bg-muted rounded-full w-full md:w-auto overflow-x-auto mb-6">
            <TabsTrigger 
              value="all" 
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {t('industry_detail.all')}
            </TabsTrigger>
            {archetypes.map((archetype) => (
              <TabsTrigger 
                key={archetype} 
                value={archetype}
                className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground whitespace-nowrap"
              >
                {t(`archetype.${archetype.split(' ')[0].toLowerCase()}`)}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIdeas.map((idea) => (
                <Card key={idea.id} className="flex flex-col card-hover border-primary/10">
                  <CardHeader>
                    <CardTitle className="text-xl">{idea.companyName}</CardTitle>
                    <CardDescription>
                      {t(`archetype.${idea.archetype.split(' ')[0].toLowerCase()}`)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-gray-600 dark:text-gray-300">
                      {getLocalizedDescription(idea)}
                    </p>
                  </CardContent>
                  <CardFooter className="border-t border-primary/5 pt-4">
                    <a 
                      href={idea.link} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                    >
                      {t('industry_detail.visit_website')} 
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </CardFooter>
                </Card>
              ))}
              
              {filteredIdeas.length === 0 && (
                <div className="col-span-full text-center py-8">
                  <p className="text-muted-foreground">{t('industry_detail.no_results')}</p>
                  {searchTerm && (
                    <Button variant="link" onClick={() => setSearchTerm("")} className="text-primary">
                      {t('industries.clear')}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
          
          {archetypes.map((archetype) => (
            <TabsContent key={archetype} value={archetype}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredIdeas
                  .filter(idea => idea.archetype === archetype)
                  .map((idea) => (
                    <Card key={idea.id} className="flex flex-col card-hover border-primary/10">
                      <CardHeader>
                        <CardTitle className="text-xl">{idea.companyName}</CardTitle>
                        <CardDescription>
                          {t(`archetype.${idea.archetype.split(' ')[0].toLowerCase()}`)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <p className="text-gray-600 dark:text-gray-300">
                          {getLocalizedDescription(idea)}
                        </p>
                      </CardContent>
                      <CardFooter className="border-t border-primary/5 pt-4">
                        <a 
                          href={idea.link} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                        >
                          {t('industry_detail.visit_website')} 
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </CardFooter>
                    </Card>
                  ))
                }
                
                {filteredIdeas.filter(idea => idea.archetype === archetype).length === 0 && (
                  <div className="col-span-full text-center py-8">
                    <p className="text-muted-foreground">{t('industry_detail.no_results')}</p>
                    {searchTerm && (
                      <Button variant="link" onClick={() => setSearchTerm("")} className="text-primary">
                        {t('industries.clear')}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
