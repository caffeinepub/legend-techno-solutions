import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Save } from 'lucide-react';
import { useGetSiteContent, useUpdateSiteContent } from '../../hooks/useSiteContent';
import type { SiteContent } from '../../backend';

export default function SiteContentEditor() {
  const { data: siteContent, isLoading } = useGetSiteContent();
  const updateSiteContent = useUpdateSiteContent();

  const [formData, setFormData] = useState<SiteContent>({
    heroHeading: '',
    heroSubheading: '',
    servicesHeading: '',
    servicesDescription: '',
    aboutHeading: '',
    aboutDescription: '',
    contactHeading: '',
    contactSubheading: '',
    businessHours: {
      days: '',
      hours: '',
    },
  });

  useEffect(() => {
    if (siteContent) {
      setFormData(siteContent);
    }
  }, [siteContent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteContent.mutate(formData);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Site Content Editor</CardTitle>
        <CardDescription>
          Update the marketing copy and business information displayed on the home page
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hero Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground border-b pb-2">Hero Section</h3>
            <div className="space-y-2">
              <Label htmlFor="heroHeading">Hero Heading</Label>
              <Input
                id="heroHeading"
                value={formData.heroHeading}
                onChange={(e) => setFormData({ ...formData, heroHeading: e.target.value })}
                placeholder="Main headline for the hero section"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heroSubheading">Hero Subheading</Label>
              <Textarea
                id="heroSubheading"
                value={formData.heroSubheading}
                onChange={(e) => setFormData({ ...formData, heroSubheading: e.target.value })}
                placeholder="Supporting text for the hero section"
                rows={3}
              />
            </div>
          </div>

          {/* Services Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground border-b pb-2">Services Section</h3>
            <div className="space-y-2">
              <Label htmlFor="servicesHeading">Services Heading</Label>
              <Input
                id="servicesHeading"
                value={formData.servicesHeading}
                onChange={(e) => setFormData({ ...formData, servicesHeading: e.target.value })}
                placeholder="Services section title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="servicesDescription">Services Description</Label>
              <Textarea
                id="servicesDescription"
                value={formData.servicesDescription}
                onChange={(e) => setFormData({ ...formData, servicesDescription: e.target.value })}
                placeholder="Brief description of your services"
                rows={3}
              />
            </div>
          </div>

          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground border-b pb-2">About Section</h3>
            <div className="space-y-2">
              <Label htmlFor="aboutHeading">About Heading</Label>
              <Input
                id="aboutHeading"
                value={formData.aboutHeading}
                onChange={(e) => setFormData({ ...formData, aboutHeading: e.target.value })}
                placeholder="About section title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aboutDescription">About Description</Label>
              <Textarea
                id="aboutDescription"
                value={formData.aboutDescription}
                onChange={(e) => setFormData({ ...formData, aboutDescription: e.target.value })}
                placeholder="Company description and mission"
                rows={4}
              />
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground border-b pb-2">Contact Section</h3>
            <div className="space-y-2">
              <Label htmlFor="contactHeading">Contact Heading</Label>
              <Input
                id="contactHeading"
                value={formData.contactHeading}
                onChange={(e) => setFormData({ ...formData, contactHeading: e.target.value })}
                placeholder="Contact section title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactSubheading">Contact Subheading</Label>
              <Textarea
                id="contactSubheading"
                value={formData.contactSubheading}
                onChange={(e) => setFormData({ ...formData, contactSubheading: e.target.value })}
                placeholder="Contact section description"
                rows={2}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessDays">Business Days</Label>
                <Input
                  id="businessDays"
                  value={formData.businessHours.days}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      businessHours: { ...formData.businessHours, days: e.target.value },
                    })
                  }
                  placeholder="e.g., Monday - Friday"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessHours">Business Hours</Label>
                <Input
                  id="businessHours"
                  value={formData.businessHours.hours}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      businessHours: { ...formData.businessHours, hours: e.target.value },
                    })
                  }
                  placeholder="e.g., 9:00 AM - 6:00 PM"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={updateSiteContent.isPending}
              className="bg-amber-600 hover:bg-amber-700"
            >
              {updateSiteContent.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
