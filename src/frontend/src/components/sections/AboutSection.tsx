import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Clock, Shield, Wrench, Users, Award } from 'lucide-react';

interface AboutSectionProps {
  heading?: string;
  description?: string;
}

export default function AboutSection({ heading, description }: AboutSectionProps) {
  const features = [
    {
      icon: Clock,
      title: 'Fast Turnaround',
      description: 'Quick diagnostics and efficient repairs to minimize your downtime',
    },
    {
      icon: Shield,
      title: 'Genuine Parts',
      description: 'We use only authentic, high-quality components for all repairs',
    },
    {
      icon: Wrench,
      title: 'On-Site Support',
      description: 'Convenient service at your location for businesses and homes',
    },
    {
      icon: Users,
      title: 'Expert Technicians',
      description: 'Certified professionals with years of hands-on experience',
    },
    {
      icon: Award,
      title: 'Quality Guarantee',
      description: 'All work backed by our comprehensive warranty and support',
    },
    {
      icon: CheckCircle2,
      title: 'Transparent Pricing',
      description: 'Clear quotes with no hidden fees or surprise charges',
    },
  ];

  return (
    <section
      id="about"
      className="relative py-20 overflow-hidden bg-background"
      style={{
        backgroundImage: 'url(/assets/generated/legend-techno-hero-bg-v2.dim_1600x900.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/75" />
      
      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {heading || 'About ALGLOE TECHNO SOLUTIONS'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {description || 'We are a trusted technology services provider specializing in computer repair, laptop maintenance, CCTV security systems, and networking solutions. Our mission is to deliver reliable, professional service that keeps your technology running at its best.'}
            </p>
          </div>

          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <p className="text-center text-lg text-foreground">
                With a commitment to quality and customer satisfaction, we serve residential and
                commercial clients with personalized solutions designed to meet their unique needs.
                Our experienced team stays current with the latest technology to provide expert
                service you can depend on.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex gap-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
