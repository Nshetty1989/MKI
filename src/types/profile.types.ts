export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  phone_number?: string;
  government_id?: {
    type: string;
    number: string;
  };
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
}