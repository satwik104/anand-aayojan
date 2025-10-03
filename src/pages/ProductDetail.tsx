import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ShoppingCart, ArrowLeft, Minus, Plus, Package } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useAuthGate } from '@/components/AuthGate';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();
  const { requireAuth, AuthModal } = useAuthGate();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h2 className="text-2xl font-bold mb-2">Product not found</h2>
          <p className="text-muted-foreground mb-4">The product you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    requireAuth(() => {
      addItem({
        id: `product_${product.id}_${Date.now()}`,
        type: 'product',
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
      });

      toast({
        title: 'Added to cart! 🛒',
        description: `${quantity}x ${product.name} has been added to your cart.`,
      });
    }, 'add to cart');
  };

  const incrementQuantity = () => {
    if (quantity < product.inventory) {
      setQuantity(q => q + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

  return (
    <>
      <AuthModal />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div>
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <Badge variant="secondary" className="mb-2">{product.category}</Badge>
              <h1 className="text-4xl font-bold font-serif mb-2">{product.name}</h1>
              <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-primary">₹{product.price.toLocaleString()}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {product.inventory > 0 ? (
                  <span className="text-green-600 font-medium">✓ In Stock ({product.inventory} available)</span>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </p>
            </div>

            <div className="mb-6">
              <p className="text-muted-foreground">{product.fullDescription}</p>
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-medium mb-2">Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map(tag => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-2">Quantity:</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (val >= 1 && val <= product.inventory) {
                        setQuantity(val);
                      }
                    }}
                    className="w-16 text-center border-0 focus-visible:ring-0"
                    min={1}
                    max={product.inventory}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={incrementQuantity}
                    disabled={quantity >= product.inventory}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  Total: ₹{(product.price * quantity).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={product.inventory === 0}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
            </div>

            {/* Delivery Info */}
            <Card className="mt-6 border-accent/20 bg-accent/5">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">📦 Delivery Information</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Standard delivery: 5-7 business days</li>
                  <li>• Free delivery on orders above ₹5,000</li>
                  <li>• Cash on delivery available</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold font-serif mb-6">More from {product.category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map(relatedProduct => (
                <Card key={relatedProduct.id} className="hover:shadow-lg transition-shadow">
                  <Link to={`/products/${relatedProduct.id}`}>
                    <div className="aspect-square overflow-hidden rounded-t-lg">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="h-full w-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  </Link>
                  <CardContent className="p-4">
                    <Link to={`/products/${relatedProduct.id}`}>
                      <h3 className="font-semibold mb-1 hover:text-primary transition-colors line-clamp-1">
                        {relatedProduct.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {relatedProduct.shortDescription}
                    </p>
                    <p className="text-xl font-bold text-primary">₹{relatedProduct.price.toLocaleString()}</p>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductDetail;
