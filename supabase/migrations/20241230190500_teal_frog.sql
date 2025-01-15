/*
  # Fix Authentication and Organization Tables
  
  1. Updates
    - Fixes profile and organization creation
    - Adds missing policies
    - Ensures proper table relationships
  
  2. Changes
    - Recreates profiles table with proper structure
    - Updates organization policies
    - Adds proper triggers for user creation
*/

-- Recreate profiles table with proper structure
DROP TABLE IF EXISTS profiles CASCADE;
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profile policies
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
ON profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- Organization policies
CREATE POLICY "Users can view organizations they belong to"
ON organizations FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM user_organizations
    WHERE user_organizations.organization_id = id
    AND user_organizations.user_id = auth.uid()
  )
);

CREATE POLICY "Users can create organizations"
ON organizations FOR INSERT
WITH CHECK (true);

-- User organizations policies
CREATE POLICY "Users can view their organization memberships"
ON user_organizations FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Users can create organization memberships"
ON user_organizations FOR INSERT
WITH CHECK (user_id = auth.uid());

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER SECURITY DEFINER AS $$
DECLARE
  org_id uuid;
  org_name text;
BEGIN
  -- Create profile
  INSERT INTO profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  );

  -- Generate organization name from email domain
  org_name := INITCAP(split_part(split_part(NEW.email, '@', 2), '.', 1)) || ' Organization';

  -- Create organization
  INSERT INTO organizations (name)
  VALUES (org_name)
  RETURNING id INTO org_id;

  -- Create user_organization link
  INSERT INTO user_organizations (user_id, organization_id, role)
  VALUES (NEW.id, org_id, 'admin');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_organizations_user_id ON user_organizations(user_id);
CREATE INDEX IF NOT EXISTS idx_user_organizations_org_id ON user_organizations(organization_id);