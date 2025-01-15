import { supabase } from '@/integrations/supabase/client';
import type { Lease } from '@/types/lease.types';

export const leaseService = {
  createLease: async (leaseData: Omit<Lease, 'id'>) => {
    const { data, error } = await supabase
      .from('leases')
      .insert(leaseData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  getLeases: async (unitId?: string, tenantId?: string) => {
    let query = supabase.from('leases').select('*');
    
    if (unitId) query = query.eq('unit_id', unitId);
    if (tenantId) query = query.eq('tenant_id', tenantId);
    
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  updateLease: async (leaseId: string, updates: Partial<Lease>) => {
    const { data, error } = await supabase
      .from('leases')
      .update(updates)
      .eq('id', leaseId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};