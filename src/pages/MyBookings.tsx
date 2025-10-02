import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Phone, Mail, CircleAlert as AlertCircle, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Booking } from '@/types';
import { MockApi } from '@/data/mockApi';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('demo@anandayojan.com'); // Demo email
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [cancelBookingId, setCancelBookingId] = useState<string | null>(null);
  const [feedbackBooking, setFeedbackBooking] = useState<Booking | null>(null);
  const [rating, setRating] = useState(5);
  const [feedbackComments, setFeedbackComments] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (emailSubmitted) {
      loadBookings();
    }
  }, [emailSubmitted]);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const data = await MockApi.getBookingsByEmail(email);
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

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setEmailSubmitted(true);
    }
  };

  const canCancel = (booking: Booking): boolean => {
    const scheduledTime = new Date(booking.scheduledAt).getTime();
    const currentTime = Date.now();
    const hoursUntilEvent = (scheduledTime - currentTime) / (1000 * 60 * 60);
    return hoursUntilEvent >= 6 && booking.status !== 'cancelled' && booking.status !== 'completed';
  };

  const handleCancelBooking = async () => {
    if (!cancelBookingId) return;

    try {
      const result = await MockApi.cancelBooking(cancelBookingId);
      if (result.success) {
        toast({
          title: 'Booking Cancelled',
          description: result.message,
        });
        loadBookings();
      } else {
        toast({
          title: 'Cannot Cancel',
          description: result.message,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to cancel booking',
        variant: 'destructive',
      });
    }
    setCancelBookingId(null);
  };

  const handleSubmitFeedback = async () => {
    if (!feedbackBooking) return;

    try {
      await MockApi.submitFeedback(feedbackBooking.id, rating, feedbackComments);
      toast({
        title: 'Feedback Submitted',
        description: 'Thank you for your feedback!',
      });
      setFeedbackBooking(null);
      setRating(5);
      setFeedbackComments('');
      loadBookings();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit feedback',
        variant: 'destructive',
      });
    }
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

  if (!emailSubmitted) {
    return (
      <div className="min-h-screen gradient-festive flex items-center justify-center py-12 px-4">
        <Card className="max-w-md w-full shadow-large">
          <CardHeader>
            <CardTitle className="text-center font-serif">View My Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Enter your email address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  We'll show all bookings associated with this email
                </p>
              </div>
              <Button type="submit" className="w-full">View Bookings</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-festive py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8 animate-fade-in">
            <div>
              <h1 className="text-3xl font-bold font-serif">My Bookings</h1>
              <p className="text-muted-foreground">Manage your service bookings</p>
            </div>
            <Button variant="outline" onClick={() => setEmailSubmitted(false)}>
              Change Email
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading bookings...</p>
            </div>
          ) : bookings.length === 0 ? (
            <Card className="shadow-soft">
              <CardContent className="p-12 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">No bookings found</p>
                <p className="text-muted-foreground mb-6">
                  You haven't made any bookings yet with this email address
                </p>
                <Button asChild>
                  <a href="/services">Browse Services</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking, idx) => (
                <Card key={booking.id} className="shadow-medium animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="font-serif">{booking.serviceName}</CardTitle>
                        <p className="text-sm text-muted-foreground">{booking.packageName}</p>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-xs sm:text-sm">
                        <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>
                          {new Date(booking.scheduledAt).toLocaleDateString('en-IN', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs sm:text-sm">
                        <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{booking.preferredTime}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs sm:text-sm">
                        <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>
                          {booking.city}, {booking.pincode}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs sm:text-sm">
                        <span className="font-medium">Booking ID:</span>
                        <span className="text-primary break-all">{booking.id}</span>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4 mb-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Total Amount</p>
                          <p className="font-semibold">₹{booking.totalAmount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Paid (Locking Amount)</p>
                          <p className="font-semibold text-primary">₹{booking.lockingAmount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Remaining</p>
                          <p className="font-semibold">
                            ₹{(booking.totalAmount - booking.lockingAmount).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Payment Status</p>
                          <p className="font-semibold capitalize">{booking.paymentStatus}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      {canCancel(booking) && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setCancelBookingId(booking.id)}
                        >
                          Cancel Booking
                        </Button>
                      )}

                      {booking.status === 'completed' && !booking.feedback && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setFeedbackBooking(booking)}
                        >
                          <Star className="mr-2 h-4 w-4" />
                          Rate Service
                        </Button>
                      )}

                      {booking.status === 'completed' && booking.feedback && (
                        <Badge variant="outline" className="bg-green-50">
                          <Star className="mr-1 h-3 w-3 fill-primary text-primary" />
                          Feedback Submitted
                        </Badge>
                      )}
                    </div>

                    {booking.status === 'cancelled' && (
                      <div className="mt-4 bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-sm">
                        <p className="font-medium text-destructive">Booking Cancelled</p>
                        <p className="text-muted-foreground">
                          {booking.refundStatus === 'processing'
                            ? 'Refund is being processed. You will receive ₹' +
                              booking.lockingAmount.toLocaleString() +
                              ' in 5-7 business days.'
                            : 'Refund completed'}
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

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={!!cancelBookingId} onOpenChange={() => setCancelBookingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Booking?</AlertDialogTitle>
            <AlertDialogDescription>
              This will cancel your booking and initiate a 100% refund of your locking amount.
              The refund will be processed within 5-7 business days.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Booking</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancelBooking} className="bg-destructive hover:bg-destructive/90">
              Cancel Booking
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Feedback Dialog */}
      <Dialog open={!!feedbackBooking} onOpenChange={() => setFeedbackBooking(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-serif">Rate Your Experience</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="mb-2 block">How would you rate the service?</Label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= rating ? 'fill-primary text-primary' : 'text-muted-foreground'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="comments">Share your feedback</Label>
              <Textarea
                id="comments"
                value={feedbackComments}
                onChange={(e) => setFeedbackComments(e.target.value)}
                placeholder="Tell us about your experience..."
                rows={4}
                className="mt-2"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setFeedbackBooking(null)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSubmitFeedback} className="flex-1">
              Submit Feedback
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyBookings;
