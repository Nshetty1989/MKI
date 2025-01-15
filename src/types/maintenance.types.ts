export interface MaintenanceRequest {
  id: string;
  property_id: string;
  unit_id?: string;
  tenant_id?: string;
  category: string;
  priority: string;
  status: string;
  description: string;
  images?: string[];
  created_at?: string;
  updated_at?: string;
}