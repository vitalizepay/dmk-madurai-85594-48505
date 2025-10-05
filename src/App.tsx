import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Layout } from "@/components/layout/Layout";
import Landing from "@/pages/Landing";
import { Home } from "@/pages/Home";
import { Booths } from "@/pages/Booths";
import { Voters } from "@/pages/Voters";
import { Grievances } from "@/pages/Grievances";
import { Events } from "@/pages/Events";
import { Profile } from "@/pages/Profile";
import { News } from "@/pages/News";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Landing Page (no layout) */}
            <Route path="/" element={<Landing />} />
            
            {/* App Pages (with layout) */}
            <Route path="/app/*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="booths" element={<Booths />} />
                  <Route path="voters" element={<Voters />} />
                  <Route path="grievances" element={<Grievances />} />
                  <Route path="events" element={<Events />} />
                  <Route path="news" element={<News />} />
                  <Route path="profile" element={<Profile />} />
                </Routes>
              </Layout>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
