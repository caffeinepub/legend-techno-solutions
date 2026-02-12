import { Card, CardContent } from '@/components/ui/card';

export default function TeamPage() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Team
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the dedicated professionals behind ALGLOBE TECHNO SOLUTIONS
          </p>
        </div>

        <div className="flex justify-center">
          <Card className="w-full max-w-sm bg-card border-border hover:shadow-lg transition-shadow">
            <CardContent className="pt-8 pb-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <img
                    src="/assets/generated/alglobe-team-founder-men-logo.dim_512x512.png"
                    alt="Founder portrait icon"
                    className="w-40 h-40 md:w-48 md:h-48 object-contain"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-primary uppercase tracking-wide">
                    Founder
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    SWAROOP N
                  </h2>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
