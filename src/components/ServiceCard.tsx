import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-large hover:-translate-y-1">
      <Link to={`/services/${service.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
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

        <Link to={`/services/${service.id}`}>
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
          <Link to={`/services/${service.id}`}>
            View Details
            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
