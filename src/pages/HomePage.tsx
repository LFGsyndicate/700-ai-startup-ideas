
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDocumentMetadata, getAllIdeas } from '@/data/mock-data';
import { AgentArchetype, Industry, StartupIdea } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink } from "lucide-react";
import { useLanguage } from '@/hooks/use-language';
import { DataCharts } from '@/components/visualizations/DataCharts';
import { IntroSection } from '@/components/visualizations/IntroSection';

export default function HomePage() {
  const [ideas, setIdeas] = useState<StartupIdea[]>([]);
  const { title, author, telegramLink } = getDocumentMetadata();
  const { t } = useLanguage();
  
  useEffect(() => {
    const fetchData = async () => {
      const allIdeas = getAllIdeas();
      setIdeas(allIdeas);
    };
    
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero section */}
      <section className="green-gradient py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                {title}
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-700 dark:text-gray-300 md:text-xl">
                {t('home.introduction')}
              </p>
            </div>
            <div className="flex flex-col gap-3 min-[400px]:flex-row">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 transition-all">
                <Link to="/industries">
                  {t('nav.industries')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary/20 hover:border-primary/50">
                <Link to="/archetypes">
                  {t('nav.archetypes')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-4 text-sm text-muted-foreground flex items-center justify-center gap-2">
              {t('app.author')} • 
              <a href={telegramLink} target="_blank" rel="noreferrer" className="text-primary hover:underline flex items-center gap-1">
                Telegram: @ruhunt
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Introduction section */}
      <section className="content-section">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <IntroSection />
            
            {/* Visualization */}
            <div className="glass-card p-6 card-hover">
              <h3 className="text-lg font-medium mb-4">{t('home.ideas_by_archetype')}</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ideas.length > 0 ? Object.values(AgentArchetype).map(archetype => {
                    const count = ideas.filter(idea => idea.archetype === archetype).length;
                    return { 
                      name: archetype.split(' ')[0],
                      displayName: t(`archetype.${archetype.split(' ')[0].toLowerCase()}`),
                      value: count 
                    };
                  }) : []} layout="vertical">
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="displayName" width={80} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderColor: '#10B981',
                        borderRadius: '0.5rem',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value) => [value, t('home.ideas_count')]}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {ideas.length > 0 && Object.values(AgentArchetype).map((_, index) => (
                        <Cell key={`cell-${index}`} fill={['#10B981', '#34D399', '#6EE7B7', '#A7F3D0', '#D1FAE5', '#ECFDF5'][index % 6]} />
                      ))}
                      <LabelList 
                        dataKey="value"
                        position="right"
                        style={{ fill: '#0f172a', fontSize: 12, fontWeight: 500 }}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Agent Archetypes Preview */}
      <section className="content-section green-gradient">
        <div className="container px-4 md:px-6">
          <div className="space-y-6 text-center">
            <h2 className="section-title">{t('home.key_agent_types')}</h2>
            <p className="mx-auto max-w-[700px] text-gray-700 dark:text-gray-300">
              {t('home.agent_types_description')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {Object.values(AgentArchetype).map((archetype, index) => (
              <Link 
                key={archetype} 
                to={`/archetypes/${encodeURIComponent(archetype)}`}
                className="glass-card p-6 card-hover"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-lg font-bold text-primary">{index + 1}</span>
                </div>
                <h3 className="text-lg font-medium mb-2">{t(`archetype.${archetype.split(' ')[0].toLowerCase()}`)}</h3>
                <p className="text-sm text-muted-foreground">
                  {ideas.filter(idea => idea.archetype === archetype).length} {t('home.startup_ideas')}
                </p>
              </Link>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button asChild variant="outline" className="border-primary/20 hover:border-primary/50">
              <Link to="/archetypes">{t('home.explore_agent_types')}</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Industries Preview */}
      <section className="content-section">
        <div className="container px-4 md:px-6">
          <div className="space-y-6 text-center">
            <h2 className="section-title">{t('home.industry_breakdown')}</h2>
            <p className="mx-auto max-w-[700px] text-gray-700 dark:text-gray-300">
              {t('home.industry_description')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {Object.values(Industry).slice(0, 6).map((industry) => (
              <Link 
                key={industry} 
                to={`/industries/${encodeURIComponent(industry)}`}
                className="glass-card p-6 card-hover"
              >
                <h3 className="text-lg font-medium mb-2">{t(`industry.${industry.split(' & ')[0].toLowerCase()}`)}</h3>
                <p className="text-sm text-muted-foreground">
                  {ideas.filter(idea => idea.industry === industry).length} {t('home.startup_ideas')}
                </p>
              </Link>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button asChild variant="outline" className="border-primary/20 hover:border-primary/50">
              <Link to="/industries">{t('home.view_all_industries')}</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Data visualization */}
      <section className="content-section green-gradient">
        <div className="container px-4 md:px-6">
          <div className="space-y-6 text-center">
            <h2 className="section-title">{t('home.distribution')}</h2>
            <p className="mx-auto max-w-[700px] text-gray-700 dark:text-gray-300">
              {t('home.distribution_description')}
            </p>
          </div>
          
          {/* Data Charts Section */}
          <div className="mt-8">
            <DataCharts ideas={ideas} />
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="content-section green-gradient-bright">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl text-white">{t('home.ready')}</h2>
              <p className="mx-auto max-w-[700px] text-white/90">
                {t('home.ready_description')}
              </p>
            </div>
            <div className="flex flex-col gap-3 min-[400px]:flex-row">
              <Button asChild className="bg-white text-primary hover:bg-white/90">
                <Link to="/industries">{t('nav.industries')}</Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white/20">
                <a href={telegramLink} target="_blank" rel="noreferrer">{t('home.join_telegram')}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
