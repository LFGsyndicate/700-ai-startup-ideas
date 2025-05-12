
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getDocumentMetadata } from '@/data/mock-data';
import { Industry } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function IndustriesPage() {
  const { title } = getDocumentMetadata();
  const industries = Object.values(Industry);
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  const filteredIndustries = industries.filter(industry => 
    industry.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="container px-4 py-8 md:py-12 md:px-6">
      <div className="flex flex-col space-y-4 md:space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-2">Industries</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-[900px]">
            Explore AI startup opportunities across different industry sectors, each with unique challenges and opportunities for generative AI applications.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search industries..."
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button 
            variant="outline"
            onClick={() => setSearchTerm("")}
            disabled={!searchTerm}
          >
            Clear
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIndustries.map((industry) => (
            <Card key={industry} className="hover-scale transition-all">
              <CardHeader>
                <CardTitle>{industry}</CardTitle>
                <CardDescription>Explore AI use cases in this industry</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to={`/industries/${encodeURIComponent(industry)}`}>
                  <Button variant="outline" className="w-full">View Details</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
          
          {filteredIndustries.length === 0 && (
            <div className="col-span-full text-center py-8">
              <p className="text-muted-foreground">No industries found matching your search.</p>
              <Button variant="link" onClick={() => setSearchTerm("")}>
                Clear Search
              </Button>
            </div>
          )}
        </div>
        
        <div className="pt-8 border-t">
          <h2 className="text-2xl font-bold mb-4">Industry-Specific AI Applications</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Each industry presents unique opportunities for applying generative AI to solve specific challenges.
            By exploring these industry-specific applications, entrepreneurs can identify gaps in the market and develop tailored solutions.
          </p>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            From revolutionizing customer service in retail to transforming diagnostic processes in healthcare,
            generative AI is creating unprecedented opportunities across all sectors of the economy.
          </p>
          <div className="mt-6">
            <Button asChild>
              <Link to="/archetypes">Browse by AI Agent Type Instead</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
