import { useState, FormEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useCreateInquiry } from '../../hooks/useQueries';
import { useActor } from '../../hooks/useActor';
import { Loader2, CheckCircle2, Mail, Phone, MapPin, AlertCircle } from 'lucide-react';
import { CONTACT_EMAIL, CONTACT_PHONE } from '../../config/contact';
import type { BusinessHours } from '../../backend';

interface ContactSectionProps {
  heading?: string;
  subheading?: string;
  businessHours?: BusinessHours;
}

export default function ContactSection({ heading, subheading, businessHours }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    message: '',
    preferredContact: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { actor, isFetching } = useActor();
  const isReady = !isFetching && !!actor;
  const createInquiry = useCreateInquiry();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim() && !formData.phone.trim()) {
      newErrors.email = 'Either email or phone is required';
      newErrors.phone = 'Either email or phone is required';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.serviceType) {
      newErrors.serviceType = 'Please select a service type';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please describe your issue or request';
    }

    if (!formData.preferredContact) {
      newErrors.preferredContact = 'Please select a preferred contact method';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isReady) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    const structuredMessage = `
Service Type: ${formData.serviceType}
Preferred Contact: ${formData.preferredContact}
Phone: ${formData.phone || 'Not provided'}

Message:
${formData.message}
    `.trim();

    createInquiry.mutate(
      {
        name: formData.name,
        email: formData.email || 'no-email@provided.com',
        message: structuredMessage,
      },
      {
        onSuccess: () => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            serviceType: '',
            message: '',
            preferredContact: '',
          });
          setErrors({});
        },
      }
    );
  };

  const isSubmitDisabled = !isReady || createInquiry.isPending;
  const showSuccess = createInquiry.isSuccess && !createInquiry.isPending;
  const showError = createInquiry.isError && !createInquiry.isPending;

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {heading || 'Get in Touch'}
            </h2>
            <p className="text-lg text-muted-foreground">
              {subheading || 'Ready to get started? Fill out the form below and we\'ll get back to you promptly.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Contact Information</CardTitle>
                  <CardDescription>Reach out to us directly</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">Phone</div>
                      <div className="text-sm text-muted-foreground">{CONTACT_PHONE}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">Email</div>
                      <div className="text-sm text-muted-foreground">{CONTACT_EMAIL}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">Location</div>
                      <div className="text-sm text-muted-foreground">
                        Serving your local area
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <p className="text-sm text-foreground">
                    <strong>Business Hours:</strong>
                    <br />
                    {businessHours?.days || 'Monday - Friday'}
                    <br />
                    {businessHours?.hours || '9:00 AM - 6:00 PM'}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form and we'll respond within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isReady && (
                  <Alert className="mb-4 border-primary/30 bg-primary/5">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <AlertDescription className="ml-2">
                      Preparing the form... Please wait a moment.
                    </AlertDescription>
                  </Alert>
                )}

                {showSuccess && (
                  <Alert className="mb-4 border-green-600/30 bg-green-600/5">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertDescription className="ml-2 text-green-600">
                      Message sent successfully! We'll get back to you within 24 hours.
                    </AlertDescription>
                  </Alert>
                )}

                {showError && (
                  <Alert className="mb-4 border-destructive/50 bg-destructive/5">
                    <AlertCircle className="h-4 w-4 text-destructive" />
                    <AlertDescription className="ml-2 text-destructive">
                      Failed to send message. Please try again or contact us directly at{' '}
                      <a href={`mailto:${CONTACT_EMAIL}`} className="underline font-medium">
                        {CONTACT_EMAIL}
                      </a>{' '}
                      or{' '}
                      <a href={`tel:${CONTACT_PHONE}`} className="underline font-medium">
                        {CONTACT_PHONE}
                      </a>
                      .
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={errors.name ? 'border-destructive' : ''}
                        disabled={!isReady}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={errors.email ? 'border-destructive' : ''}
                        disabled={!isReady}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={errors.phone ? 'border-destructive' : ''}
                        disabled={!isReady}
                      />
                      {errors.phone && (
                        <p className="text-sm text-destructive">{errors.phone}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="serviceType">
                        Service Type <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.serviceType}
                        onValueChange={(value) =>
                          setFormData({ ...formData, serviceType: value })
                        }
                        disabled={!isReady}
                      >
                        <SelectTrigger
                          id="serviceType"
                          className={errors.serviceType ? 'border-destructive' : ''}
                        >
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Computer Repair">Computer Repair</SelectItem>
                          <SelectItem value="Laptop Repair">Laptop Repair</SelectItem>
                          <SelectItem value="CCTV Installation">CCTV Installation</SelectItem>
                          <SelectItem value="Networking Solutions">Networking Solutions</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.serviceType && (
                        <p className="text-sm text-destructive">{errors.serviceType}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preferredContact">
                      Preferred Contact Method <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.preferredContact}
                      onValueChange={(value) =>
                        setFormData({ ...formData, preferredContact: value })
                      }
                      disabled={!isReady}
                    >
                      <SelectTrigger
                        id="preferredContact"
                        className={errors.preferredContact ? 'border-destructive' : ''}
                      >
                        <SelectValue placeholder="Select contact method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Email">Email</SelectItem>
                        <SelectItem value="Phone">Phone</SelectItem>
                        <SelectItem value="Either">Either</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.preferredContact && (
                      <p className="text-sm text-destructive">{errors.preferredContact}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Message <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={errors.message ? 'border-destructive' : ''}
                      rows={5}
                      placeholder="Please describe your issue or service request..."
                      disabled={!isReady}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive">{errors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={isSubmitDisabled}
                  >
                    {createInquiry.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
