import { useState } from 'react';
import ServiceCard from '@/components/ServiceCard';
import { services } from '@/data/services';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

const Services = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = ['all', ...Array.from(new Set(services.map(s => s.category)))];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen gradient-festive py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">Our Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our complete range of professional services for your events and celebrations
          </p>
        </div>

        {/* Filters */}
        <div className="max-w-3xl mx-auto mb-12 animate-slide-up">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 shadow-soft"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[200px] shadow-soft">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, idx) => (
              <div key={service.id} className="animate-scale-in" style={{ animationDelay: `${idx * 50}ms` }}>
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No services found matching your criteria</p>
          </div>
        )}

        {/* Info Banner */}
        <div className="mt-16 bg-primary/5 border border-primary/20 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-semibold mb-3 font-serif">Not sure what you need?</h3>
          <p className="text-muted-foreground mb-4">
            Contact us and we'll help you plan the perfect event package
          </p>
          <p className="text-lg font-semibold text-primary">
            📞 +91 98765 43210 | ✉️ support@anandayojan.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
