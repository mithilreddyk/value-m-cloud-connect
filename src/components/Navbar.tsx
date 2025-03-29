
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu, X, Cloud, LogOut } from "lucide-react";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Dashboard", href: "/dashboard", protected: true },
  ];

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-primary/90 to-secondary/90 backdrop-blur-sm border-b shadow-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <Cloud className="h-8 w-8 text-white" />
            <div className="flex flex-col items-start">
              <span className="font-bold text-xl text-white">Value M</span>
              <span className="text-xs text-white/90 font-medium">the cloud company</span>
            </div>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="secondary" size="icon" className="text-white bg-white/20 hover:bg-white/30">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <div className="flex items-center justify-between">
                <Link 
                  to="/" 
                  className="flex items-center gap-2" 
                  onClick={closeMobileMenu}
                >
                  <Cloud className="h-6 w-6 text-primary" />
                  <div className="flex flex-col items-start">
                    <span className="font-bold text-lg">Value M</span>
                    <span className="text-xs text-muted-foreground">the cloud company</span>
                  </div>
                </Link>
                <Button variant="ghost" size="icon" onClick={closeMobileMenu}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="mt-6 flow-root">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => {
                    // Don't render protected items for non-authenticated users
                    if (item.protected && !isAuthenticated) return null;
                    
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={cn(
                          "block px-3 py-2 text-base font-medium rounded-md",
                          location.pathname === item.href 
                            ? "bg-primary/10 text-primary" 
                            : "text-foreground hover:bg-accent"
                        )}
                        onClick={closeMobileMenu}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
                
                <div className="py-6">
                  {isAuthenticated ? (
                    <div className="space-y-3">
                      <p className="px-3 text-sm font-medium text-muted-foreground">
                        Signed in as {user?.name}
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start" 
                        onClick={() => {
                          logout();
                          closeMobileMenu();
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign out
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link to="/login" onClick={closeMobileMenu}>
                        <Button variant="outline" className="w-full">
                          Log in
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => {
            // Don't render protected items for non-authenticated users
            if (item.protected && !isAuthenticated) return null;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-colors rounded-md",
                  location.pathname === item.href 
                    ? "bg-white/20 text-white" 
                    : "text-white hover:bg-white/10"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/90">
                {user?.name}
              </span>
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={logout} 
                className="flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white font-medium"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Sign out
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white font-medium">
                Log in
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
