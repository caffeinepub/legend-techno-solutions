import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Monitor, Laptop, Camera, Network } from 'lucide-react';

export default function ServicesSection() {
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
    },
    {
      icon: Laptop,
      title: 'Laptop Repair',
      description:
        'Comprehensive laptop services including screen replacement, keyboard repair, battery replacement, and performance optimization. Fast turnaround for all major brands.',
    },
    {
      icon: Camera,
      title: 'CCTV Installation',
      description:
        'Professional security camera installation and setup. We design custom surveillance systems for homes and businesses with remote monitoring capabilities.',
    },
    {
      icon: Network,
      title: 'Networking Solutions',
      description:
        'Complete network setup and troubleshooting services. From home Wi-Fi optimization to business network infrastructure, we ensure reliable connectivity.',
    },
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive technology solutions tailored to your needs. We combine expertise with
            quality service to deliver results you can trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="border-border hover:border-amber-600/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-amber-600/10 border border-amber-600/20">
                      <Icon className="h-6 w-6 text-amber-600" />
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
                    onClick={scrollToContact}
                    variant="outline"
                    className="w-full border-amber-600/30 hover:bg-amber-600/10 hover:text-amber-600"
                  >
                    Request Service
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
