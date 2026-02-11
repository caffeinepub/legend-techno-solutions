import { SiFacebook, SiX, SiLinkedin, SiInstagram } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'legend-techno-solutions'
  );

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="/assets/generated/legend-techno-logo-uploaded.dim_512x512.png"
                alt="Legend Techno Solutions"
                className="h-8 w-8 object-contain"
              />
              <span className="font-bold text-foreground">Legend Techno</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Professional computer repair, laptop services, CCTV installation, and networking solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Services', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-sm text-muted-foreground hover:text-amber-600 transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Computer Repair</li>
              <li>Laptop Repair</li>
              <li>CCTV Installation</li>
              <li>Networking Solutions</li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Get Started</h3>
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-amber-600 hover:bg-amber-700 text-white w-full mb-4"
            >
              Request Service
            </Button>
            <div className="flex gap-3">
              <a href="#" className="text-muted-foreground hover:text-amber-600 transition-colors">
                <SiFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-amber-600 transition-colors">
                <SiX className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-amber-600 transition-colors">
                <SiLinkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-amber-600 transition-colors">
                <SiInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Legend Techno Solutions. All rights reserved.
          </p>
          <p className="mt-2 flex items-center justify-center gap-1">
            Built with <Heart className="h-4 w-4 text-amber-600 fill-amber-600" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 hover:text-amber-700 font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
