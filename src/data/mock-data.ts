
import { AgentArchetype, DocumentData, Industry, StartupIdea } from "@/types";
import { parseKnowledgeBase } from "@/lib/knowledge-parser";

// This is a mock version of what would be fetched from the Google Doc
export const mockData: DocumentData = {
  title: "700 AI Startup Ideas: A Compendium of Real-World Generative AI Applications",
  author: "CL",
  telegramLink: "https://t.me/ruhunt",
  introduction: `The world is witnessing a Generative AI revolution. Unlike previous technological waves, GenAI's impact spans almost every industry and role, creating opportunities for entrepreneurs to build valuable products that augment human capabilities. This compendium presents real-world applications categorized by industry and AI agent archetype, providing inspiration for your next venture.`,
  archetypeDescriptions: {
    [AgentArchetype.Customer]: "Customer Agents handle inbound customer queries, providing personalized support, answering questions about products or services, and facilitating purchasing decisions.",
    [AgentArchetype.Employee]: "Employee Agents assist workers with internal processes, document understanding, meeting summaries, and other workplace tasks to boost productivity.",
    [AgentArchetype.Creative]: "Creative Agents generate or assist with content creation, including images, videos, text, and other media formats.",
    [AgentArchetype.Code]: "Code Agents help with software development, including writing, debugging, and explaining code across various programming languages.",
    [AgentArchetype.Data]: "Data Agents analyze information, generate insights, and create visualizations to support data-driven decision making.",
    [AgentArchetype.Security]: "Security Agents detect threats, monitor systems, and protect organizations from cyber attacks and data breaches."
  },
  industryDescriptions: {
    [Industry.Sales]: "AI applications for marketing campaigns, sales assistance, and customer relationship management.",
    [Industry.HR]: "AI solutions for talent acquisition, onboarding, employee engagement, and human resource management.",
    [Industry.Finance]: "AI tools for financial analysis, accounting, investment management, and regulatory compliance.",
    [Industry.Legal]: "AI applications for contract analysis, legal research, compliance monitoring, and case management.",
    [Industry.Healthcare]: "AI solutions for patient care, medical diagnostics, healthcare administration, and research.",
    [Industry.Education]: "AI tools for personalized learning, educational content creation, and academic administration.",
    [Industry.RealEstate]: "AI applications for property valuation, virtual tours, market analysis, and property management.",
    [Industry.Media]: "AI solutions for content creation, production, distribution, and audience engagement.",
    [Industry.Manufacturing]: "AI tools for supply chain optimization, quality control, predictive maintenance, and production planning.",
    [Industry.Retail]: "AI applications for inventory management, personalized recommendations, and customer experience.",
    [Industry.Other]: "AI solutions that span multiple industries or don't fit neatly into the above categories."
  },
  startupIdeas: []
};

// Initialize with parsed data from knowledge base
mockData.startupIdeas = parseKnowledgeBase();

// If we don't have enough ideas from the knowledge base, supplement with generated ones
if (mockData.startupIdeas.length < 100) {
  // Generate additional mock data
  const additionalIdeas = generateMockStartupIdeas();
  
  // Add only as many as needed to reach 700
  const neededCount = Math.max(0, 700 - mockData.startupIdeas.length);
  mockData.startupIdeas = [
    ...mockData.startupIdeas,
    ...additionalIdeas.slice(0, neededCount)
  ];
}

function generateMockStartupIdeas(): StartupIdea[] {
  // Generate some sample data for the prototype
  const ideas: StartupIdea[] = [];
  
  const companyPrefixes = ["AI", "Gen", "Smart", "Neural", "Deep", "Future", "Tech", "Quantum", "Data", "Cognitive"];
  const companySuffixes = ["Labs", "AI", "Tech", "Solutions", "Intelligence", "Systems", "Mind", "Logic", "Insight", "Vision"];
  
  let id = mockData.startupIdeas.length + 1;
  
  // For each industry
  Object.values(Industry).forEach(industry => {
    // For each archetype
    Object.values(AgentArchetype).forEach(archetype => {
      // Add multiple sample ideas per combination
      for (let i = 0; i < 10; i++) {
        const companyName = `${companyPrefixes[Math.floor(Math.random() * companyPrefixes.length)]}${companySuffixes[Math.floor(Math.random() * companySuffixes.length)]}`;
        
        ideas.push({
          id: `idea-${id++}`,
          companyName,
          description: `An AI ${archetype} that helps businesses in the ${industry} industry by automating key processes and improving outcomes.`,
          link: "#",
          archetype,
          industry
        });
      }
    });
  });
  
  return ideas;
}

export function getAllIdeas(): StartupIdea[] {
  return mockData.startupIdeas;
}

export function getIdeasByIndustry(industry: Industry): StartupIdea[] {
  return mockData.startupIdeas.filter(idea => idea.industry === industry);
}

export function getIdeasByArchetype(archetype: AgentArchetype): StartupIdea[] {
  return mockData.startupIdeas.filter(idea => idea.archetype === archetype);
}

export function getIdeasByIndustryAndArchetype(industry: Industry, archetype: AgentArchetype): StartupIdea[] {
  return mockData.startupIdeas.filter(idea => idea.industry === industry && idea.archetype === archetype);
}

export function getArchetypeDescription(archetype: AgentArchetype): string {
  return mockData.archetypeDescriptions[archetype];
}

export function getIndustryDescription(industry: Industry): string {
  return mockData.industryDescriptions[industry];
}

export function getDocumentMetadata() {
  return {
    title: mockData.title,
    author: mockData.author,
    telegramLink: mockData.telegramLink,
    introduction: mockData.introduction
  };
}
