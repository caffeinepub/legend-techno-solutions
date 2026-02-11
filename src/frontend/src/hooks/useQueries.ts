import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { toast } from 'sonner';
import type { ContactInquiry } from '../backend';

interface CreateInquiryParams {
  name: string;
  email: string;
  message: string;
}

export function useCreateInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: CreateInquiryParams) => {
      if (!actor) throw new Error('Actor not available');
      await actor.createInquiry(params.name, params.email, params.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
      toast.success('Message sent successfully!', {
        description: "We'll get back to you within 24 hours.",
      });
    },
    onError: (error) => {
      console.error('Failed to create inquiry:', error);
      toast.error('Failed to send message', {
        description: 'Please try again or contact us directly.',
      });
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
