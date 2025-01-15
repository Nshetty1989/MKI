export interface Organization {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserOrganization {
  user_id: string;
  organization_id: string;
  role: string;
  created_at?: string;
  organizations?: Organization;
}