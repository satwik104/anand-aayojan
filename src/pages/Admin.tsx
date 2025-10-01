import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Mail, Phone, CheckCircle, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Booking } from '@/types';
import { MockApi } from '@/data/mockApi';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const data = await MockApi.getAllBookings();
      setBookings(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load bookings',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = async (bookingId: string) => {
    try {
      await MockApi.markBookingComplete(bookingId);
      toast({
        title: 'Booking Completed',
        description: 'Service marked as completed. Customer can now provide feedback.',
      });
      loadBookings();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update booking',
        variant: 'destructive',
      });
    }
  };

  const filteredBookings = bookings.filter((booking) =>
    filterStatus === 'all' ? true : booking.status === filterStatus
  );

  const stats = {
    total: bookings.length,
    locked: bookings.filter((b) => b.status === 'locked').length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled').length,
  };

  const getStatusBadge = (status: Booking['status']) => {
    const variants: Record<Booking['status'], any> = {
      locked: { variant: 'secondary', label: 'Locked' },
      confirmed: { variant: 'default', label: 'Confirmed' },
      completed: { variant: 'outline', label: 'Completed' },
      cancelled: { variant: 'destructive', label: 'Cancelled' },
    };
    const { variant, label } = variants[status];
    return <Badge variant={variant}>{label}</Badge>;
  };

  return (
    <div className="min-h-screen gradient-festive py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2 font-serif">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage and monitor all bookings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total Bookings', value: stats.total, color: 'bg-primary' },
            { label: 'Locked', value: stats.locked, color: 'bg-secondary' },
            { label: 'Confirmed', value: stats.confirmed, color: 'bg-green-600' },
            { label: 'Completed', value: stats.completed, color: 'bg-blue-600' },
            { label: 'Cancelled', value: stats.cancelled, color: 'bg-destructive' },
          ].map((stat, idx) => (
            <Card key={idx} className="shadow-soft animate-scale-in" style={{ animationDelay: `${idx * 50}ms` }}>
              <CardContent className="p-6 text-center">
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className={`text-3xl font-bold ${stat.color.replace('bg-', 'text-')}`}>
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="mb-6 shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Bookings</CardTitle>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Filter by status:</span>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="locked">Locked</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading bookings...</p>
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No bookings found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Scheduled</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{booking.serviceName}</p>
                            <p className="text-xs text-muted-foreground">{booking.packageName}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{booking.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {booking.city}, {booking.pincode}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-xs space-y-1">
                            <div className="flex items-center space-x-1">
                              <Mail className="h-3 w-3" />
                              <span className="truncate max-w-[150px]">{booking.email}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Phone className="h-3 w-3" />
                              <span>{booking.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-xs">
                            <div className="flex items-center space-x-1 mb-1">
                              <Calendar className="h-3 w-3" />
                              <span>
                                {new Date(booking.scheduledAt).toLocaleDateString('en-IN', {
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{booking.preferredTime}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-xs">
                            <p className="font-medium">₹{booking.totalAmount.toLocaleString()}</p>
                            <p className="text-muted-foreground">
                              Paid: ₹{booking.lockingAmount.toLocaleString()}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                        <TableCell>
                          <div className="flex flex-col space-y-2">
                            {booking.status === 'confirmed' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleMarkComplete(booking.id)}
                              >
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Complete
                              </Button>
                            )}
                            {booking.status === 'completed' && booking.feedback && (
                              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                <Star className="h-3 w-3 fill-primary text-primary" />
                                <span>{booking.feedback.rating}/5</span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Note */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">💡 Admin Dashboard Features</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• View and filter all bookings by status</li>
              <li>• Mark confirmed bookings as complete to trigger feedback requests</li>
              <li>• Monitor payment status and refunds</li>
              <li>• View customer feedback ratings</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
