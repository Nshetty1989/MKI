import { supabase } from '@/integrations/supabase/client';
import type { Property } from '@/types/property.types';

export const propertyService = {
  createProperty: async (propertyData: Omit<Property, 'id'>) => {
    const { data, error } = await supabase
      .from('properties')
      .insert(propertyData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  getProperties: async (organizationId: string) => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('organization_id', organizationId);
    
    if (error) throw error;
    return data;
  },

  getPropertyById: async (propertyId: string) => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', propertyId)
      .single();
    
    if (error) throw error;
    return data;
  },

  updateProperty: async (propertyId: string, updates: Partial<Property>) => {
    const { data, error } = await supabase
      .from('properties')
      .update(updates)
      .eq('id', propertyId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  deleteProperty: async (propertyId: string) => {
    // Check for active tenants/leases
    const { data: activeUnits, error: unitsError } = await supabase
      .from('units')
      .select('id')
      .eq('property_id', propertyId)
      .eq('status', 'occupied')
      .single();

    if (unitsError && unitsError.code !== 'PGRST116') {
      throw unitsError;
    }

    if (activeUnits) {
      throw new Error('Cannot delete property with occupied units');
    }

    // Perform deletion
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', propertyId);

    if (error) throw error;
    return true;
  }
};