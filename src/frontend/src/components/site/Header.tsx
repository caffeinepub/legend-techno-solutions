import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import LogoLightbox from './LogoLightbox';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoLightbox, setShowLogoLightbox] = useState(false);

  const scrollToSection = (sectionId: string) => {
    // If not on home page, navigate to home first
    if (window.location.hash !== '' && window.location.hash !== '#/') {
      window.location.hash = '/';
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.warn(`Section with id "${sectionId}" not found`);
      }
    }
    setIsOpen(false);
  };

  const navigateToTeam = () => {
    window.location.hash = '/team';
    setIsOpen(false);
  };

  const navItems = [
    { label: 'Home', id: 'hero', type: 'scroll' as const },
    { label: 'Services', id: 'services', type: 'scroll' as const },
    { label: 'About', id: 'about', type: 'scroll' as const },
    { label: 'Contact', id: 'contact', type: 'scroll' as const },
    { label: 'Ratings', id: 'ratings', type: 'scroll' as const },
    { label: 'Team', id: 'team', type: 'navigate' as const },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 md:h-24 items-center justify-between gap-4">
          <button
            onClick={() => setShowLogoLightbox(true)}
            className="logo-pulse-trigger flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label="View ALGLOBE TECHNO SOLUTIONS logo"
          >
            <img
              src="/assets/generated/alglobe-techno-logo-A-gradient.dim_512x512.png"
              alt="ALGLOBE TECHNO SOLUTIONS"
              className="logo-pulse-image h-12 w-12 md:h-14 md:w-14 object-contain flex-shrink-0"
            />
            <span className="font-bold text-base sm:text-lg md:text-xl text-foreground leading-tight">
              ALGLOBE TECHNO SOLUTIONS
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => item.type === 'navigate' ? navigateToTeam() : scrollToSection(item.id)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:text-foreground whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden flex-shrink-0">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => item.type === 'navigate' ? navigateToTeam() : scrollToSection(item.id)}
                    className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors text-left focus:outline-none focus:text-foreground"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <LogoLightbox
        isOpen={showLogoLightbox}
        onClose={() => setShowLogoLightbox(false)}
      />
    </>
  );
}
