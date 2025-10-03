import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LogoFull } from '@/components/Logo';
import Cart from '@/components/Cart';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products' },
    { name: 'Contact', path: '/contact' },
  ];

  const authenticatedLinks = [
    { name: 'My Bookings', path: '/my-bookings' },
    { name: 'My Orders', path: '/my-orders' },
    { name: 'Wishlist', path: '/wishlist' },
  ];

  const partnerLink = { name: 'Be Our Partner', path: '/partner' };

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
            {isAuthenticated && authenticatedLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-smooth"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to={partnerLink.path}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-smooth"
            >
              {partnerLink.name}
            </Link>
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


            {/* Cart - Only show when logged in */}
            {isAuthenticated && <Cart />}

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {user?.name}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/my-bookings')}>
                    My Bookings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/my-orders')}>
                    My Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/wishlist')}>
                    Wishlist
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" size="sm" onClick={() => navigate('/auth')}>
                Login
              </Button>
            )}

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
                  {isAuthenticated && (
                    <>
                      <div className="border-t pt-4">
                        <p className="text-xs text-muted-foreground uppercase mb-2">My Account</p>
                        {authenticatedLinks.map((link) => (
                          <Link
                            key={link.path}
                            to={link.path}
                            className="text-lg font-medium text-foreground/80 block py-2"
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                  <Link
                    to={partnerLink.path}
                    className="text-lg font-medium text-primary"
                  >
                    {partnerLink.name}
                  </Link>
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
