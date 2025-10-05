import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Calendar, Clock, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Service } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { AuthGate } from '@/components/AuthGate';
import { bookingsApi, paymentsApi } from '@/services/api';
import { initiateRazorpayPayment } from '@/lib/payment';

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid phone number'),
  city: z.string().min(2, 'City is required'),
  pincode: z.string().regex(/^\d{6}$/, 'Invalid pincode'),
  address: z.string().optional(),
  preferredDate: z.string().min(1, 'Date is required'),
  preferredTime: z.string().min(1, 'Time is required'),
  estimatedGuests: z.string().optional(),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  service: Service;
  selectedPackageId: string;
  onClose: () => void;
}

const BookingForm = ({ service, selectedPackageId, onClose }: BookingFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedPackage = service.packages.find(p => p.id === selectedPackageId);
  if (!selectedPackage) return null;

  const totalAmount = selectedPackage.price;
  const lockingAmount = Math.round(totalAmount * 0.1);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      city: '',
      pincode: '',
      address: '',
      preferredDate: '',
      preferredTime: '',
      estimatedGuests: '',
      notes: '',
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      // Create booking with backend
      const { bookingId, razorpayOrder } = await bookingsApi.create({
        serviceId: service.id,
        serviceName: service.name,
        packageId: selectedPackageId,
        packageName: selectedPackage.name,
        totalAmount,
        lockingAmount,
        ...data,
      });

      // Initiate Razorpay payment
      await initiateRazorpayPayment({
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: service.name,
        description: `Locking amount for ${selectedPackage.name}`,
        prefill: {
          name: data.name,
          email: data.email,
          contact: data.phone,
        },
        onSuccess: async (paymentResponse: any) => {
          try {
            await paymentsApi.verify({
              bookingId,
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_order_id: paymentResponse.razorpay_order_id,
              razorpay_signature: paymentResponse.razorpay_signature,
            });
            toast({
              title: 'Booking Confirmed! 🎉',
              description: `Your booking (${bookingId}) is confirmed. Check your email for details.`,
            });
            navigate('/booking-success', { state: { bookingId } });
            onClose();
          } catch (error) {
            toast({
              title: 'Payment Verification Failed',
              description: 'Please contact support.',
              variant: 'destructive',
            });
          }
        },
        onFailure: () => {
          toast({
            title: 'Payment Failed',
            description: 'Please try again.',
            variant: 'destructive',
          });
        },
      });
    } catch (error) {
      toast({
        title: 'Booking Failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate time slots
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  // Get tomorrow's date as minimum
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const bookingContent = (
    <div className="py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 font-serif">Complete Your Booking</h2>
        <p className="text-muted-foreground">Fill in your details to lock this service with 10% payment</p>
      </div>

      {/* Price Summary */}
      <Card className="mb-6 border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="font-semibold">{service.name}</p>
              <p className="text-sm text-muted-foreground">{selectedPackage.name}</p>
            </div>
            <p className="text-xl font-bold">₹{totalAmount.toLocaleString()}</p>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-primary">Locking Amount (10%)</p>
                <p className="text-xs text-muted-foreground">Pay remaining ₹{(totalAmount - lockingAmount).toLocaleString()} after service</p>
              </div>
              <p className="text-2xl font-bold text-primary">₹{lockingAmount.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number *</FormLabel>
                  <FormControl>
                    <Input placeholder="10-digit mobile number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your.email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City *</FormLabel>
                  <FormControl>
                    <Input placeholder="Your city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pincode *</FormLabel>
                  <FormControl>
                    <Input placeholder="6-digit pincode" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Your address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="preferredDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Date *</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="date"
                        min={minDate}
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferredTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Time *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                        <SelectTrigger className="pl-10">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                      </div>
                    </FormControl>
                    <SelectContent>
                      {timeSlots.map(slot => (
                        <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="estimatedGuests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estimated Guests (Optional)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Number of guests" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Special Instructions (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any special requirements or notes..."
                    className="resize-none"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Cancellation Policy */}
          <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 text-sm">
            <p className="font-medium mb-1">📋 Cancellation Policy</p>
            <p className="text-muted-foreground">
              <strong>100% refund</strong> if cancelled ≥ 6 hours before your scheduled time. 
              Refund will be processed within 5-7 business days.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? (
                'Processing...'
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pay ₹{lockingAmount.toLocaleString()} & Lock
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );

  return (
    <AuthGate actionName="book this service">
      {(execute) => {
        if (!isAuthenticated) {
          execute(() => {});
          return (
            <div className="py-6 text-center">
              <p className="text-muted-foreground">Please sign in to continue with your booking</p>
            </div>
          );
        }
        return bookingContent;
      }}
    </AuthGate>
  );
};

export default BookingForm;
