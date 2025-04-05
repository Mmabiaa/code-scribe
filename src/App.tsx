
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Learn from "./pages/Learn";
import Community from "./pages/Community";
import Collaborate from "./pages/Collaborate";
import Assistant from "./pages/Assistant";
import Resources from "./pages/Resources";
import Progress from "./pages/Progress";
import Quizzes from "./pages/Quizzes";
import Workshops from "./pages/Workshops";
import Mentorship from "./pages/Mentorship";
import Showcase from "./pages/Showcase";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/community" element={<Community />} />
          <Route path="/collaborate" element={<Collaborate />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/showcase" element={<Showcase />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
