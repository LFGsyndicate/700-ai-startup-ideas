
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getIndustryDescription, getIdeasByIndustry } from '@/data/mock-data';
import { AgentArchetype, Industry, StartupIdea } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink } from 'lucide-react';

export default function IndustryDetailPage() {
  const { industry } = useParams<{ industry: string }>();
  const [description, setDescription] = useState<string>("");
  const [ideas, setIdeas] = useState<StartupIdea[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeArchetype, setActiveArchetype] = useState<string>("all");
  
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
  
  return (
    <div className="container px-4 py-8 md:py-12 md:px-6">
      <div className="flex flex-col space-y-4 md:space-y-8">
        <div>
          <Link 
            to="/industries" 
            className="text-sm text-muted-foreground hover:text-primary transition-colors mb-2 inline-block"
          >
            ← Back to All Industries
          </Link>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-2">
            {industry}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-[900px]">
            {description}
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search ideas..."
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button 
            variant="outline"
            onClick={() => setSearchTerm("")}
            disabled={!searchTerm}
            className="md:w-auto w-full"
          >
            Clear
          </Button>
        </div>
        
        <Tabs defaultValue="all" onValueChange={setActiveArchetype}>
          <TabsList className="grid grid-cols-3 md:grid-cols-7 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            {archetypes.map((archetype) => (
              <TabsTrigger 
                key={archetype} 
                value={archetype}
                className="hidden md:flex"
              >
                {archetype.split(' ')[0]}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIdeas.map((idea) => (
                <Card key={idea.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{idea.companyName}</CardTitle>
                    <CardDescription>{idea.archetype}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p>{idea.description}</p>
                  </CardContent>
                  <CardFooter>
                    <a 
                      href={idea.link} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-flex items-center gap-2 text-primary hover:underline"
                    >
                      Visit Website <ExternalLink className="h-4 w-4" />
                    </a>
                  </CardFooter>
                </Card>
              ))}
              
              {filteredIdeas.length === 0 && (
                <div className="col-span-full text-center py-8">
                  <p className="text-muted-foreground">No ideas found matching your search.</p>
                  {searchTerm && (
                    <Button variant="link" onClick={() => setSearchTerm("")}>
                      Clear Search
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
                    <Card key={idea.id} className="flex flex-col">
                      <CardHeader>
                        <CardTitle>{idea.companyName}</CardTitle>
                        <CardDescription>{idea.archetype}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <p>{idea.description}</p>
                      </CardContent>
                      <CardFooter>
                        <a 
                          href={idea.link} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="inline-flex items-center gap-2 text-primary hover:underline"
                        >
                          Visit Website <ExternalLink className="h-4 w-4" />
                        </a>
                      </CardFooter>
                    </Card>
                  ))
                }
                
                {filteredIdeas.filter(idea => idea.archetype === archetype).length === 0 && (
                  <div className="col-span-full text-center py-8">
                    <p className="text-muted-foreground">No ideas found matching your search.</p>
                    {searchTerm && (
                      <Button variant="link" onClick={() => setSearchTerm("")}>
                        Clear Search
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
