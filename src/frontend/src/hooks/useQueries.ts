import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ContactInquiry, WebsiteRating } from '../backend';

// Contact Inquiry Hooks
export function useCreateInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
    }: {
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createInquiry(name, email, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
  });
}

export function useGetAllInquiries() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<ContactInquiry[]>({
    queryKey: ['inquiries'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllInquiries();
    },
    enabled: !!actor && !actorFetching,
  });
}

// Helper functions to parse structured message data
export function parseServiceType(message: string): string {
  const match = message.match(/\[Service: ([^\]]+)\]/);
  return match ? match[1] : 'Other';
}

export function parsePreferredContact(message: string): string {
  const match = message.match(/\[Preferred Contact: ([^\]]+)\]/);
  return match ? match[1] : 'Email';
}

export function parsePhone(message: string): string {
  const match = message.match(/\[Phone: ([^\]]+)\]/);
  return match ? match[1] : 'Not provided';
}

export function parseActualMessage(message: string): string {
  return message
    .replace(/\[Service: [^\]]+\]\s*/, '')
    .replace(/\[Preferred Contact: [^\]]+\]\s*/, '')
    .replace(/\[Phone: [^\]]+\]\s*/, '')
    .trim();
}

// Website Rating Hooks
export function useSubmitRating() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      rating,
      comment,
    }: {
      rating: number;
      comment: string | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitRating(BigInt(rating), comment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recentRatings'] });
      queryClient.invalidateQueries({ queryKey: ['averageRating'] });
      queryClient.invalidateQueries({ queryKey: ['allRatings'] });
    },
  });
}

export function useGetRecentRatings(limit: number = 10) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<WebsiteRating[]>({
    queryKey: ['recentRatings', limit],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRecentRatings(BigInt(limit));
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetAverageRating() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<number | null>({
    queryKey: ['averageRating'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAverageRating();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetAllRatings() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<WebsiteRating[]>({
    queryKey: ['allRatings'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllRatings();
    },
    enabled: !!actor && !actorFetching,
  });
}
