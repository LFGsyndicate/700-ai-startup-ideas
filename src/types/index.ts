
// AI Agent Archetypes
export enum AgentArchetype {
  Customer = "Customer Agent",
  Employee = "Employee Agent",
  Creative = "Creative Agent",
  Code = "Code Agent",
  Data = "Data Agent",
  Security = "Security Agent"
}

// Industry categories
export enum Industry {
  Sales = "Sales & Marketing",
  HR = "HR & Recruiting",
  Finance = "Finance & Accounting",
  Legal = "Legal",
  Healthcare = "Healthcare",
  Education = "Education",
  RealEstate = "Real Estate",
  Media = "Media & Entertainment",
  Manufacturing = "Manufacturing & Logistics",
  Retail = "Retail & eCommerce",
  Other = "Cross-Industry & Other"
}

// Startup idea interface
export interface StartupIdea {
  id: string;
  companyName: string;
  description: string;
  link: string;
  archetype: AgentArchetype;
  industry: Industry;
}

// Google Doc data structure
export interface DocumentData {
  title: string;
  author: string;
  telegramLink: string;
  introduction: string;
  archetypeDescriptions: Record<AgentArchetype, string>;
  industryDescriptions: Record<Industry, string>;
  startupIdeas: StartupIdea[];
}
