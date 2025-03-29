
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
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm border-b">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <Cloud className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl text-foreground">Value M</span>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
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
                  <span className="font-bold text-lg">Value M</span>
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
                  "text-sm font-medium transition-colors",
                  location.pathname === item.href 
                    ? "text-primary" 
                    : "text-foreground hover:text-primary"
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
              <span className="text-sm text-muted-foreground">
                {user?.name}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={logout} 
                className="flex items-center gap-1"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Sign out
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm">
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
