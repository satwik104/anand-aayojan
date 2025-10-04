import { Link } from 'react-router-dom';
import { Star, ArrowRight, Heart } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Service } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthGate } from '@/components/AuthGate';
import { useToast } from '@/hooks/use-toast';
import { addToWishlist } from '@/lib/wishlist';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const linkTo = service.id === 'shopping' ? '/products' : `/services/${service.id}`;
  const { user } = useAuth();
  const { requireAuth, AuthModal } = useAuthGate();
  const { toast } = useToast();

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    requireAuth(() => {
      if (!user?.email) return;
      const { added } = addToWishlist(user.email, {
        id: service.id,
        type: 'service',
        name: service.name,
        image: service.image,
        price: service.startingPrice,
      });
      toast({
        title: added ? 'Saved to wishlist ❤️' : 'Already in wishlist',
        description: added ? `${service.name} was added to your wishlist.` : undefined,
      });
    }, 'save to wishlist');
  };

  return (
    <>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-large hover:-translate-y-1">
        <Link to={linkTo}>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-2 right-2 z-10 rounded-full"
              onClick={handleWishlist}
              aria-label="Save to wishlist"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <img
              src={service.image}
              alt={service.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </Link>

        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
              {service.category}
            </span>
            <div className="flex items-center space-x-1 text-sm">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-medium">{service.rating}</span>
              <span className="text-muted-foreground">({service.reviewCount})</span>
            </div>
          </div>

          <Link to={linkTo}>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-smooth font-serif">
              {service.name}
            </h3>
          </Link>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {service.shortDescription}
          </p>

          <div className="flex items-baseline space-x-1 mb-4">
            <span className="text-sm text-muted-foreground">Starting from</span>
            <span className="text-xl font-bold text-primary">₹{service.startingPrice.toLocaleString()}</span>
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-0">
          <Button asChild className="w-full group/btn">
            <Link to={linkTo}>
              {service.id === 'shopping' ? 'Browse Products' : 'View Details'}
              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
      <AuthModal />
    </>
  );
};

export default ServiceCard;
