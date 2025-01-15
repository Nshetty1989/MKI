-- Drop existing conflicting policies
DROP POLICY IF EXISTS "users_can_read_own_created_organizations" ON organizations;
DROP POLICY IF EXISTS "users_can_update_own_created_organizations" ON organizations;
DROP POLICY IF EXISTS "organization_read_access" ON organizations;
DROP POLICY IF EXISTS "organization_insert_access" ON organizations;

-- Create new comprehensive policies
CREATE POLICY "organizations_read_policy" ON organizations
FOR SELECT USING (
  created_by = auth.uid() OR 
  id IN (
    SELECT organization_id 
    FROM user_organizations 
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "organizations_insert_policy" ON organizations
FOR INSERT WITH CHECK (
  auth.role() = 'authenticated' AND 
  created_by = auth.uid()
);

CREATE POLICY "organizations_update_policy" ON organizations
FOR UPDATE USING (
  created_by = auth.uid()
) WITH CHECK (
  created_by = auth.uid()
);