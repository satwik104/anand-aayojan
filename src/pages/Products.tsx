import { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '@/data/products';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, ShoppingCart, Package, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthGate } from '@/components/AuthGate';
import { addToWishlist } from '@/lib/wishlist';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const { addItem } = useCart();
  const { toast } = useToast();
  const { user } = useAuth();
  const { requireAuth, AuthModal } = useAuthGate();

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: typeof products[0]) => {
    requireAuth(() => {
      addItem({
        id: `product_${product.id}_${Date.now()}`,
        type: 'product',
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      });

      toast({
        title: 'Added to cart! 🛒',
        description: `${product.name} has been added to your cart.`,
      });
    }, 'add to cart');
  };

  const handleWishlist = (product: typeof products[0]) => {
    requireAuth(() => {
      if (!user?.email) return;
      const { added } = addToWishlist(user.email, {
        id: product.id,
        type: 'product',
        name: product.name,
        image: product.image,
        price: product.price,
      });
      toast({
        title: added ? 'Saved to wishlist ❤️' : 'Already in wishlist',
        description: added ? `${product.name} was added to your wishlist.` : undefined,
      });
    }, 'save to wishlist');
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <AuthModal />
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Package className="h-10 w-10 text-primary mr-3" />
            <h1 className="text-4xl font-bold font-serif">Bhaat & Mayera Shopping</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our curated collection of traditional wedding essentials. Quality products delivered to your doorstep.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <Link to={`/products/${product.id}`}>
                    <div className="relative aspect-square overflow-hidden rounded-t-lg">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute top-2 right-2 z-10 rounded-full"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleWishlist(product);
                        }}
                        aria-label="Save to wishlist"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  </Link>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="mb-2">
                    <Badge variant="secondary">{product.category}</Badge>
                  </div>
                  <Link to={`/products/${product.id}`}>
                    <h3 className="font-semibold mb-1 hover:text-primary transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {product.shortDescription}
                  </p>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-2xl font-bold text-primary">₹{product.price.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {product.inventory > 0 ? `${product.inventory} in stock` : 'Out of stock'}
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex-1"
                  >
                    <Link to={`/products/${product.id}`}>View Details</Link>
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.inventory === 0}
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Info Banner */}
        <div className="mt-12 bg-accent/10 border border-accent/20 rounded-lg p-6">
          <h3 className="font-semibold mb-2">📦 Delivery Information</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Free delivery on orders above ₹5,000</li>
            <li>• Standard delivery: 5-7 business days</li>
            <li>• Express delivery available for select products</li>
            <li>• Fresh items (flowers, garlands) delivered on specified date</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Products;
