import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CircleCheck as CheckCircle, Handshake, TrendingUp, Users, Shield, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const partnerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid phone number'),
  city: z.string().min(2, 'City is required'),
  serviceType: z.string().min(1, 'Service type is required'),
  message: z.string().optional(),
});

type PartnerFormData = z.infer<typeof partnerSchema>;

const Partner = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PartnerFormData>({
    resolver: zodResolver(partnerSchema),
    defaultValues: {
      name: '',
      phone: '',
      city: '',
      serviceType: '',
      message: '',
    },
  });

  const onSubmit = async (data: PartnerFormData) => {
    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: 'Application Submitted!',
        description: 'Thank you for your interest. Our team will contact you within 24 hours.',
      });
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  };

  const serviceTypes = [
    'Mehndi Artist',
    'Dhol & Music',
    'Decoration',
    'Pandit Ji',
    'Beauty & Makeup',
    'Photography',
    'Helper Services',
    'Catering',
    'Event Planning',
    'Other',
  ];

  const benefits = [
    {
      icon: Users,
      title: 'Expand Your Reach',
      description: 'Connect with thousands of customers actively looking for quality service providers',
    },
    {
      icon: TrendingUp,
      title: 'Grow Your Business',
      description: 'Get consistent bookings and increase your revenue with our marketing support',
    },
    {
      icon: Shield,
      title: 'Verified Badge',
      description: 'Receive a verified professional badge that builds customer trust and credibility',
    },
    {
      icon: CheckCircle,
      title: 'Secure Payments',
      description: 'Guaranteed payments with our secure payment system and transparent pricing',
    },
  ];

  return (
    <div className="min-h-screen gradient-festive py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex items-center justify-center mb-4">
              <Handshake className="h-12 w-12 sm:h-16 sm:w-16 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 font-serif">
              Partner with AnandAyojan
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Join India's fastest-growing event services platform and take your business to the next level.
              We connect verified professionals with customers who value quality and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12">
            <div className="animate-slide-up">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 font-serif">Why Partner with Us?</h2>

              <div className="space-y-6">
                {benefits.map((benefit, idx) => (
                  <Card
                    key={idx}
                    className="border-primary/20 hover:border-primary/40 transition-all hover:shadow-medium"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-start space-x-4">
                        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                          <benefit.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base sm:text-lg font-semibold mb-2">{benefit.title}</h3>
                          <p className="text-sm sm:text-base text-muted-foreground">{benefit.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8 bg-accent/5 border border-accent/20 rounded-lg p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3">Our Commitment to You</h3>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    <span>No hidden charges - transparent fee structure</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    <span>Dedicated support team to help you succeed</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    <span>Marketing and promotional support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    <span>Flexible scheduling and booking management</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="animate-fade-in">
              <Card className="shadow-large">
                <CardContent className="p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold mb-2 font-serif">Join Our Network</h2>
                  <p className="text-sm sm:text-base text-muted-foreground mb-6">
                    Fill out the form below and our team will get in touch with you
                  </p>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full name" {...field} />
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
                        name="serviceType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Type *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your service type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {serviceTypes.map((service) => (
                                  <SelectItem key={service} value={service}>
                                    {service}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about your services, experience, or any questions..."
                                className="resize-none"
                                rows={4}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
                        {isSubmitting ? (
                          'Submitting...'
                        ) : (
                          <>
                            Submit Application
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center bg-primary/5 border border-primary/20 rounded-lg p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-semibold mb-3">Have Questions?</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4">
              Our partnership team is here to help you every step of the way
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center text-sm sm:text-base">
              <a href="tel:+919876543210" className="font-semibold text-primary hover:underline">
                📞 +91 98765 43210
              </a>
              <span className="hidden sm:inline text-muted-foreground">|</span>
              <a href="mailto:partner@anandayojan.com" className="font-semibold text-primary hover:underline">
                ✉️ partner@anandayojan.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partner;
