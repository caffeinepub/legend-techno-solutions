import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { toast } from 'sonner';
import type { SiteContent } from '../backend';

const defaultSiteContent: SiteContent = {
  heroHeading: 'Expert Solutions for All Your Tech Needs',
  heroSubheading: 'From computer repairs to CCTV installations, we provide reliable, professional services to keep your technology running smoothly.',
  servicesHeading: 'Our Services',
  servicesDescription: 'Comprehensive technology solutions tailored to your needs. We combine expertise with quality service to deliver results you can trust.',
  aboutHeading: 'About Legend Techno Solutions',
  aboutDescription: 'We are a trusted technology services provider specializing in computer repair, laptop maintenance, CCTV security systems, and networking solutions. Our mission is to deliver reliable, professional service that keeps your technology running at its best.',
  contactHeading: 'Get in Touch',
  contactSubheading: 'Ready to get started? Fill out the form below and we\'ll get back to you promptly.',
  businessHours: {
    days: 'Monday - Friday',
    hours: '9:00 AM - 6:00 PM',
  },
};

export function useGetSiteContent() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<SiteContent>({
    queryKey: ['siteContent'],
    queryFn: async () => {
      if (!actor) return defaultSiteContent;
      try {
        return await actor.getSiteContent();
      } catch (error) {
        console.error('Failed to fetch site content:', error);
        return defaultSiteContent;
      }
    },
    // Always enable the query - it will return defaults if actor isn't ready
    enabled: true,
    placeholderData: defaultSiteContent,
    initialData: defaultSiteContent,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useUpdateSiteContent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newContent: SiteContent) => {
      if (!actor) {
        throw new Error('System is not ready. Please try again.');
      }
      await actor.updateSiteContent(newContent);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siteContent'] });
      toast.success('Site content updated successfully!', {
        description: 'The changes are now live on the home page.',
      });
    },
    onError: (error: any) => {
      console.error('Failed to update site content:', error);
      toast.error('Failed to update site content', {
        description: error.message || 'Please try again or contact support.',
      });
    },
  });
}
