import { useState } from 'react';
import { Handshake, Users, TrendingUp, Award, CheckCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { proxyApi } from '@/services/api';
import { useAuthGate } from '@/components/AuthGate';

const Partner = () => {
  const { user } = useAuth();
  const { requireAuth, AuthModal } = useAuthGate();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    businessName: '',
    serviceType: '',
    experience: '',
    city: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    requireAuth(async () => {
      setIsSubmitting(true);
      try {
        await proxyApi.appsScript('partner', formData);
        toast.success('Application submitted successfully! We will review and contact you soon.');
        
        setFormData({
          name: user?.name || '',
          email: user?.email || '',
          phone: user?.phone || '',
          businessName: '',
          serviceType: '',
          experience: '',
          city: '',
          message: '',
        });
      } catch (error) {
        toast.error('Failed to submit application. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }, 'submit your partner application');
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Handshake className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Partner With Us</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Grow Your Business with AnandAyojan</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our network of verified service providers and reach thousands of customers looking for quality event services
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card border rounded-lg p-6">
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Large Customer Base</h3>
            <p className="text-muted-foreground">
              Get access to thousands of customers actively looking for services like yours
            </p>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Grow Your Revenue</h3>
            <p className="text-muted-foreground">
              Increase your bookings with our easy-to-use platform and marketing support
            </p>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Build Your Brand</h3>
            <p className="text-muted-foreground">
              Showcase your work, gather reviews, and build credibility in the market
            </p>
          </div>
        </div>

        {/* Application Form */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Become a Partner</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="10-digit mobile number"
                />
              </div>

              <div>
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                  placeholder="Your business name"
                />
              </div>

              <div>
                <Label htmlFor="serviceType">Service Type *</Label>
                <Select value={formData.serviceType} onValueChange={(value) => setFormData({ ...formData, serviceType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="photography">Photography</SelectItem>
                    <SelectItem value="decoration">Decoration</SelectItem>
                    <SelectItem value="mehndi">Mehndi Artist</SelectItem>
                    <SelectItem value="makeup">Makeup Artist</SelectItem>
                    <SelectItem value="pandit">Pandit Ji</SelectItem>
                    <SelectItem value="dhol">Dhol & Music</SelectItem>
                    <SelectItem value="helper">Helper Services</SelectItem>
                    <SelectItem value="shopping">Shopping Assistant</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="experience">Years of Experience *</Label>
                <Input
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 5 years"
                />
              </div>

              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder="Your city"
                />
              </div>

              <div>
                <Label htmlFor="message">Tell Us About Your Services</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your services, experience, and what makes you special..."
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </form>
          </div>

          {/* Partner Requirements */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Partner Requirements</h2>
              <div className="space-y-3">
                {[
                  'Professional experience in your field',
                  'Valid business registration (if applicable)',
                  'Quality portfolio or work samples',
                  'Positive customer references',
                  'Commitment to service excellence',
                  'Availability for bookings',
                ].map((req, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h3 className="font-semibold mb-2">How It Works</h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li>1. Submit your application</li>
                <li>2. Our team reviews your profile</li>
                <li>3. Complete verification process</li>
                <li>4. Get onboarded & start receiving bookings</li>
              </ol>
            </div>

            <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Questions?</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Have questions about becoming a partner? Contact us at:
              </p>
              <p className="text-sm font-medium">partner@anandayojan.com</p>
              <p className="text-sm font-medium">+91 98765 43210</p>
            </div>
          </div>
        </div>
      </div>
      <AuthModal />
    </div>
  );
};

export default Partner;
