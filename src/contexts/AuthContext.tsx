
import React, { createContext, useState, useContext, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

type User = {
  id: string;
  name: string;
  email: string;
  companyName?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string, companyName: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // For demo purposes, we'll use a mock login
    // In a real app, you would call your authentication API here
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation for demo purposes
      if (email && password.length >= 6) {
        const newUser = {
          id: "12345",
          name: email.split('@')[0],
          email
        };
        
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${newUser.name}!`,
        });
        
        setIsLoading(false);
        return true;
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };

  const signup = async (email: string, password: string, name: string, companyName: string): Promise<boolean> => {
    setIsLoading(true);
    
    // For demo purposes, we'll use a mock signup
    // In a real app, you would call your authentication API here
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (email && password.length >= 6 && name) {
        const newUser = {
          id: `user_${Math.random().toString(36).substring(2, 10)}`,
          name,
          email,
          companyName
        };
        
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        
        toast({
          title: "Account created successfully",
          description: `Welcome to Value M, ${name}!`,
        });
        
        setIsLoading(false);
        return true;
      } else {
        throw new Error("Invalid user information");
      }
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "There was a problem creating your account",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
