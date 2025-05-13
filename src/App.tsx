
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { MainLayout } from "./components/layout/main-layout";
import HomePage from "./pages/HomePage";
import ArchetypesPage from "./pages/ArchetypesPage";
import ArchetypeDetailPage from "./pages/ArchetypeDetailPage";
import IndustriesPage from "./pages/IndustriesPage";
import IndustryDetailPage from "./pages/IndustryDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import { LanguageProvider } from "./hooks/use-language";

const queryClient = new QueryClient();

// Using HashRouter for GitHub Pages compatibility
const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <HashRouter>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/archetypes" element={<ArchetypesPage />} />
                <Route path="/archetypes/:archetype" element={<ArchetypeDetailPage />} />
                <Route path="/industries" element={<IndustriesPage />} />
                <Route path="/industries/:industry" element={<IndustryDetailPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </HashRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
