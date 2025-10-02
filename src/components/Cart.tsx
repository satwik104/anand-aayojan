import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { ShoppingCart, Trash2, Plus, Minus, Package } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Cart = () => {
  const { items, totalItems, removeItem, updateQuantity, serviceLockingTotal, productTotal, subtotal } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/auth', { state: { from: { pathname: '/checkout' } } });
      return;
    }
    // Navigate to checkout (to be implemented)
    alert('Checkout functionality will be implemented with Razorpay integration');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <Package className="h-16 w-16 text-muted-foreground opacity-50 mb-4" />
            <p className="text-lg font-medium mb-2">Your cart is empty</p>
            <p className="text-sm text-muted-foreground mb-4">Add services or products to get started</p>
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link to="/services">Browse Services</Link>
              </Button>
              <Button asChild>
                <Link to="/products">Shop Products</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full pt-6">
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto space-y-4 pb-4">
              {items.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <h4 className="font-semibold line-clamp-1">{item.name}</h4>
                          {item.type === 'service' && item.packageName && (
                            <p className="text-xs text-muted-foreground">{item.packageName}</p>
                          )}
                          {item.type === 'service' && item.date && (
                            <p className="text-xs text-muted-foreground">
                              {item.date} at {item.time}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        {item.type === 'product' ? (
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                        )}
                        
                        <div className="text-right">
                          {item.type === 'service' && item.lockingAmount ? (
                            <>
                              <p className="text-sm font-bold text-primary">
                                ₹{(item.lockingAmount * item.quantity).toLocaleString()}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                (10% of ₹{(item.price * item.quantity).toLocaleString()})
                              </p>
                            </>
                          ) : (
                            <p className="text-sm font-bold">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="border-t pt-4 space-y-3">
              {serviceLockingTotal > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Service Locking (10%)</span>
                  <span className="font-medium">₹{serviceLockingTotal.toLocaleString()}</span>
                </div>
              )}
              
              {productTotal > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Products Total</span>
                  <span className="font-medium">₹{productTotal.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Total to Pay Now</span>
                <span className="text-primary">₹{(serviceLockingTotal + productTotal).toLocaleString()}</span>
              </div>

              {serviceLockingTotal > 0 && (
                <p className="text-xs text-muted-foreground">
                  Service balance: ₹{(subtotal - productTotal - serviceLockingTotal).toLocaleString()} due after service
                </p>
              )}

              <Button onClick={handleCheckout} className="w-full" size="lg">
                Proceed to Checkout
              </Button>

              {!isAuthenticated && (
                <p className="text-xs text-center text-muted-foreground">
                  You'll need to login to complete checkout
                </p>
              )}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
