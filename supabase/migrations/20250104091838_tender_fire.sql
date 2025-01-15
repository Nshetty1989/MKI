-- Update profiles table structure
ALTER TABLE profiles
DROP COLUMN IF EXISTS government_id,
DROP COLUMN IF EXISTS address;

-- Re-add columns with proper structure
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone_number text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS government_id jsonb DEFAULT jsonb_build_object(
  'type', '',
  'number', ''
);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS address jsonb DEFAULT jsonb_build_object(
  'street', '',
  'city', '',
  'state', '',
  'zipCode', '',
  'country', ''
);

-- Add proper indexes
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- Update RLS policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
ON profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- Function to handle profile updates
CREATE OR REPLACE FUNCTION handle_profile_update()
RETURNS TRIGGER AS $$
BEGIN
  -- Update organization name if full name changes
  IF NEW.full_name IS DISTINCT FROM OLD.full_name THEN
    UPDATE organizations org
    SET name = NEW.full_name || '''s Organization'
    FROM user_organizations uo
    WHERE uo.organization_id = org.id
    AND uo.user_id = NEW.id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for profile updates
DROP TRIGGER IF EXISTS on_profile_update ON profiles;
CREATE TRIGGER on_profile_update
  AFTER UPDATE ON profiles
  FOR EACH ROW
  WHEN (OLD.full_name IS DISTINCT FROM NEW.full_name)
  EXECUTE FUNCTION handle_profile_update();

-- Update organization policies
DROP POLICY IF EXISTS "organization_read_access" ON organizations;
DROP POLICY IF EXISTS "organization_insert_access" ON organizations;

CREATE POLICY "organization_read_access"
ON organizations FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM user_organizations
    WHERE user_organizations.organization_id = id
    AND user_organizations.user_id = auth.uid()
  )
);

CREATE POLICY "organization_insert_access"
ON organizations FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Update user_organizations policies
DROP POLICY IF EXISTS "user_organizations_read_access" ON user_organizations;
DROP POLICY IF EXISTS "user_organizations_insert_access" ON user_organizations;

CREATE POLICY "user_organizations_read_access"
ON user_organizations FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "user_organizations_insert_access"
ON user_organizations FOR INSERT
WITH CHECK (user_id = auth.uid());