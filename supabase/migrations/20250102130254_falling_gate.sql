-- Fix RLS policies for organizations
DROP POLICY IF EXISTS "organization_insert_access" ON organizations;
DROP POLICY IF EXISTS "organization_read_access" ON organizations;

-- Allow any authenticated user to create organizations
CREATE POLICY "organization_insert_access"
ON organizations FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Allow users to read organizations they belong to
CREATE POLICY "organization_read_access"
ON organizations FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM user_organizations
    WHERE user_organizations.organization_id = id
    AND user_organizations.user_id = auth.uid()
  )
);

-- Fix profiles table structure
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS phone_number text,
ADD COLUMN IF NOT EXISTS government_id jsonb DEFAULT '{"type": "", "number": ""}',
ADD COLUMN IF NOT EXISTS address jsonb DEFAULT '{"street": "", "city": "", "state": "", "zipCode": "", "country": ""}';

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_organizations_user_id ON user_organizations(user_id);
CREATE INDEX IF NOT EXISTS idx_user_organizations_org_id ON user_organizations(organization_id);