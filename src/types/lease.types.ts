export interface Lease {
  id: string;
  unit_id: string;
  tenant_id: string;
  start_date: string;
  end_date: string;
  rent_amount: number;
  deposit_amount: number;
  status: string;
  terms: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}