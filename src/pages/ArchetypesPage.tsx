
import { Link } from 'react-router-dom';
import { getDocumentMetadata, getAllIdeas } from '@/data/mock-data';
import { AgentArchetype } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { formatApproxCount } from '@/lib/utils';

export default function ArchetypesPage() {
  const { title } = getDocumentMetadata();
  const archetypes = Object.values(AgentArchetype);
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const ideas = getAllIdeas();
    const c: Record<string, number> = {};
    archetypes.forEach(a => { c[a] = ideas.filter(i => i.archetype === a).length; });
    setCounts(c);
  }, []);
  
  return (
    <div className="container px-4 py-8 md:py-12 md:px-6">
      <Helmet>
        <title>AI Agent Archetypes - {title}</title>
        <meta name="description" content="Explore the six fundamental AI agent archetypes and discover startup ideas for each." />
      </Helmet>
      <div className="flex flex-col space-y-4 md:space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-2">AI Agent Archetypes</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-[900px]">
            Every generative AI startup can be categorized into one of these six fundamental agent types, 
            each serving a specific role in augmenting human capabilities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {archetypes.map((archetype) => (
            <Card key={archetype} className="hover-scale transition-all">
              <CardHeader>
                <CardTitle>{archetype}</CardTitle>
                <CardDescription>
                  {counts[archetype] !== undefined ? formatApproxCount(counts[archetype]) : ''}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to={`/archetypes/${encodeURIComponent(archetype)}`}>
                  <Button variant="outline" className="w-full">View Details</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="pt-8 border-t">
          <h2 className="text-2xl font-bold mb-4">About AI Agent Archetypes</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            The AI landscape can be understood through six fundamental agent types, each addressing different aspects of business and human activities.
            Understanding these archetypes helps identify opportunities for innovation and entrepreneurship in the generative AI space.
          </p>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            From customer-facing interactions to internal employee assistance, creative content generation to sophisticated data analysis, 
            each archetype represents a rich domain for building valuable AI-powered products and services.
          </p>
          <div className="mt-6">
            <Button asChild>
              <Link to="/industries">Browse by Industry Instead</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
