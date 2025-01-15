export interface Property {
  id: string;
  organization_id: string;
  name: string;
  type: string;
  status: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  total_units: number;
  description?: string;
  amenities: Record<string, any>;
  features: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}