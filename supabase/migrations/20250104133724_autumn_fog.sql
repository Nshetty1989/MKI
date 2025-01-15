-- Add created_by column to organizations table
ALTER TABLE organizations 
ADD COLUMN IF NOT EXISTS created_by uuid REFERENCES auth.users(id);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_organizations_created_by ON organizations(created_by);

-- Update RLS policies to include created_by checks
CREATE POLICY "users_can_read_own_created_organizations" ON organizations
FOR SELECT USING (
  created_by = auth.uid() OR
  id IN (
    SELECT organization_id 
    FROM user_organizations 
    WHERE created_by = auth.uid()
  )
);

CREATE POLICY "users_can_update_own_created_organizations" ON organizations
FOR UPDATE USING (
  created_by = auth.uid()
) WITH CHECK (
  created_by = auth.uid()
);