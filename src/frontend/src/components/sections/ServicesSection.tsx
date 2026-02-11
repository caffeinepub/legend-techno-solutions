import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Monitor, Laptop, Camera, Network, LucideIcon } from 'lucide-react';
import { useState } from 'react';

interface ServicesSectionProps {
  heading?: string;
  description?: string;
}

export default function ServicesSection({ heading, description }: ServicesSectionProps) {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      icon: Monitor,
      title: 'Computer Repair',
      description:
        'Expert diagnosis and repair for desktops. We handle hardware failures, software issues, virus removal, and system upgrades with genuine parts and professional care.',
      image: '/assets/generated/service-computer-repair.dim_512x512.png',
      animation: 'animate-float-gentle',
    },
    {
      icon: Laptop,
      title: 'Laptop Repair',
      description:
        'Comprehensive laptop services including screen replacement, keyboard repair, battery replacement, and performance optimization. Fast turnaround for all major brands.',
      image: '/assets/generated/service-laptop-repair.dim_512x512.png',
      animation: 'animate-tilt-gentle',
    },
    {
      icon: Camera,
      title: 'CCTV Installation',
      description:
        'Professional security camera installation and setup. We design custom surveillance systems for homes and businesses with remote monitoring capabilities.',
      image: '/assets/generated/service-cctv-installation.dim_512x512.png',
      animation: 'animate-pulse-scale',
    },
    {
      icon: Network,
      title: 'Networking Solutions',
      description:
        'Complete network setup and troubleshooting services. From home Wi-Fi optimization to business network infrastructure, we ensure reliable connectivity.',
      image: '/assets/generated/service-networking-solutions.dim_512x512.png',
      animation: 'animate-float-gentle',
    },
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {heading || 'Our Services'}
          </h2>
          <p className="text-lg text-muted-foreground">
            {description || 'Comprehensive technology solutions tailored to your needs. We combine expertise with quality service to deliver results you can trust.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} onRequestService={scrollToContact} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  service: {
    icon: LucideIcon;
    title: string;
    description: string;
    image: string;
    animation: string;
  };
  onRequestService: () => void;
}

function ServiceCard({ service, onRequestService }: ServiceCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const Icon = service.icon;

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  return (
    <Card className="border-border hover:border-primary/50 transition-colors overflow-hidden">
      <div className="relative h-48 bg-muted/50 overflow-hidden">
        {/* Placeholder/Fallback Layer */}
        {(!imageLoaded || imageError) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-muted/80">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <Icon className="h-12 w-12 text-primary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">{service.title}</span>
          </div>
        )}
        
        {/* Actual Image */}
        {!imageError && (
          <img
            src={service.image}
            alt={service.title}
            className={`w-full h-full object-cover ${service.animation} ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
      </div>
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
            <CardDescription className="text-base">
              {service.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Button
          onClick={onRequestService}
          variant="outline"
          className="w-full border-primary/30 hover:bg-primary/10 hover:text-primary"
        >
          Request Service
        </Button>
      </CardContent>
    </Card>
  );
}
