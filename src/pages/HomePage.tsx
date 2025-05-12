
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDocumentMetadata, getAllIdeas } from '@/data/mock-data';
import { AgentArchetype, Industry, StartupIdea } from '@/types';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export default function HomePage() {
  const [ideas, setIdeas] = useState<StartupIdea[]>([]);
  const { title, author, telegramLink, introduction } = getDocumentMetadata();
  
  useEffect(() => {
    // In a real implementation, this would fetch data from the Google Doc
    const fetchData = async () => {
      const allIdeas = getAllIdeas();
      setIdeas(allIdeas);
    };
    
    fetchData();
  }, []);
  
  // Data for visualizations
  const industryData = Object.values(Industry).map(industry => {
    const count = ideas.filter(idea => idea.industry === industry).length;
    return { name: industry.split(' & ')[0], value: count };
  });
  
  const archetypeData = Object.values(AgentArchetype).map(archetype => {
    const count = ideas.filter(idea => idea.archetype === archetype).length;
    return { name: archetype.split(' ')[0], value: count };
  });
  
  const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658', '#ff8042', '#fa8072', '#ba68c8', '#64b5f6'];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none animate-fade-in">
                {title}
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                A comprehensive collection of real-world generative AI applications for entrepreneurs and innovators.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild className="hover-scale">
                <Link to="/industries">Browse Industries</Link>
              </Button>
              <Button asChild variant="outline" className="hover-scale">
                <Link to="/archetypes">Explore AI Agent Types</Link>
              </Button>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              Compiled by {author} • <a href={telegramLink} target="_blank" rel="noreferrer" className="text-primary hover:underline">Telegram: @ruhunt</a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Introduction section */}
      <section className="content-section">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">The Generative AI Revolution</h2>
              <p className="text-gray-500 dark:text-gray-400">
                {introduction}
              </p>
              <div className="flex gap-4">
                <Button asChild variant="link" className="p-0">
                  <a href={telegramLink} target="_blank" rel="noreferrer" className="hover:underline">Join our Telegram</a>
                </Button>
              </div>
            </div>
            
            {/* Visualization */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-medium mb-4">Ideas by Agent Archetype</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={archetypeData} layout="vertical">
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" radius={[0, 4, 4, 0]}>
                      {archetypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Agent Archetypes Preview */}
      <section className="content-section bg-muted">
        <div className="container px-4 md:px-6">
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">The Six Key AI Agent Archetypes</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400">
              Every GenAI startup can be categorized into one of these six fundamental agent types.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {Object.values(AgentArchetype).map((archetype) => (
              <Link 
                key={archetype} 
                to={`/archetypes/${encodeURIComponent(archetype)}`}
                className="glass-card p-6 hover-scale transition-all"
              >
                <h3 className="text-lg font-medium mb-2">{archetype}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {ideas.filter(idea => idea.archetype === archetype).length} startup ideas
                </p>
              </Link>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button asChild variant="outline">
              <Link to="/archetypes">Explore All Agent Types</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Industries Preview */}
      <section className="content-section">
        <div className="container px-4 md:px-6">
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Industry-by-Industry Breakdown</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400">
              Discover AI startup opportunities across these major industry sectors.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {Object.values(Industry).slice(0, 6).map((industry) => (
              <Link 
                key={industry} 
                to={`/industries/${encodeURIComponent(industry)}`}
                className="glass-card p-6 hover-scale transition-all"
              >
                <h3 className="text-lg font-medium mb-2">{industry}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {ideas.filter(idea => idea.industry === industry).length} startup ideas
                </p>
              </Link>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button asChild variant="outline">
              <Link to="/industries">View All Industries</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Data visualization */}
      <section className="content-section bg-muted">
        <div className="container px-4 md:px-6">
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Distribution of AI Startup Ideas</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400">
              Visualize the spread of AI applications across different industries.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-8">
            <div className="w-full md:w-1/2 h-72 glass-card p-6">
              <h3 className="text-lg font-medium mb-4 text-center">Distribution by Industry</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={industryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {industryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="content-section bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Ready to Explore AI Startup Opportunities?</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400">
                Dive into our comprehensive collection of generative AI applications and find inspiration for your next venture.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild className="hover-scale">
                <Link to="/industries">Browse Industries</Link>
              </Button>
              <Button asChild variant="outline" className="hover-scale">
                <a href={telegramLink} target="_blank" rel="noreferrer">Join our Telegram</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
