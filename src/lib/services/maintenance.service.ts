import { supabase } from '@/integrations/supabase/client';
import type { MaintenanceRequest } from '@/types/maintenance.types';

export const maintenanceService = {
  createRequest: async (requestData: Omit<MaintenanceRequest, 'id'>) => {
    const { data, error } = await supabase
      .from('maintenance_requests')
      .insert(requestData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  getRequests: async (propertyId: string) => {
    const { data, error } = await supabase
      .from('maintenance_requests')
      .select('*')
      .eq('property_id', propertyId);
    
    if (error) throw error;
    return data;
  },

  updateRequest: async (requestId: string, updates: Partial<MaintenanceRequest>) => {
    const { data, error } = await supabase
      .from('maintenance_requests')
      .update(updates)
      .eq('id', requestId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};