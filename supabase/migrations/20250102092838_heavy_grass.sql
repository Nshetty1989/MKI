-- Drop and recreate profiles table with proper structure
DROP TABLE IF EXISTS profiles CASCADE;

CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  phone_number text,
  government_id jsonb,
  address jsonb,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
ON profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- Fix organizations policies
DROP POLICY IF EXISTS "organization_insert_access" ON organizations;
CREATE POLICY "organization_insert_access"
ON organizations FOR INSERT
WITH CHECK (true);

DROP POLICY IF EXISTS "organization_read_access" ON organizations;
CREATE POLICY "organization_read_access"
ON organizations FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM user_organizations
    WHERE user_organizations.organization_id = organizations.id
    AND user_organizations.user_id = auth.uid()
  )
);