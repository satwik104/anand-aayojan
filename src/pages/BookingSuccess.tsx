import { useEffect } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, Calendar, Mail, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import confetti from 'canvas-confetti';

const BookingSuccess = () => {
  const location = useLocation();
  const bookingId = location.state?.bookingId;

  useEffect(() => {
    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  if (!bookingId) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen gradient-festive flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        <Card className="shadow-large animate-scale-in">
          <CardContent className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
              <CheckCircle className="h-12 w-12 text-primary" />
            </div>

            <h1 className="text-3xl font-bold mb-3 font-serif">Booking Confirmed! 🎉</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Thank you for choosing AnandAyojan. Your service has been successfully booked.
            </p>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Booking ID</p>
                  <p className="font-semibold text-primary">{bookingId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <p className="font-semibold text-green-600">Confirmed & Paid</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8 text-left">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium mb-1">Confirmation Email Sent</p>
                  <p className="text-sm text-muted-foreground">
                    Check your inbox for booking details and provider information
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium mb-1">SMS Confirmation</p>
                  <p className="text-sm text-muted-foreground">
                    You'll receive an SMS with service provider contact details
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium mb-1">Manage Your Booking</p>
                  <p className="text-sm text-muted-foreground">
                    View, modify, or cancel your booking anytime from "My Bookings"
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm font-medium mb-1">💡 Quick Reminder</p>
              <p className="text-sm text-muted-foreground">
                You can cancel and get a <strong>100% refund</strong> if you cancel ≥ 6 hours before your scheduled time.
                No questions asked!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="flex-1">
                <Link to="/my-bookings">
                  View My Bookings
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link to="/services">Browse More Services</Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              Need help? Contact us at{' '}
              <a href="tel:+919876543210" className="text-primary font-medium">
                +91 98765 43210
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingSuccess;
