import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthGate } from '@/components/AuthGate';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CircleAlert as AlertCircle, Heart, Trash2 } from 'lucide-react';

const Wishlist = () => {
  const { isAuthenticated, user } = useAuth();
  const { requireAuth, AuthModal } = useAuthGate();
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      requireAuth(() => {}, 'view your wishlist');
      navigate('/');
      return;
    }

    loadWishlist();
  }, [isAuthenticated, navigate, requireAuth]);

  const loadWishlist = () => {
    // Load from localStorage for now (would be server-side in production)
    const saved = localStorage.getItem(`aa_wishlist_${user?.email}`);
    if (saved) {
      setWishlistItems(JSON.parse(saved));
    }
  };

  const removeFromWishlist = (itemId: string) => {
    if (!isAuthenticated) return;
    const updated = wishlistItems.filter(item => item.id !== itemId);
    setWishlistItems(updated);
    localStorage.setItem(`aa_wishlist_${user?.email}`, JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen gradient-festive py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold font-serif flex items-center gap-2">
              <Heart className="h-8 w-8 text-primary" />
              My Wishlist
            </h1>
            <p className="text-muted-foreground">Save your favorite items</p>
          </div>

          {wishlistItems.length === 0 ? (
            <Card className="shadow-soft">
              <CardContent className="p-12 text-center">
                <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">Your wishlist is empty</p>
                <p className="text-muted-foreground mb-6">
                  Start adding items you love!
                </p>
                <Button asChild>
                  <a href="/products">Browse Products</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item) => (
                <Card key={item.id} className="shadow-soft hover:shadow-medium transition-shadow">
                  <CardContent className="p-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="font-semibold mb-2">{item.name}</h3>
                    <p className="text-primary font-bold mb-4">₹{item.price?.toLocaleString()}</p>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => navigate(item.type === 'service' ? `/services/${item.id}` : `/products/${item.id}`)}
                      >
                        View Details
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <AuthModal />
    </div>
  );
};

export default Wishlist;
