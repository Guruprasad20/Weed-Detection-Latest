import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import { LanguageProvider } from "@/hooks/useLanguage";
import ProtectedRoute from "@/components/ProtectedRoute";
import AppLayout from "@/components/AppLayout";
import Index from "./pages/Index.tsx";
import Auth from "./pages/Auth.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import NotFound from "./pages/NotFound.tsx";
import OAuthConsent from "./pages/OAuthConsent.tsx";
import FarmDashboard from "./pages/app/FarmDashboard";
import Detection from "./pages/app/Detection";
import Analytics from "./pages/app/Analytics";
import SmartSprayer from "./pages/app/SmartSprayer";
import DroneMonitoring from "./pages/app/DroneMonitoring";
import Reports from "./pages/app/Reports";
import TechStack from "./pages/app/TechStack";
import AboutProject from "./pages/app/AboutProject";
import ContactPage from "./pages/app/ContactPage";
import ResetPassword from "./pages/ResetPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/signup" element={<Auth />} />
                <Route path="/forgot-password" element={<Auth />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/.lovable/oauth/consent" element={<OAuthConsent />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/app" element={<AppLayout />}>
                  <Route index element={<FarmDashboard />} />
                  <Route path="detection" element={<Detection />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="sprayer" element={<SmartSprayer />} />
                  <Route path="drone" element={<DroneMonitoring />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="tech" element={<TechStack />} />
                  <Route path="about" element={<AboutProject />} />
                  <Route path="contact" element={<ContactPage />} />
                </Route>
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
