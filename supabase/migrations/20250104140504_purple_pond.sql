-- Drop foreign key constraints that reference public.users
ALTER TABLE user_organizations DROP CONSTRAINT IF EXISTS user_organizations_user_id_fkey;
ALTER TABLE tenants DROP CONSTRAINT IF EXISTS tenants_user_id_fkey;

-- Drop existing policies first
DROP POLICY IF EXISTS "users_can_read_own_organizations" ON organizations;
DROP POLICY IF EXISTS "users_can_read_own_memberships" ON user_organizations;
DROP POLICY IF EXISTS "users_can_manage_own_tenants" ON tenants;

-- Drop the public.users table
DROP TABLE IF EXISTS public.users;

-- Update foreign key constraints to reference auth.users
ALTER TABLE user_organizations
ADD CONSTRAINT user_organizations_user_id_fkey
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE tenants
ADD CONSTRAINT tenants_user_id_fkey
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL;

-- Create new policies
CREATE POLICY "organizations_access_policy" ON organizations
FOR SELECT USING (
  created_by = auth.uid() OR 
  id IN (
    SELECT organization_id 
    FROM user_organizations 
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "user_organizations_access_policy" ON user_organizations
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "tenants_access_policy" ON tenants
FOR ALL USING (
  organization_id IN (
    SELECT organization_id 
    FROM user_organizations 
    WHERE user_id = auth.uid()
  )
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_organizations_user_id ON user_organizations(user_id);
CREATE INDEX IF NOT EXISTS idx_tenants_user_id ON tenants(user_id);