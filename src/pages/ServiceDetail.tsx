import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Star, Check, ArrowRight, MapPin, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { getServiceById } from '@/data/services';
import BookingForm from '@/components/BookingForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const ServiceDetail = () => {
  const { id } = useParams();
  const service = getServiceById(id || '');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>('');

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const handleBookNow = (packageId: string) => {
    setSelectedPackage(packageId);
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen gradient-festive py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Gallery */}
            <div className="animate-fade-in">
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-large mb-4">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {service.gallery.slice(0, 3).map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-lg overflow-hidden">
                    <img src={img} alt={`${service.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Service Info */}
            <div className="animate-slide-up">
              <Badge className="mb-3">{service.category}</Badge>
              <h1 className="text-4xl font-bold mb-4 font-serif">{service.name}</h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-primary text-primary mr-1" />
                  <span className="font-semibold text-lg">{service.rating}</span>
                  <span className="text-muted-foreground ml-1">({service.reviewCount} reviews)</span>
                </div>
              </div>

              <p className="text-lg text-muted-foreground mb-6">{service.fullDescription}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Available across major cities</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Flexible scheduling</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Verified professionals</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Check className="h-5 w-5 text-primary" />
                  <span>100% refund on cancellation</span>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
                <p className="text-sm font-medium mb-1">Starting from</p>
                <p className="text-3xl font-bold text-primary">₹{service.startingPrice.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">Pay only 10% (₹{(service.startingPrice * 0.1).toLocaleString()}) to lock your booking</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-12 animate-slide-up">
            <h2 className="text-2xl font-bold mb-6 font-serif">Key Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Packages */}
          <div className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 font-serif">Choose Your Package</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.packages.map((pkg) => (
                <Card key={pkg.id} className={`relative ${pkg.popular ? 'border-primary shadow-gold' : ''}`}>
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="gradient-primary text-white">Most Popular</Badge>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 font-serif">{pkg.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
                    
                    <div className="mb-4">
                      <p className="text-3xl font-bold text-primary">₹{pkg.price.toLocaleString()}</p>
                      {pkg.duration && <p className="text-sm text-muted-foreground">{pkg.duration}</p>}
                      <p className="text-xs text-muted-foreground mt-1">
                        Lock for ₹{(pkg.price * 0.1).toLocaleString()} (10%)
                      </p>
                    </div>

                    <div className="space-y-2 mb-6">
                      {pkg.includes.map((item, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>

                    <Button 
                      className="w-full" 
                      variant={pkg.popular ? 'default' : 'outline'}
                      onClick={() => handleBookNow(pkg.id)}
                    >
                      Book & Lock (10%)
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="mb-12 bg-accent/5 border border-accent/20 rounded-lg p-6 animate-slide-up">
            <h3 className="text-lg font-semibold mb-3">🔒 Cancellation Policy</h3>
            <p className="text-sm text-muted-foreground">
              <strong>100% refund of locking amount</strong> if cancelled ≥ 6 hours before scheduled time. 
              No questions asked. Your money, your peace of mind.
            </p>
          </div>

          {/* FAQs */}
          <div className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 font-serif">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {service.faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      {/* Booking Form Dialog */}
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <BookingForm
            service={service}
            selectedPackageId={selectedPackage}
            onClose={() => setBookingOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServiceDetail;
