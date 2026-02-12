import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import LogoLightbox from './LogoLightbox';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoLightbox, setShowLogoLightbox] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    } else {
      console.warn(`Section with id "${sectionId}" not found`);
      setIsOpen(false);
    }
  };

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'Services', id: 'services' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
    { label: 'Ratings', id: 'ratings' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <button
            onClick={() => setShowLogoLightbox(true)}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label="View Legend Techno Solutions logo"
          >
            <img
              src="/assets/generated/legend-techno-logo-v2.dim_512x512.png"
              alt="Legend Techno Solutions"
              className="h-10 w-10 object-contain"
            />
            <span className="font-bold text-lg text-foreground hidden sm:inline">
              Legend Techno Solutions
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:text-foreground"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
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
                    onClick={() => scrollToSection(item.id)}
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
