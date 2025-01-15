import { supabase } from '@/integrations/supabase/client';
import type { UserOrganization } from '@/types/organization.types';
import type { UserOrganizationResponse } from '@/types/organization-response.types';

export class UserOrganizationService {
  static async createUserOrganization(
    userId: string, 
    organizationId: string, 
    role: string = 'admin'
  ): Promise<UserOrganization | null> {
    try {
      const { data, error } = await supabase
        .from('user_organizations')
        .insert({
          user_id: userId,
          organization_id: organizationId,
          role,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating user organization:', error);
      return null;
    }
  }

  static async getUserOrganizations(userId: string): Promise<UserOrganizationResponse[]> {
    try {
      const { data, error } = await supabase
        .from('user_organizations')
        .select(`
          *,
          organizations (
            id,
            name,
            created_at,
            created_by
          )
        `)
        .eq('user_id', userId);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting user organizations:', error);
      return [];
    }
  }
}