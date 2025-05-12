/**
 * This file contains the logic to parse the 700 AI startup ideas from the knowledge base
 * and return them in a structured format
 */

import { AgentArchetype, Industry, StartupIdea } from "@/types";

// This will be filled with data from the knowledge base
export const parseKnowledgeBase = (): StartupIdea[] => {
  // We'll parse the text in the knowledge base to create a structured array of startup ideas
  const allIdeas: StartupIdea[] = [];
  let id = 1;
  
  // Quick sample data - the real data would come from the knowledge base parsing
  // Here are sample ideas per industry and archetype from the knowledge base
  
  // Automotive & Logistics
  addSampleIdeas(allIdeas, "Volkswagen", "Multimodal virtual assistant integrated into the myVW app that uses Google's Gemini models to provide instant explanations for dashboard indicators.", AgentArchetype.Customer, Industry.Manufacturing, "https://www.vw.com/en/owners-and-services/connectivity-and-apps/myvw-app.html", id++);
  
  addSampleIdeas(allIdeas, "Uber Technologies", "Uses AI for large-scale data annotation, product testing, and content localization for over 100 languages to support global operations.", AgentArchetype.Employee, Industry.Manufacturing, "https://www.uber.com/us/en/scaled-solutions/generative-ai/", id++);
  
  addSampleIdeas(allIdeas, "Mercedes-Benz", "Integration of GenAI into the MBUX infotainment system to create a highly personalized in-car interface with proactive suggestions.", AgentArchetype.Customer, Industry.Manufacturing, "https://media.mercedes-benz.com/", id++);
  
  addSampleIdeas(allIdeas, "BMW", "Leveraging AI and machine vision in its manufacturing plants for electric vehicle component production.", AgentArchetype.Employee, Industry.Manufacturing, "https://www.bmwgroup-werke.com/munich/en/innovation/production-of-the-future.html", id++);
  
  addSampleIdeas(allIdeas, "Tesla", "Using generative AI to create synthetic data for training and enhancing its Full Self-Driving software.", AgentArchetype.Data, Industry.Manufacturing, "https://www.tesla.com/AI", id++);
  
  // Financial Services & Insurance
  addSampleIdeas(allIdeas, "Citi", "Deployed AI coding tools to 30,000 developers to accelerate software development.", AgentArchetype.Code, Industry.Finance, "https://www.citigroup.com/global/news/press-room", id++);
  
  addSampleIdeas(allIdeas, "Deutsche Bank", "Created DB Lumina, an AI-powered research tool that drastically accelerates financial research report creation.", AgentArchetype.Employee, Industry.Finance, "https://www.db.com/news", id++);
  
  addSampleIdeas(allIdeas, "Morgan Stanley", "Launched AI @ Morgan Stanley Assistant, a GenAI-powered chatbot providing Financial Advisors quick access to the firm's content library.", AgentArchetype.Employee, Industry.Finance, "https://www.morganstanley.com/articles/ai-assistant-financial-advisors", id++);
  
  addSampleIdeas(allIdeas, "JPMorgan Chase", "Deployed GenAI toolkit to over 200,000 employees, with more than half using it multiple times a day.", AgentArchetype.Employee, Industry.Finance, "https://www.jpmorganchase.com/technology/artificial-intelligence", id++);
  
  addSampleIdeas(allIdeas, "Klarna", "Deployed a generative AI-based customer service agent capable of handling the workload equivalent of 700 human support agents.", AgentArchetype.Customer, Industry.Finance, "https://www.klarna.com/us/customer-service/", id++);
  
  // Healthcare, Pharmaceuticals & Life Sciences
  addSampleIdeas(allIdeas, "Freenome", "Developing blood tests for early cancer detection using a multiomics platform with AI to identify signatures from a standard blood draw.", AgentArchetype.Data, Industry.Healthcare, "https://www.freenome.com/", id++);
  
  addSampleIdeas(allIdeas, "Mayo Clinic", "Using AI tools to enable researchers to explore and analyze over 50 petabytes of de-identified clinical data.", AgentArchetype.Data, Industry.Healthcare, "https://www.mayoclinic.org/research/artificial-intelligence", id++);
  
  addSampleIdeas(allIdeas, "Suki AI", "Provides an AI voice assistant that automatically generates clinical documentation from patient-clinician conversations.", AgentArchetype.Employee, Industry.Healthcare, "https://www.suki.ai/", id++);
  
  addSampleIdeas(allIdeas, "Pfizer", "Leverages AWS GenAI tools for accelerated drug development, cutting research data search time by 80%.", AgentArchetype.Data, Industry.Healthcare, "https://www.pfizer.com/science/research-development/artificial-intelligence", id++);
  
  addSampleIdeas(allIdeas, "Hippocratic AI", "Developing safety-focused Large Language Models specifically for healthcare to create generative AI healthcare agents.", AgentArchetype.Customer, Industry.Healthcare, "https://www.hippocraticai.com/", id++);
  
  // Other examples from other industries would be added in a similar fashion
  // ...

  // More ideas would be parsed from the knowledge base, reaching 700 total

  return allIdeas;
};

function addSampleIdeas(
  allIdeas: StartupIdea[],
  companyName: string,
  description: string,
  archetype: AgentArchetype,
  industry: Industry,
  link: string,
  id: number
) {
  allIdeas.push({
    id: `idea-${id}`,
    companyName,
    description,
    link,
    archetype,
    industry
  });
}
