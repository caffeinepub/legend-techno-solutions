import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ContactInquiry } from '../backend';

interface CreateInquiryParams {
  name: string;
  email: string;
  message: string;
}

export function useCreateInquiry() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();
  const isReady = !isFetching && !!actor;

  return useMutation({
    mutationFn: async (params: CreateInquiryParams) => {
      if (!actor || !isReady) {
        throw new Error('System is not ready. Please wait a moment and try again.');
      }
      await actor.createInquiry(params.name, params.email, params.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
    onError: (error) => {
      console.error('Failed to create inquiry:', error);
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

export function parseServiceType(message: string): string {
  const match = message.match(/Service Type:\s*(.+)/);
  return match ? match[1].trim() : 'Unknown';
}

export function parsePreferredContact(message: string): string {
  const match = message.match(/Preferred Contact:\s*(.+)/);
  return match ? match[1].trim() : 'Unknown';
}

export function parsePhone(message: string): string {
  const match = message.match(/Phone:\s*(.+)/);
  return match ? match[1].trim() : 'Not provided';
}

export function parseActualMessage(message: string): string {
  const match = message.match(/Message:\s*([\s\S]+)/);
  return match ? match[1].trim() : message;
}
