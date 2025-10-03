import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { ordersApi, paymentsApi } from '@/services/api';
import { initiateRazorpayPayment } from '@/lib/payment';
import { ShoppingBag, CreditCard } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { items, subtotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    pincode: '',
    phone: user?.phone || '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth', { state: { from: '/checkout' } });
      return;
    }

    if (items.length === 0) {
      navigate('/products');
    }
  }, [isAuthenticated, items, navigate]);

  const handleCheckout = async () => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      const cartItems = items.map(item => ({
        productId: item.id,
        productName: item.name,
        qty: item.quantity,
        price: item.price,
      }));

      const totalAmount = subtotal;
      const shipping = 100; // Fixed shipping for now

      const response = await ordersApi.create({
        cartItems,
        totalAmount: totalAmount + shipping,
        shipping,
        address,
      });

      // Initiate Razorpay payment
      initiateRazorpayPayment({
        orderId: response.razorpayOrder.id,
        amount: (totalAmount + shipping) * 100, // Convert to paise
        currency: 'INR',
        name: 'AnandAyojan',
        description: 'Bhaat & Mayera Order',
        prefill: {
          name: user.name,
          email: user.email,
          contact: address.phone,
        },
        onSuccess: async (paymentResponse: any) => {
          try {
            await paymentsApi.verify({
              orderId: response.orderId,
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_order_id: paymentResponse.razorpay_order_id,
              razorpay_signature: paymentResponse.razorpay_signature,
            });

            clearCart();
            toast.success('Order placed successfully!');
            navigate('/my-orders');
          } catch (error) {
            toast.error('Payment verification failed');
          }
        },
        onFailure: (error: any) => {
          toast.error('Payment failed: ' + error.error);
        },
      });
    } catch (error: any) {
      toast.error(error.message || 'Failed to create order');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Shipping Address */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="street">Street Address</Label>
                  <Textarea
                    id="street"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    placeholder="Enter your street address"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      placeholder="State"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      value={address.pincode}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                      placeholder="Pincode"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      placeholder="Phone"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="bg-card border rounded-lg p-6 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                </div>
              ))}
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>₹100</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total</span>
                  <span>₹{(subtotal + 100).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={handleCheckout}
                disabled={isSubmitting}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
