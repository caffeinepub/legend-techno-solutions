import { useState, useMemo } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetAllInquiries, useGetAllRatings, parseServiceType, parsePreferredContact, parsePhone, parseActualMessage } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Loader2, ArrowLeft, Search, Star } from 'lucide-react';
import LoginButton from '../components/auth/LoginButton';
import AccessDeniedScreen from '../components/auth/AccessDeniedScreen';
import SiteContentEditor from '../components/admin/SiteContentEditor';
import { useActor } from '../hooks/useActor';
import { useQuery } from '@tanstack/react-query';

export default function AdminPage() {
  const { identity, isInitializing } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !!identity && !actorFetching,
  });

  const { data: inquiries, isLoading: inquiriesLoading } = useGetAllInquiries();
  const { data: ratings, isLoading: ratingsLoading } = useGetAllRatings();

  const filteredInquiries = useMemo(() => {
    if (!inquiries) return [];

    // Sort by timestamp descending (most recent first)
    const sorted = [...inquiries].sort((a, b) => {
      return Number(b.timestamp - a.timestamp);
    });

    return sorted.filter((inquiry) => {
      const serviceType = parseServiceType(inquiry.message);
      const matchesService = serviceFilter === 'all' || serviceType === serviceFilter;
      
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        inquiry.name.toLowerCase().includes(searchLower) ||
        inquiry.email.toLowerCase().includes(searchLower) ||
        inquiry.message.toLowerCase().includes(searchLower);

      return matchesService && matchesSearch;
    });
  }, [inquiries, serviceFilter, searchQuery]);

  const goHome = () => {
    window.location.hash = '';
  };

  if (isInitializing || actorFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!identity) {
    return <AccessDeniedScreen />;
  }

  if (isAdminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return <AccessDeniedScreen />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={goHome}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">ALGLOBE TECHNO SOLUTIONS</p>
            </div>
          </div>
          <LoginButton />
        </div>
      </header>

      <main className="container py-8 space-y-8">
        {/* Site Content Editor */}
        <SiteContentEditor />

        {/* Contact Inquiries */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Contact Inquiries</CardTitle>
            <CardDescription>
              Manage and respond to customer service requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or message..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filter by service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="Computer Repair">Computer Repair</SelectItem>
                  <SelectItem value="Laptop Repair">Laptop Repair</SelectItem>
                  <SelectItem value="CCTV Installation">CCTV Installation</SelectItem>
                  <SelectItem value="Networking">Networking</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {inquiriesLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredInquiries.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {inquiries?.length === 0
                  ? 'No inquiries yet'
                  : 'No inquiries match your filters'}
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Message</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInquiries.map((inquiry) => {
                      const date = new Date(Number(inquiry.timestamp) / 1000000);
                      const serviceType = parseServiceType(inquiry.message);
                      const preferredContact = parsePreferredContact(inquiry.message);
                      const phone = parsePhone(inquiry.message);
                      const actualMessage = parseActualMessage(inquiry.message);

                      return (
                        <TableRow key={inquiry.id.toString()}>
                          <TableCell className="whitespace-nowrap">
                            {date.toLocaleDateString()}
                            <br />
                            <span className="text-xs text-muted-foreground">
                              {date.toLocaleTimeString()}
                            </span>
                          </TableCell>
                          <TableCell className="font-medium">{inquiry.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="whitespace-nowrap">
                              {serviceType}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{inquiry.email}</div>
                              {phone !== 'Not provided' && (
                                <div className="text-muted-foreground">{phone}</div>
                              )}
                              <div className="text-xs text-muted-foreground mt-1">
                                Prefers: {preferredContact}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-md">
                            <div className="text-sm line-clamp-3">{actualMessage}</div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Website Ratings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Website Ratings</CardTitle>
            <CardDescription>
              Customer feedback and ratings
            </CardDescription>
          </CardHeader>
          <CardContent>
            {ratingsLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : !ratings || ratings.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No ratings yet
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Comment</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ratings.map((rating) => {
                      const date = new Date(Number(rating.timestamp) / 1000000);
                      return (
                        <TableRow key={rating.id.toString()}>
                          <TableCell className="whitespace-nowrap">
                            {date.toLocaleDateString()}
                            <br />
                            <span className="text-xs text-muted-foreground">
                              {date.toLocaleTimeString()}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= Number(rating.rating)
                                      ? 'fill-primary text-primary'
                                      : 'text-muted-foreground'
                                  }`}
                                />
                              ))}
                              <span className="ml-2 text-sm font-medium">
                                {rating.rating.toString()}/5
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-md">
                            {rating.comment ? (
                              <div className="text-sm">{rating.comment}</div>
                            ) : (
                              <span className="text-sm text-muted-foreground italic">
                                No comment
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
