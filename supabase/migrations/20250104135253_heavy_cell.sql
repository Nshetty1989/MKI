-- Create function to handle organization creation
CREATE OR REPLACE FUNCTION handle_organization_creation()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert corresponding user_organizations entry
  INSERT INTO user_organizations (
    user_id,
    organization_id,
    role,
    created_at
  ) VALUES (
    NEW.created_by,
    NEW.id,
    'admin',
    NEW.created_at
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for organization creation
DROP TRIGGER IF EXISTS on_organization_created ON organizations;
CREATE TRIGGER on_organization_created
  AFTER INSERT ON organizations
  FOR EACH ROW
  EXECUTE FUNCTION handle_organization_creation();

-- Add policy for user_organizations automatic creation
CREATE POLICY "allow_trigger_user_org_creation" ON user_organizations
FOR INSERT WITH CHECK (
  auth.uid() = user_id OR 
  EXISTS (
    SELECT 1 FROM organizations 
    WHERE id = organization_id 
    AND created_by = auth.uid()
  )
);