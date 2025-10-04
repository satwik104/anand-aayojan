import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthGate } from '@/components/AuthGate';
import { useNavigate } from 'react-router-dom';
import { ordersApi } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Package, CircleAlert as AlertCircle } from 'lucide-react';

const MyOrders = () => {
  const { isAuthenticated } = useAuth();
  const { requireAuth, AuthModal } = useAuthGate();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      requireAuth(() => {}, 'view your orders');
      navigate('/');
      return;
    }

    loadOrders();
  }, [isAuthenticated, navigate, requireAuth]);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const response = await ordersApi.getAll();
      setOrders(response.orders || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load orders',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      pending: { variant: 'secondary', label: 'Pending' },
      confirmed: { variant: 'default', label: 'Confirmed' },
      shipped: { variant: 'default', label: 'Shipped' },
      delivered: { variant: 'outline', label: 'Delivered' },
      cancelled: { variant: 'destructive', label: 'Cancelled' },
    };
    const config = variants[status] || variants.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="min-h-screen gradient-festive py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold font-serif">My Orders</h1>
            <p className="text-muted-foreground">Track your Bhaat & Mayera purchases</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <Card className="shadow-soft">
              <CardContent className="p-12 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">No orders found</p>
                <p className="text-muted-foreground mb-6">
                  You haven't placed any orders yet
                </p>
                <Button asChild>
                  <a href="/products">Shop Bhaat & Mayera</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {orders.map((order, idx) => (
                <Card key={order.id} className="shadow-medium animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="font-serif">Order #{order.id}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString('en-IN', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {order.items?.map((item: any, itemIdx: number) => (
                        <div key={itemIdx} className="flex items-center space-x-3 text-sm">
                          <Package className="h-4 w-4 text-primary flex-shrink-0" />
                          <span>{item.name || item.productId}</span>
                          <span className="text-muted-foreground">x{item.quantity}</span>
                          <span className="ml-auto font-medium">₹{item.price?.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4 mt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total Amount</span>
                        <span className="font-semibold">₹{order.totalAmount?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-muted-foreground">Payment Status</span>
                        <span className="font-semibold capitalize">{order.paymentStatus || 'Pending'}</span>
                      </div>
                    </div>

                    {order.address && (
                      <div className="mt-4 text-sm">
                        <p className="font-medium mb-1">Delivery Address:</p>
                        <p className="text-muted-foreground">
                          {order.address.street}, {order.address.city}, {order.address.state} - {order.address.pincode}
                        </p>
                      </div>
                    )}
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

export default MyOrders;
