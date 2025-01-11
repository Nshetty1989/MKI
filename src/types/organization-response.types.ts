import type { Organization } from './organization.types';
import type { Profile } from './profile.types';

export interface OrganizationWithMembers extends Organization {
  members?: {
    profiles: Profile;
    role: string;
  }[];
}

export interface UserOrganizationResponse {
  organizations: Organization;
  user_id: string;
  organization_id: string;
  role: string;
  created_at?: string;
}