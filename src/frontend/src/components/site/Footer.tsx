import { useState } from 'react';
import { SiFacebook, SiX, SiInstagram, SiLinkedin } from 'react-icons/si';
import { Heart } from 'lucide-react';
import LogoLightbox from './LogoLightbox';

export default function Footer() {
  const [showLogoLightbox, setShowLogoLightbox] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn(`Section with id "${sectionId}" not found`);
    }
  };

  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'algloe-techno'
  );

  return (
    <>
      <footer className="bg-card border-t border-border">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <button
                onClick={() => setShowLogoLightbox(true)}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                aria-label="View ALGLOE TECHNO SOLUTIONS logo"
              >
                <img
                  src="/assets/generated/legend-techno-logo-v2.dim_512x512.png"
                  alt="ALGLOE TECHNO SOLUTIONS"
                  className="h-12 w-12 object-contain"
                />
                <span className="font-bold text-foreground">
                  ALGLOE TECHNO
                </span>
              </button>
              <p className="text-sm text-muted-foreground">
                Professional tech solutions for all your needs
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection('hero')}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:text-foreground"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:text-foreground"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('about')}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:text-foreground"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:text-foreground"
                  >
                    Contact
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('ratings')}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:text-foreground"
                  >
                    Ratings
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Computer Repair</li>
                <li>Laptop Repair</li>
                <li>CCTV Installation</li>
                <li>Networking Solutions</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                  <SiFacebook className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="X (Twitter)"
                >
                  <SiX className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <SiInstagram className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <SiLinkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>
              © {currentYear} ALGLOE TECHNO SOLUTIONS. All rights reserved.
            </p>
            <p className="mt-2 flex items-center justify-center gap-1">
              Built with <Heart className="h-4 w-4 text-primary fill-primary" /> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      <LogoLightbox
        isOpen={showLogoLightbox}
        onClose={() => setShowLogoLightbox(false)}
      />
    </>
  );
}
