import { Star } from 'lucide-react';
import { useEffect, useRef } from 'react';

const reviews = [
  { id: 1, name: 'Priya Sharma', rating: 5, text: 'Amazing service! Made our wedding day perfect.' },
  { id: 2, name: 'Rahul Verma', rating: 5, text: 'Professional team, highly recommend!' },
  { id: 3, name: 'Anjali Patel', rating: 4, text: 'Great experience, beautiful decorations.' },
  { id: 4, name: 'Vikram Singh', rating: 5, text: 'Best photography service in Rajasthan!' },
  { id: 5, name: 'Neha Gupta', rating: 5, text: 'Excellent coordination and timely service.' },
  { id: 6, name: 'Arjun Mehta', rating: 4, text: 'Very satisfied with the makeup and mehndi.' },
  { id: 7, name: 'Kavita Joshi', rating: 5, text: 'The pandit ji was very knowledgeable.' },
  { id: 8, name: 'Sanjay Agarwal', rating: 5, text: 'Worth every penny! Highly professional.' },
  { id: 9, name: 'Pooja Reddy', rating: 5, text: 'Made our special day memorable!' },
];

const ReviewsCarousel = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      if (scrollPosition >= scroller.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      scroller.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId);
    };

    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate);
    };

    scroller.addEventListener('mouseenter', handleMouseEnter);
    scroller.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scroller.removeEventListener('mouseenter', handleMouseEnter);
      scroller.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const doubledReviews = [...reviews, ...reviews];

  return (
    <section className="py-16 bg-muted/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center">What Our Clients Say</h2>
      </div>
      
      <div 
        ref={scrollerRef}
        className="flex gap-6 overflow-x-hidden"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {doubledReviews.map((review, index) => (
          <div 
            key={`${review.id}-${index}`}
            className="flex-shrink-0 w-80 bg-card rounded-lg p-6 border shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < review.rating ? 'fill-primary text-primary' : 'text-muted'}`}
                />
              ))}
            </div>
            <p className="text-muted-foreground mb-4">{review.text}</p>
            <p className="font-semibold">{review.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewsCarousel;
