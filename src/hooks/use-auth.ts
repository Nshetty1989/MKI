import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { OrganizationService } from '@/lib/services/organization.service';
import { useToast } from '@/hooks/use-toast';
import type { Organization } from '@/types/organization.types';

export function useAuth() {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;

    async function loadUserOrganization() {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        if (session?.user) {
          const org = await OrganizationService.ensureUserOrganization(session.user.id, session.user.email!);
          if (org && mounted) {
            setOrganization(org);
          }
        }
      } catch (err: any) {
        console.error('Error loading user organization:', err);
        if (mounted) {
          setError(err);
          toast({
            title: "Error",
            description: "Failed to load organization data. Please try refreshing the page.",
            variant: "destructive"
          });
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadUserOrganization();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        await loadUserOrganization();
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [toast]);

  return {
    organization,
    organizationId: organization?.id || null,
    isLoading,
    error
  };
}