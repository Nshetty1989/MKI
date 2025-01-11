import { supabase } from '@/integrations/supabase/client';
import { ProfileService } from './profile.service';
import { UserOrganizationService } from './user-organization.service';
import type { Organization } from '@/types/organization.types';
import type { OrganizationWithMembers } from '@/types/organization-response.types';

export class OrganizationService {
  static async createOrganization(name: string, userId: string): Promise<Organization | null> {
    try {
      // First check if user already has an organization as creator
      const { data: existingOrg, error: fetchError } = await supabase
        .from('organizations')
        .select('*')
        .eq('created_by', userId)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      if (existingOrg) {
        return existingOrg;
      }

      const { data, error } = await supabase
        .from('organizations')
        .insert({ 
          name,
          created_at: new Date().toISOString(),
          created_by: userId
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating organization:', error);
      return null;
    }
  }

  static async ensureUserOrganization(userId: string, email: string): Promise<Organization | null> {
    try {
      // First check if user already has an organization membership
      const userOrgs = await UserOrganizationService.getUserOrganizations(userId);
      if (userOrgs?.length > 0 && userOrgs[0].organizations) {
        return userOrgs[0].organizations;
      }

      // Get or create user profile
      let profile = await ProfileService.getProfile(userId);
      if (!profile) {
        profile = await ProfileService.createProfile(userId, email);
        if (!profile) throw new Error('Failed to create user profile');
      }

      // Create organization with user ID
      const orgName = `${profile.full_name}'s Organization`;
      const organization = await this.createOrganization(orgName, userId);
      if (!organization) throw new Error('Failed to create organization');

      // Link user to organization if not already linked
      const userOrg = await UserOrganizationService.createUserOrganization(
        userId, 
        organization.id,
        'admin'
      );

      if (!userOrg) throw new Error('Failed to link user to organization');

      return organization;
    } catch (error) {
      console.error('Error ensuring user organization:', error);
      throw error; // Re-throw to handle in calling code
    }
  }
}