import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CircleCheck as CheckCircle, Shield, Clock, ArrowRight, Sparkles } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import { services } from '@/data/services';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import heroImage from '@/assets/hero-wedding.jpg';

const Home = () => {
  const featuredServices = services.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] sm:h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Wedding celebration"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 gradient-hero opacity-80" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-primary-light mr-2" />
              <span className="text-sm sm:text-base text-primary-light font-medium">Trusted Event Services Platform</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 font-serif">
              Make Your Celebrations Unforgettable
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/90 px-2">
              Book verified professionals for weddings, events & home services. Pay 10% to lock, cancel anytime with 100% refund.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Button asChild size="lg" className="text-base sm:text-lg shadow-gold w-full sm:w-auto">
                <Link to="/services">
                  Browse Services
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="bg-white/10 border-white text-white hover:bg-white hover:text-foreground w-full sm:w-auto"
                onClick={(e: any) => {
                  e.preventDefault();
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <a href="#how-it-works">How It Works</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-6 sm:py-8 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
            <div className="flex flex-col items-center space-y-2 py-2">
              <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
              <h3 className="font-semibold text-sm sm:text-base">Verified Providers</h3>
              <p className="text-xs sm:text-sm text-muted-foreground px-2">All service providers are background verified</p>
            </div>
            <div className="flex flex-col items-center space-y-2 py-2">
              <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
              <h3 className="font-semibold text-sm sm:text-base">100% Refund</h3>
              <p className="text-xs sm:text-sm text-muted-foreground px-2">Full refund if cancelled ≥6 hours before</p>
            </div>
            <div className="flex flex-col items-center space-y-2 py-2">
              <Clock className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
              <h3 className="font-semibold text-sm sm:text-base">Quick Booking</h3>
              <p className="text-xs sm:text-sm text-muted-foreground px-2">Pay just 10% to secure your booking instantly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 gradient-festive">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-4xl font-bold mb-4 font-serif">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From mehndi artists to photographers, find trusted professionals for all your event needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredServices.map((service, idx) => (
              <div key={service.id} className="animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <ServiceCard service={service} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" variant="outline">
              <Link to="/services">
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-12 sm:py-16 bg-card scroll-mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 font-serif">How It Works</h2>
            <p className="text-base sm:text-lg text-muted-foreground px-4">Simple, transparent, and secure booking process</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { step: '1', title: 'Browse Services', desc: 'Explore our curated list of verified service providers' },
              { step: '2', title: 'Book & Lock (10%)', desc: 'Pay just 10% upfront to secure your booking' },
              { step: '3', title: 'Get Confirmed', desc: 'Receive confirmation and provider details' },
              { step: '4', title: 'Enjoy Service', desc: 'Complete payment on service delivery. Rate & review!' },
            ].map((item, idx) => (
              <div key={idx} className="text-center animate-slide-up" style={{ animationDelay: `${idx * 150}ms` }}>
                <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full gradient-primary flex items-center justify-center text-xl sm:text-2xl font-bold text-white mx-auto mb-3 sm:mb-4 shadow-gold">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2 text-base sm:text-lg px-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground px-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Reviews Carousel */}
      <ReviewsCarousel />

      {/* CTA Section */}
      <section className="py-16 gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 font-serif">Ready to Plan Your Event?</h2>
          <p className="text-xl mb-8 text-white/90">Book trusted professionals with just 10% upfront payment</p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 shadow-gold">
            <Link to="/services">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
