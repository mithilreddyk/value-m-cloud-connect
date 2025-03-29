
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Chatbot from "./Chatbot";
import { useAuth } from "@/contexts/AuthContext";

interface PageLayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  requireAuth = false 
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // If the page requires authentication and the user is not authenticated,
  // redirect them to the login page
  if (requireAuth && !isLoading && !isAuthenticated) {
    window.location.href = "/login";
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Chatbot />
    </div>
  );
};

export default PageLayout;
