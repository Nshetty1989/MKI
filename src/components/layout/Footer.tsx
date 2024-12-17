import { Crown, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-kingdom-dark to-black py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-kingdom-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-kingdom-secondary/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Crown className="h-8 w-8 text-kingdom-accent animate-glow" />
              <span className="text-2xl font-bold gradient-text">MyKingdom</span>
            </div>
            <p className="text-kingdom-muted">
              Revolutionizing property management with AI-powered solutions for the modern era.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-kingdom-muted hover:text-kingdom-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-kingdom-muted hover:text-kingdom-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-kingdom-muted hover:text-kingdom-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-kingdom-muted hover:text-kingdom-primary transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="text-kingdom-muted hover:text-kingdom-primary transition-colors">Features</a>
              </li>
              <li>
                <a href="#" className="text-kingdom-muted hover:text-kingdom-primary transition-colors">Pricing</a>
              </li>
              <li>
                <a href="#" className="text-kingdom-muted hover:text-kingdom-primary transition-colors">Blog</a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Support</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-kingdom-muted hover:text-kingdom-primary transition-colors">Help Center</a>
              </li>
              <li>
                <a href="#" className="text-kingdom-muted hover:text-kingdom-primary transition-colors">Documentation</a>
              </li>
              <li>
                <a href="#" className="text-kingdom-muted hover:text-kingdom-primary transition-colors">API Reference</a>
              </li>
              <li>
                <a href="#" className="text-kingdom-muted hover:text-kingdom-primary transition-colors">Status</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Stay Updated</h3>
            <p className="text-kingdom-muted mb-4">
              Subscribe to our newsletter for the latest updates and features.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="futuristic-input flex-1"
              />
              <Button className="relative group overflow-hidden">
                <span className="absolute inset-0 w-full h-full transition-all duration-300 transform translate-x-full group-hover:translate-x-0 bg-gradient-primary"></span>
                <Mail className="relative z-10 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-kingdom-primary/20 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-kingdom-muted text-sm">
              © {currentYear} MyKingdom. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-kingdom-muted hover:text-kingdom-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-kingdom-muted hover:text-kingdom-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-kingdom-muted hover:text-kingdom-primary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};