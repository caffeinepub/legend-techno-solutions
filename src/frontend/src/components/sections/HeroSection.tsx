import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wrench, Phone } from 'lucide-react';

interface HeroSectionProps {
  heading?: string;
  subheading?: string;
}

export default function HeroSection({ heading, subheading }: HeroSectionProps) {
  const [videoError, setVideoError] = useState(false);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[600px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: videoError ? 'url(/assets/generated/legend-techno-hero-bg-v2.dim_1600x900.png)' : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: videoError ? undefined : 'oklch(0.12 0 0)',
      }}
    >
      {!videoError && (
        <video
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/assets/generated/legend-techno-hero-bg-video.dim_1600x900.mp4" type="video/mp4" />
        </video>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/75" />
      
      <div className="container relative z-10 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Wrench className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Professional Tech Services</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            {heading || 'Expert Solutions for All Your Tech Needs'}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {subheading || 'From computer repairs to CCTV installations, we provide reliable, professional services to keep your technology running smoothly.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8"
            >
              Get a Free Quote
            </Button>
            <Button
              onClick={scrollToContact}
              size="lg"
              variant="outline"
              className="text-lg px-8 border-primary/30 hover:bg-primary/10"
            >
              <Phone className="h-5 w-5 mr-2" />
              Contact Us
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
            <div className="flex flex-col items-center gap-2">
              <div className="text-3xl font-bold text-primary">10+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-3xl font-bold text-primary">1000+</div>
              <div className="text-sm text-muted-foreground">Happy Clients</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
