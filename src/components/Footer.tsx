
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Mail, 
  MapPin, 
  Phone, 
  BookOpen, 
  Users, 
  Share2, 
  Sparkles,
  Library,
  Target,
  HelpCircle,
  Video,
  UserPlus,
  LayoutTemplate
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    
    if (email) {
      toast({
        title: "Subscription Successful",
        description: `${email} has been added to our newsletter.`,
      });
      e.target.reset();
    } else {
      toast({
        title: "Subscription Failed",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
    }
  };

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              About CodeScribe
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              CodeScribe is a comprehensive platform designed to simplify code documentation 
              while fostering a collaborative learning environment for developers at all levels.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                 className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                 className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                 className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                 className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Share2 className="h-5 w-5 text-primary" />
              Platform Features
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <ul className="space-y-2">
                  <li>
                    <Link to="/learn" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
                      <BookOpen className="h-4 w-4" />
                      Learning
                    </Link>
                  </li>
                  <li>
                    <Link to="/community" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
                      <Users className="h-4 w-4" />
                      Community
                    </Link>
                  </li>
                  <li>
                    <Link to="/collaborate" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
                      <Share2 className="h-4 w-4" />
                      Collaborate
                    </Link>
                  </li>
                  <li>
                    <Link to="/assistant" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
                      <Sparkles className="h-4 w-4" />
                      AI Assistant
                    </Link>
                  </li>
                  <li>
                    <Link to="/resources" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
                      <Library className="h-4 w-4" />
                      Resources
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2">
                  <li>
                    <Link to="/progress" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
                      <Target className="h-4 w-4" />
                      Progress
                    </Link>
                  </li>
                  <li>
                    <Link to="/quizzes" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
                      <HelpCircle className="h-4 w-4" />
                      Quizzes
                    </Link>
                  </li>
                  <li>
                    <Link to="/workshops" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
                      <Video className="h-4 w-4" />
                      Workshops
                    </Link>
                  </li>
                  <li>
                    <Link to="/mentorship" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
                      <UserPlus className="h-4 w-4" />
                      Mentorship
                    </Link>
                  </li>
                  <li>
                    <Link to="/showcase" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
                      <LayoutTemplate className="h-4 w-4" />
                      Showcase
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-primary mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  123 Documentation Lane, Code City, 94043
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-primary" />
                <a 
                  href="tel:+11234567890" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-primary" />
                <a 
                  href="mailto:support@codescribe.com" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  support@codescribe.com
                </a>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-primary/5 rounded-md">
              <p className="text-sm">
                <strong>Office Hours:</strong><br />
                Monday - Friday: 9am - 5pm PST<br />
                Saturday - Sunday: Closed
              </p>
            </div>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Stay Updated
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest updates, resources, and documentation tips.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <Input 
                  placeholder="Your email address" 
                  type="email" 
                  name="email"
                  className="flex-1" 
                  required
                />
                <Button type="submit" size="sm">Subscribe</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to our {' '}
                <Link to="/privacy-policy" className="underline hover:text-primary">
                  Privacy Policy
                </Link>.
              </p>
            </form>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} CodeScribe. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookie-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
