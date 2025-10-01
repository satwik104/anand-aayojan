import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { LogoFull } from '@/components/Logo';

const Header = () => {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { name: 'Services', path: '/services' },
    { name: 'My Bookings', path: '/my-bookings' },
    { name: 'Admin', path: '/admin' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <LogoFull 
              iconClassName="h-10 w-10 text-primary" 
              textClassName="hidden text-xl font-bold text-foreground sm:block font-serif" 
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-smooth"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            {searchOpen ? (
              <div className="flex items-center space-x-2 animate-fade-in">
                <Input
                  type="search"
                  placeholder="Search services..."
                  className="w-40 sm:w-64"
                  autoFocus
                  onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
                />
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}

            {/* User Menu */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/my-bookings')}
            >
              <User className="h-5 w-5" />
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  <Link to="/" className="text-lg font-medium font-serif">
                    Home
                  </Link>
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="text-lg font-medium text-foreground/80"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
