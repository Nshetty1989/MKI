import { supabase } from '@/integrations/supabase/client';
import { OrganizationService } from './organization.service';
import { ProfileService } from './profile.service';

export const accountSettingsService = {
  async updateAccountSettings(data: any) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      // First update the profile
      const updatedProfile = await ProfileService.updateProfile(user.id, {
        full_name: data.fullName,
        email: data.email,
        phone_number: data.phoneNumber,
        government_id: data.governmentId,
        address: data.address
      });

      if (!updatedProfile) {
        throw new Error('Failed to update profile');
      }

      // Update organization name based on full name if needed
      if (data.fullName) {
        await OrganizationService.ensureUserOrganization(user.id, data.email);
      }

      return updatedProfile;
    } catch (error) {
      console.error('Error updating account settings:', error);
      throw error;
    }
  },

  async getAccountSettings() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const profile = await ProfileService.getProfile(user.id);
      if (!profile) throw new Error('Profile not found');

      // Transform profile data to form structure
      return {
        fullName: profile.full_name || '',
        email: profile.email,
        phoneNumber: profile.phone_number || '',
        governmentId: profile.government_id || { type: '', number: '' },
        address: profile.address || {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: ''
        }
      };
    } catch (error) {
      console.error('Error getting account settings:', error);
      throw error;
    }
  }
};