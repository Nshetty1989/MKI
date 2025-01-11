-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view their own organizations" ON organizations;
DROP POLICY IF EXISTS "Users can create organizations" ON organizations;
DROP POLICY IF EXISTS "Users can view their own organization memberships" ON user_organizations;
DROP POLICY IF EXISTS "Users can create organization memberships" ON user_organizations;

-- Recreate organization policies with improved rules
CREATE POLICY "organization_read_access"
ON organizations FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM user_organizations
    WHERE user_organizations.organization_id = organizations.id
    AND user_organizations.user_id = auth.uid()
  )
);

CREATE POLICY "organization_insert_access"
ON organizations FOR INSERT
WITH CHECK (true);

-- Recreate user_organizations policies
CREATE POLICY "user_organizations_read_access"
ON user_organizations FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "user_organizations_insert_access"
ON user_organizations FOR INSERT
WITH CHECK (user_id = auth.uid());

-- Update organization creation function
CREATE OR REPLACE FUNCTION create_default_organization()
RETURNS TRIGGER SECURITY DEFINER AS $$
DECLARE
  org_id uuid;
BEGIN
  -- Create profile first
  INSERT INTO profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email))
  ON CONFLICT (id) DO NOTHING;

  -- Create organization
  INSERT INTO organizations (name)
  VALUES ('Default Organization')
  RETURNING id INTO org_id;

  -- Create user_organization link
  INSERT INTO user_organizations (user_id, organization_id, role)
  VALUES (NEW.id, org_id, 'admin');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;