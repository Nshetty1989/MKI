export interface Tenant {
  id: string;
  organization_id: string;
  user_id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  status: string;
  background_check_status?: string;
  credit_score?: number;
  emergency_contact?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}