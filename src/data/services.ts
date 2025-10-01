import { Service } from '@/types';
import mehndiImg from '@/assets/service-mehndi.jpg';
import dholImg from '@/assets/service-dhol.jpg';
import decorationImg from '@/assets/service-decoration.jpg';
import panditImg from '@/assets/service-pandit.jpg';
import makeupImg from '@/assets/service-makeup.jpg';
import photographyImg from '@/assets/service-photography.jpg';
import helperImg from '@/assets/service-helper.jpg';
import shoppingImg from '@/assets/service-shopping.jpg';

export const services: Service[] = [
  {
    id: 'mehndi',
    name: 'Mehndi Artist',
    shortDescription: 'Traditional & bridal mehndi designs by experienced artists',
    fullDescription: 'Our skilled mehndi artists bring years of experience in creating intricate traditional and contemporary henna designs. From simple patterns to elaborate bridal mehndi, we ensure every design is a work of art that complements your special occasion.',
    category: 'Beauty & Grooming',
    image: mehndiImg,
    gallery: [mehndiImg, mehndiImg, mehndiImg],
    startingPrice: 1500,
    rating: 4.8,
    reviewCount: 234,
    features: [
      'Natural henna paste',
      'Custom designs available',
      'Experienced artists',
      'Travel to your location',
      'Dark, long-lasting color',
      'Photo consultation available'
    ],
    packages: [
      {
        id: 'mehndi-basic',
        name: 'Basic',
        description: 'Simple traditional designs for hands',
        price: 1500,
        duration: '1-2 hours',
        includes: ['Both hands (front)', 'Basic traditional patterns', 'Natural henna', 'After-care tips']
      },
      {
        id: 'mehndi-bridal',
        name: 'Bridal',
        description: 'Intricate bridal mehndi for hands and feet',
        price: 5000,
        duration: '4-5 hours',
        includes: ['Hands (front & back)', 'Feet (full design)', 'Bridal special patterns', 'Natural premium henna', 'Design consultation', 'Touch-up support'],
        popular: true
      },
      {
        id: 'mehndi-bridal-plus',
        name: 'Bridal + Extras',
        description: 'Complete bridal mehndi with arms and extras',
        price: 8000,
        duration: '6-8 hours',
        includes: ['Full hands & arms', 'Full feet & legs', 'Bridal premium designs', 'Multiple artist support', 'Design customization', 'Trial session', 'Photo documentation']
      }
    ],
    faqs: [
      {
        question: 'How long does the mehndi color last?',
        answer: 'Typically 7-14 days depending on skin type and aftercare. We provide detailed aftercare instructions.'
      },
      {
        question: 'Can I bring my own design reference?',
        answer: 'Absolutely! We encourage you to share design inspirations and we can customize accordingly.'
      },
      {
        question: 'Do you travel for the service?',
        answer: 'Yes, we come to your location. Travel charges may apply for distances beyond 15km.'
      },
      {
        question: 'Is the henna natural?',
        answer: 'Yes, we use 100% natural henna paste without harmful chemicals.'
      }
    ]
  },
  {
    id: 'dhol',
    name: 'Dhol & Music',
    shortDescription: 'Professional dhol players, bands & DJ for your celebrations',
    fullDescription: 'Make your celebration unforgettable with our talented dhol players and music bands. From traditional dhol beats that energize your baraat to live bands and DJ services, we bring the perfect musical atmosphere to your event.',
    category: 'Entertainment',
    image: dholImg,
    gallery: [dholImg, dholImg, dholImg],
    startingPrice: 3000,
    rating: 4.7,
    reviewCount: 189,
    features: [
      'Experienced dhol players',
      'Live band options',
      'DJ services available',
      'Sound system included',
      'Customizable playlist',
      'Peak time availability'
    ],
    packages: [
      {
        id: 'dhol-only',
        name: 'Dhol Only',
        description: 'Traditional dhol player for baraat',
        price: 3000,
        duration: '2 hours',
        includes: ['1 professional dhol player', 'Traditional dhol instrument', 'Colorful costume', 'Travel to venue']
      },
      {
        id: 'dhol-band',
        name: 'Band (3-6 people)',
        description: 'Complete musical band for celebrations',
        price: 15000,
        duration: '3 hours',
        includes: ['3-6 professional musicians', 'Multiple instruments', 'Sound system', 'Playlist customization', 'Costume & setup'],
        popular: true
      },
      {
        id: 'dhol-dj',
        name: 'Dhol + DJ Combo',
        description: 'Complete entertainment package',
        price: 25000,
        duration: '4 hours',
        includes: ['Professional dhol player', 'DJ with equipment', 'Sound & lighting', 'Unlimited songs', 'MC services', 'Extended timing option']
      }
    ],
    faqs: [
      {
        question: 'Can we request specific songs?',
        answer: 'Yes! Share your playlist in advance and we\'ll prepare accordingly.'
      },
      {
        question: 'Is sound system included?',
        answer: 'Yes, for band and DJ packages. Basic dhol package doesn\'t require amplification.'
      },
      {
        question: 'What if the event runs longer?',
        answer: 'Extended hours can be arranged with additional charges, subject to availability.'
      }
    ]
  },
  {
    id: 'decoration',
    name: 'Decoration',
    shortDescription: 'Stunning event decoration for all occasions',
    fullDescription: 'Transform your venue with our professional decoration services. From elegant floral arrangements to themed decor setups, we create visually stunning environments that perfectly match your vision and make your event truly memorable.',
    category: 'Event Services',
    image: decorationImg,
    gallery: [decorationImg, decorationImg, decorationImg],
    startingPrice: 10000,
    rating: 4.9,
    reviewCount: 312,
    features: [
      'Custom theme design',
      'Floral arrangements',
      'Lighting setup',
      'Stage decoration',
      'Photo booth setup',
      'Complete venue transformation'
    ],
    packages: [
      {
        id: 'decor-basic',
        name: 'Basic Decor',
        description: 'Essential decoration for intimate gatherings',
        price: 10000,
        includes: ['Entrance decoration', 'Stage backdrop', 'Basic lighting', 'Table arrangements', 'Chair covers']
      },
      {
        id: 'decor-premium',
        name: 'Premium Decor',
        description: 'Comprehensive decoration for grand celebrations',
        price: 30000,
        includes: ['Full venue decoration', 'Floral arrangements', 'Premium lighting', 'Stage setup', 'Photo booth', 'Name board', 'Table centerpieces'],
        popular: true
      },
      {
        id: 'decor-theme',
        name: 'Thematic Decor',
        description: 'Customized theme-based decoration',
        price: 50000,
        includes: ['Custom theme design', 'Premium flowers', 'Designer fabrics', 'Advanced lighting', 'Props & installations', '3D design preview', 'Complete venue transformation', 'Dedicated team']
      }
    ],
    faqs: [
      {
        question: 'Can we see design previews?',
        answer: 'Yes! We provide 3D design previews for premium and thematic packages.'
      },
      {
        question: 'How early do you start setup?',
        answer: 'Typically 6-8 hours before the event, depending on the package complexity.'
      },
      {
        question: 'Do you provide cleanup service?',
        answer: 'Yes, dismantling and cleanup are included in all packages.'
      }
    ]
  },
  {
    id: 'pandit',
    name: 'Pandit Ji',
    shortDescription: 'Experienced pandits for all Hindu ceremonies & rituals',
    fullDescription: 'Book experienced and knowledgeable pandits for your religious ceremonies. From simple pujas to complete wedding rituals, our pandits conduct ceremonies with proper traditions, mantras, and guidance, ensuring your sacred moments are performed authentically.',
    category: 'Religious Services',
    image: panditImg,
    gallery: [panditImg, panditImg, panditImg],
    startingPrice: 2100,
    rating: 4.9,
    reviewCount: 276,
    features: [
      'Experienced & knowledgeable',
      'All Hindu rituals',
      'Proper guidance provided',
      'Puja materials assistance',
      'Travel to your location',
      'Flexible timing'
    ],
    packages: [
      {
        id: 'pandit-simple',
        name: 'Simple Puja',
        description: 'Traditional puja for home ceremonies',
        price: 2100,
        duration: '1-2 hours',
        includes: ['Experienced pandit', 'Ritual guidance', 'Mantra recitation', 'Puja materials list', 'Travel included (15km)']
      },
      {
        id: 'pandit-wedding',
        name: 'Full Wedding Rituals',
        description: 'Complete wedding ceremony rituals',
        price: 11000,
        duration: '3-5 hours',
        includes: ['Senior experienced pandit', 'All wedding rituals', 'Muhurat consultation', 'Detailed guidance', 'Puja materials assistance', 'Travel & accommodation'],
        popular: true
      },
      {
        id: 'pandit-extended',
        name: 'Multi-day Ceremonies',
        description: 'Multiple ceremony days with accommodation',
        price: 21000,
        duration: '2-3 days',
        includes: ['Senior pandit', 'Multiple day ceremonies', 'Complete ritual guidance', 'Muhurat consultations', 'Materials coordination', 'Accommodation provided', 'Travel included']
      }
    ],
    faqs: [
      {
        question: 'Do we need to arrange puja materials?',
        answer: 'Pandit ji will provide a detailed list. We can also help arrange materials at additional cost.'
      },
      {
        question: 'Can pandit ji suggest muhurat?',
        answer: 'Yes, our pandits can suggest auspicious timing based on your requirements.'
      },
      {
        question: 'What languages are available?',
        answer: 'Hindi and local languages. Specify your preference while booking.'
      }
    ]
  },
  {
    id: 'makeup',
    name: 'Beauty & Makeup',
    shortDescription: 'Professional bridal & party makeup by expert artists',
    fullDescription: 'Look your absolute best with our professional makeup artists. Specializing in bridal makeup, party looks, and beauty services, we use premium products and the latest techniques to enhance your natural beauty and ensure you look stunning for your special occasion.',
    category: 'Beauty & Grooming',
    image: makeupImg,
    gallery: [makeupImg, makeupImg, makeupImg],
    startingPrice: 3000,
    rating: 4.8,
    reviewCount: 298,
    features: [
      'Professional makeup artists',
      'Premium quality products',
      'Trial session available',
      'Hairstyling included',
      'Long-lasting makeup',
      'Travel to your location'
    ],
    packages: [
      {
        id: 'makeup-trial',
        name: 'Trial Session',
        description: 'Pre-event makeup trial',
        price: 3000,
        duration: '2 hours',
        includes: ['Makeup trial', 'Product testing', 'Style consultation', 'Photos for reference', 'At salon']
      },
      {
        id: 'makeup-bridal',
        name: 'Bridal Makeup',
        description: 'Complete bridal makeup package',
        price: 15000,
        duration: '3-4 hours',
        includes: ['Bridal makeup', 'Hairstyling', 'Draping assistance', 'Premium products', 'Touch-up kit', 'False lashes', 'At your location'],
        popular: true
      },
      {
        id: 'makeup-guest',
        name: 'Guest Makeup',
        description: 'Party makeup for guests',
        price: 5000,
        duration: '1.5 hours',
        includes: ['Party makeup', 'Hairstyling', 'Quality products', 'Travel to location', 'Group booking discounts']
      }
    ],
    faqs: [
      {
        question: 'Is trial session mandatory?',
        answer: 'Not mandatory but highly recommended to finalize the look you want.'
      },
      {
        question: 'What products do you use?',
        answer: 'We use premium branded products suitable for Indian skin tones and weather.'
      },
      {
        question: 'Do you provide touch-up services?',
        answer: 'Touch-up kit is provided with bridal packages. Artist availability can be arranged separately.'
      }
    ]
  },
  {
    id: 'photography',
    name: 'Photography',
    shortDescription: 'Professional photography & videography for your events',
    fullDescription: 'Capture your precious moments with our professional photography services. Our experienced photographers use high-end equipment and creative expertise to document your special day, delivering beautiful memories you\'ll cherish forever.',
    category: 'Documentation',
    image: photographyImg,
    gallery: [photographyImg, photographyImg, photographyImg],
    startingPrice: 15000,
    rating: 4.9,
    reviewCount: 445,
    features: [
      'Professional photographers',
      'High-end DSLR equipment',
      'Candid & traditional shots',
      'Video coverage available',
      'Photo editing included',
      'Online gallery delivery'
    ],
    packages: [
      {
        id: 'photo-4hr',
        name: '4-Hour Coverage',
        description: 'Essential event photography',
        price: 15000,
        duration: '4 hours',
        includes: ['1 photographer', '1 assistant', 'DSLR coverage', '200+ edited photos', 'Online gallery', 'Basic editing', '15-day delivery']
      },
      {
        id: 'photo-8hr',
        name: '8-Hour Coverage',
        description: 'Full day event photography',
        price: 25000,
        duration: '8 hours',
        includes: ['1 photographer', '1 videographer', 'Multiple cameras', '400+ edited photos', 'Highlight video', 'Premium editing', 'Photo album', '20-day delivery'],
        popular: true
      },
      {
        id: 'photo-wedding',
        name: 'Full Wedding Package',
        description: 'Complete wedding documentation',
        price: 50000,
        duration: 'Multiple days',
        includes: ['2 photographers', '1 videographer', 'Pre-wedding shoot', 'All ceremonies', '800+ edited photos', 'Cinematic video', 'Premium album', 'Drone coverage', 'Same-day edit', '30-day delivery']
      }
    ],
    faqs: [
      {
        question: 'When do we receive the photos?',
        answer: 'Edited photos are delivered within 15-30 days depending on the package.'
      },
      {
        question: 'Do we get raw photos?',
        answer: 'Raw photos can be provided at additional cost. All packages include professionally edited photos.'
      },
      {
        question: 'Can we request specific shots?',
        answer: 'Yes! Share your must-have shot list and we\'ll ensure we capture them.'
      }
    ]
  },
  {
    id: 'helper',
    name: 'Helper Services',
    shortDescription: 'Reliable helpers for cooking, cleaning & event assistance',
    fullDescription: 'Get trusted helpers for your home and event needs. From cooking traditional meals to house cleaning and event assistance, our verified helpers provide professional service to make your day easier and more organized.',
    category: 'Home Services',
    image: helperImg,
    gallery: [helperImg, helperImg, helperImg],
    startingPrice: 500,
    rating: 4.6,
    reviewCount: 187,
    features: [
      'Verified helpers',
      'Flexible timing',
      'Multiple tasks supported',
      'Hourly or day rates',
      'Trained professionals',
      'Background verified'
    ],
    packages: [
      {
        id: 'helper-hourly',
        name: 'Hourly Help',
        description: 'Flexible hourly assistance',
        price: 500,
        duration: 'Per hour',
        includes: ['Background verified helper', 'Cleaning tasks', 'Organizing', 'Minimum 4 hours', 'Supervision available']
      },
      {
        id: 'helper-cook',
        name: 'Cooking Services',
        description: 'Traditional meal preparation',
        price: 2000,
        duration: 'Per day',
        includes: ['Experienced cook', 'Traditional recipes', 'Ingredient shopping', 'Multiple meals', 'Kitchen cleanup', 'Utensil washing'],
        popular: true
      },
      {
        id: 'helper-event',
        name: 'Event Assistance',
        description: 'Multiple helpers for events',
        price: 5000,
        duration: 'Per day',
        includes: ['2-3 helpers', 'Serving guests', 'Kitchen assistance', 'Cleaning', 'Setup & cleanup', 'Full day coverage', 'Supervisor included']
      }
    ],
    faqs: [
      {
        question: 'Are helpers background verified?',
        answer: 'Yes, all our helpers undergo background verification before onboarding.'
      },
      {
        question: 'Can we hire for multiple days?',
        answer: 'Yes, multi-day bookings are available. Contact us for special rates.'
      },
      {
        question: 'What tasks can helpers perform?',
        answer: 'Cooking, cleaning, organizing, serving, and general event assistance. Specify your needs while booking.'
      }
    ]
  },
  {
    id: 'shopping',
    name: 'Bhaat & Mayera Shopping',
    shortDescription: 'Curated wedding essentials & traditional items',
    fullDescription: 'Browse our curated collection of traditional wedding essentials for Bhaat and Mayera ceremonies. From traditional utensils to clothes and decorative items, shop everything you need with convenient delivery to your doorstep.',
    category: 'Shopping',
    image: shoppingImg,
    gallery: [shoppingImg, shoppingImg, shoppingImg],
    startingPrice: 500,
    rating: 4.7,
    reviewCount: 156,
    features: [
      'Curated collections',
      'Traditional items',
      'Quality products',
      'Home delivery available',
      'Bulk discounts',
      'Gift packaging'
    ],
    packages: [
      {
        id: 'shopping-basic',
        name: 'Essential Set',
        description: 'Basic wedding essentials',
        price: 5000,
        includes: ['Traditional utensils (5 pieces)', 'Decorative plates (set)', 'Basic puja items', 'Gift wrapping', 'Delivery included']
      },
      {
        id: 'shopping-premium',
        name: 'Premium Collection',
        description: 'Complete traditional set',
        price: 15000,
        includes: ['Premium brass utensils (12 pieces)', 'Designer plates & bowls', 'Traditional clothes set', 'Puja thali set', 'Decorative items', 'Premium packaging', 'Express delivery'],
        popular: true
      },
      {
        id: 'shopping-custom',
        name: 'Custom Order',
        description: 'Personalized selection',
        price: 25000,
        includes: ['Personalized selection', 'Premium quality items', 'Custom packaging', 'Engraving available', 'Dedicated support', 'Same-day delivery', 'Gift consultation']
      }
    ],
    faqs: [
      {
        question: 'Can we see items before buying?',
        answer: 'Yes, visit our showroom or request a catalog. We also accept returns as per policy.'
      },
      {
        question: 'Is delivery included?',
        answer: 'Delivery is included in all packages within the city. Outstation delivery at additional cost.'
      },
      {
        question: 'Do you accept custom orders?',
        answer: 'Yes, we can source specific items. Share your requirements and we\'ll arrange.'
      }
    ]
  }
];

export const getServiceById = (id: string): Service | undefined => {
  return services.find(service => service.id === id);
};

export const getServicesByCategory = (category: string): Service[] => {
  return services.filter(service => service.category === category);
};
