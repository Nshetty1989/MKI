import { supabase } from '@/integrations/supabase/client';
import type { Tenant } from '@/types/tenant.types';

export const tenantService = {
  createTenant: async (tenantData: Omit<Tenant, 'id'>) => {
    const { data, error } = await supabase
      .from('tenants')
      .insert(tenantData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  getTenants: async (organizationId: string) => {
    const { data, error } = await supabase
      .from('tenants')
      .select('*')
      .eq('organization_id', organizationId);
    
    if (error) throw error;
    return data;
  },

  getTenantById: async (tenantId: string) => {
    const { data, error } = await supabase
      .from('tenants')
      .select('*')
      .eq('id', tenantId)
      .single();
    
    if (error) throw error;
    return data;
  },

  updateTenant: async (tenantId: string, updates: Partial<Tenant>) => {
    const { data, error } = await supabase
      .from('tenants')
      .update(updates)
      .eq('id', tenantId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  deleteTenant: async (tenantId: string) => {
    // First check for active leases
    const { data: leases, error: leaseError } = await supabase
      .from('leases')
      .select('id, status')
      .eq('tenant_id', tenantId)
      .eq('status', 'active');

    if (leaseError) throw leaseError;

    // If there are any active leases, prevent deletion
    if (leases && leases.length > 0) {
      throw new Error('Cannot delete tenant with active lease');
    }

    // Perform deletion
    const { error } = await supabase
      .from('tenants')
      .delete()
      .eq('id', tenantId);

    if (error) throw error;
    return true;
  }
};