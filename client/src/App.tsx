import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFoundPage";
import DashboardPage from "./pages/DashboardPage";
import { PublicRoute } from "./utils/protectors/PublicRoute";
import { ProtectedRoute } from "./utils/protectors/ProtectedRoute";
import KycVerificationPage from "./pages/KycVerificationPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster position="bottom-right" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PublicRoute element={<AuthPage />} />} />
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={<DashboardPage />} />}
            />
            <Route
              path="/dashboard/kyc"
              element={<ProtectedRoute element={<KycVerificationPage />} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
};

export default App;
