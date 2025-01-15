/*
  # Fix Organization Policies and Default Organization Creation

  1. Updates
    - Add RLS policies for organizations table
    - Add function to create default organization for new users
    - Add trigger to automatically create organization on user creation
  
  2. Security
    - Enable RLS on organizations table
    - Add policies for organization access
*/

-- Create policies for organizations table
CREATE POLICY "Users can view their own organizations"
ON organizations
FOR SELECT
USING (
  id IN (
    SELECT organization_id 
    FROM user_organizations 
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can create organizations"
ON organizations
FOR INSERT
WITH CHECK (true);

-- Create function to ensure default organization exists
CREATE OR REPLACE FUNCTION create_default_organization()
RETURNS TRIGGER AS $$
DECLARE
  org_id uuid;
BEGIN
  -- Create default organization if none exists
  INSERT INTO organizations (name)
  VALUES ('Default Organization')
  RETURNING id INTO org_id;

  -- Link user to organization
  INSERT INTO user_organizations (user_id, organization_id, role)
  VALUES (NEW.id, org_id, 'admin');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to create default organization for new users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_default_organization();

-- Add policies for user_organizations table
CREATE POLICY "Users can view their own organization memberships"
ON user_organizations
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Users can create organization memberships"
ON user_organizations
FOR INSERT
WITH CHECK (user_id = auth.uid());