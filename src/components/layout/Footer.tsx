import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="gradient-festive border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <span className="text-xl font-bold text-primary-foreground">आ</span>
              </div>
              <span className="text-xl font-bold font-serif">AnandAyojan</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted partner for event and home services. Making celebrations memorable.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/my-bookings" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  My Bookings
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Cancellation Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>support@anandayojan.com</span>
              </li>
              <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} AnandAyojan. All rights reserved.</p>
          <p className="mt-2">
            Trusted by thousands for their special moments 🎉
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
