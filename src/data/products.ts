export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  image: string;
  shortDescription: string;
  fullDescription: string;
  category: 'Utensils' | 'Clothes' | 'Decorative' | 'Gift Items';
  inventory: number;
  tags: string[];
}

export const products: Product[] = [
  {
    id: 'prod-001',
    name: 'Traditional Copper Kalash Set',
    sku: 'KALASH-001',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500&h=500&fit=crop',
    shortDescription: 'Premium copper kalash for traditional ceremonies',
    fullDescription: 'Beautifully crafted copper kalash set perfect for Bhaat and Mayera ceremonies. Includes kalash, coconut holder, and decorative plate.',
    category: 'Utensils',
    inventory: 25,
    tags: ['bhaat', 'mayera', 'traditional', 'copper']
  },
  {
    id: 'prod-002',
    name: 'Decorative Thali Set (5 pieces)',
    sku: 'THALI-002',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=500&h=500&fit=crop',
    shortDescription: 'Complete thali set for traditional rituals',
    fullDescription: 'Elegant brass thali set with 5 pieces including main thali, small bowls, and accessories. Perfect for ceremonial use.',
    category: 'Utensils',
    inventory: 30,
    tags: ['thali', 'brass', 'ceremony']
  },
  {
    id: 'prod-003',
    name: 'Bridal Saree - Red & Gold',
    sku: 'SAREE-003',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&h=500&fit=crop',
    shortDescription: 'Premium silk saree with golden zari work',
    fullDescription: 'Luxurious red silk saree with intricate golden zari embroidery. Perfect for Bhaat ceremony. Includes matching blouse piece.',
    category: 'Clothes',
    inventory: 15,
    tags: ['saree', 'bridal', 'silk', 'red']
  },
  {
    id: 'prod-004',
    name: 'Traditional Kurta Set',
    sku: 'KURTA-004',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=500&fit=crop',
    shortDescription: 'Elegant kurta pajama set for groom',
    fullDescription: 'Premium cotton kurta pajama set in cream color with subtle embroidery. Perfect for pre-wedding ceremonies.',
    category: 'Clothes',
    inventory: 20,
    tags: ['kurta', 'groom', 'traditional']
  },
  {
    id: 'prod-005',
    name: 'Decorative Diya Set (12 pieces)',
    sku: 'DIYA-005',
    price: 850,
    image: 'https://images.unsplash.com/photo-1604608672516-f1b9b1a4a0ff?w=500&h=500&fit=crop',
    shortDescription: 'Hand-painted clay diyas for decoration',
    fullDescription: 'Set of 12 beautifully hand-painted clay diyas. Perfect for decorating the venue and adding traditional charm.',
    category: 'Decorative',
    inventory: 50,
    tags: ['diya', 'decoration', 'handmade']
  },
  {
    id: 'prod-006',
    name: 'Floral Garland - Marigold',
    sku: 'GARLAND-006',
    price: 500,
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=500&h=500&fit=crop',
    shortDescription: 'Fresh marigold garland (6 feet)',
    fullDescription: 'Fresh marigold garland, 6 feet long. Perfect for traditional ceremonies. Will be delivered fresh on your specified date.',
    category: 'Decorative',
    inventory: 100,
    tags: ['flowers', 'garland', 'fresh']
  },
  {
    id: 'prod-007',
    name: 'Silver Coin Gift Pack',
    sku: 'COIN-007',
    price: 5000,
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=500&h=500&fit=crop',
    shortDescription: '10 grams silver coin with box',
    fullDescription: 'Pure 999 silver coin (10 grams) in an elegant gift box. Perfect for gifting during Bhaat and Mayera ceremonies.',
    category: 'Gift Items',
    inventory: 40,
    tags: ['silver', 'gift', 'traditional']
  },
  {
    id: 'prod-008',
    name: 'Decorative Toran (Door Hanging)',
    sku: 'TORAN-008',
    price: 650,
    image: 'https://images.unsplash.com/photo-1582274528667-1e8a10ded4bf?w=500&h=500&fit=crop',
    shortDescription: 'Traditional door hanging with beads',
    fullDescription: 'Beautiful handcrafted toran with beads and artificial flowers. Perfect for decorating entrance. Length: 3 feet.',
    category: 'Decorative',
    inventory: 45,
    tags: ['toran', 'decoration', 'entrance']
  },
  {
    id: 'prod-009',
    name: 'Puja Box - Complete Set',
    sku: 'PUJA-009',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=500&h=500&fit=crop',
    shortDescription: 'All-in-one puja essentials box',
    fullDescription: 'Complete puja box containing all essential items: incense sticks, camphor, kumkum, turmeric, rice, and more.',
    category: 'Gift Items',
    inventory: 60,
    tags: ['puja', 'essentials', 'gift']
  },
  {
    id: 'prod-010',
    name: 'Decorative Rangoli Stencils',
    sku: 'RANGOLI-010',
    price: 350,
    image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=500&h=500&fit=crop',
    shortDescription: 'Reusable rangoli design stencils',
    fullDescription: 'Set of 5 reusable rangoli stencils with traditional designs. Make beautiful rangolis easily. Includes color powder.',
    category: 'Decorative',
    inventory: 70,
    tags: ['rangoli', 'decoration', 'reusable']
  },
  {
    id: 'prod-011',
    name: 'Wedding Gift Basket',
    sku: 'BASKET-011',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=500&h=500&fit=crop',
    shortDescription: 'Premium gift basket with assorted items',
    fullDescription: 'Beautifully arranged gift basket containing dry fruits, sweets, decorative items, and traditional gifts.',
    category: 'Gift Items',
    inventory: 25,
    tags: ['gift', 'basket', 'premium']
  },
  {
    id: 'prod-012',
    name: 'Traditional Chunri Set (5 pieces)',
    sku: 'CHUNRI-012',
    price: 800,
    image: 'https://images.unsplash.com/photo-1610375461369-d613b564f67c?w=500&h=500&fit=crop',
    shortDescription: 'Colorful chunri for ceremonies',
    fullDescription: 'Set of 5 traditional chunris in assorted colors. Perfect for Bhaat ceremony and gifting purposes.',
    category: 'Clothes',
    inventory: 55,
    tags: ['chunri', 'traditional', 'ceremony']
  },
  {
    id: 'prod-013',
    name: 'Brass Diya Stand',
    sku: 'STAND-013',
    price: 950,
    image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=500&h=500&fit=crop',
    shortDescription: 'Elegant brass diya stand',
    fullDescription: 'Premium brass diya stand with intricate carvings. Height: 12 inches. Adds elegance to your puja setup.',
    category: 'Utensils',
    inventory: 35,
    tags: ['brass', 'diya', 'stand']
  },
  {
    id: 'prod-014',
    name: 'Decorative Patla Set',
    sku: 'PATLA-014',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=500&h=500&fit=crop',
    shortDescription: 'Traditional wooden patla for gifting',
    fullDescription: 'Beautifully decorated wooden patla with traditional motifs. Perfect for presenting gifts during ceremonies.',
    category: 'Gift Items',
    inventory: 30,
    tags: ['patla', 'wooden', 'gifting']
  },
  {
    id: 'prod-015',
    name: 'Bandhani Dupatta',
    sku: 'DUPATTA-015',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1617012401471-5a21e1dc5518?w=500&h=500&fit=crop',
    shortDescription: 'Traditional bandhani silk dupatta',
    fullDescription: 'Premium silk dupatta with authentic Rajasthani bandhani work. Length: 2.5 meters. Available in multiple colors.',
    category: 'Clothes',
    inventory: 40,
    tags: ['dupatta', 'bandhani', 'silk']
  }
];
