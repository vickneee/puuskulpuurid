import { Toaster } from "@/components/ui/toaster.tsx";
import { Toaster as Sonner } from "@/components/ui/sonner.tsx";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider } from "@/contexts/AdminContext";
import { LanguageProvider } from "@/lib/i18n";
// import HomeET from "./pages/HomeET";
// import HomeEN from "./pages/HomeEN";
import Index from "./pages/Index";
import AdminLogin from "./pages/AdminLogin";
// Lazy-load admin and error pages to reduce initial bundle size and avoid shipping
// admin-only code to all users up-front.
import { Suspense, lazy } from "react";

const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <LanguageProvider>
                    <AdminProvider>
                        <Suspense fallback={null}>
                            <Routes>
                                <Route path="/" element={<Index />} />
                                <Route path="/en" element={<Index />} />
                                {/* dedicated gallery routes so tests can navigate directly */}
                                <Route path="/gallery" element={<Index />} />
                                <Route path="/en/gallery" element={<Index />} />
                                <Route path="/admin/login" element={<AdminLogin />} />
                                <Route path="/admin" element={<AdminDashboard />} />
                                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </Suspense>
                    </AdminProvider>
                </LanguageProvider>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
