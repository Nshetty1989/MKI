/*
  # Ensure Organization Creation
  
  1. Updates
    - Modifies organization creation function
    - Adds automatic organization creation for new users
    - Ensures email-based organization naming
  
  2. Changes
    - Updates trigger function to handle organization creation
    - Adds safeguards for duplicate organizations
*/

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS ensure_user_organization();

-- Create function to ensure user has an organization
CREATE OR REPLACE FUNCTION ensure_user_organization()
RETURNS TRIGGER SECURITY DEFINER AS $$
DECLARE
  org_id uuid;
  org_name text;
  user_email text;
BEGIN
  -- Get user email
  user_email := NEW.email;
  
  -- Generate organization name from email domain
  org_name := INITCAP(SPLIT_PART(SPLIT_PART(user_email, '@', 2), '.', 1)) || ' Organization';

  -- Check if user already has an organization
  SELECT organization_id INTO org_id
  FROM user_organizations
  WHERE user_id = NEW.id
  LIMIT 1;

  -- If no organization exists, create one
  IF org_id IS NULL THEN
    -- Create organization
    INSERT INTO organizations (name)
    VALUES (org_name)
    RETURNING id INTO org_id;

    -- Create user_organization link
    INSERT INTO user_organizations (user_id, organization_id, role)
    VALUES (NEW.id, org_id, 'admin');
  END IF;

  -- Ensure profile exists
  INSERT INTO profiles (id, email, full_name)
  VALUES (
    NEW.id,
    user_email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', SPLIT_PART(user_email, '@', 1))
  )
  ON CONFLICT (id) DO UPDATE
  SET email = EXCLUDED.email,
      full_name = COALESCE(EXCLUDED.full_name, profiles.full_name);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create new trigger for organization creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION ensure_user_organization();

-- Add function to manually ensure organization exists
CREATE OR REPLACE FUNCTION manually_ensure_organization(user_id uuid)
RETURNS uuid AS $$
DECLARE
  org_id uuid;
  user_email text;
  org_name text;
BEGIN
  -- Get user email
  SELECT email INTO user_email
  FROM auth.users
  WHERE id = user_id;

  -- Check if organization already exists
  SELECT organization_id INTO org_id
  FROM user_organizations
  WHERE user_id = user_id
  LIMIT 1;

  -- If no organization exists, create one
  IF org_id IS NULL THEN
    -- Generate organization name
    org_name := INITCAP(SPLIT_PART(SPLIT_PART(user_email, '@', 2), '.', 1)) || ' Organization';
    
    -- Create organization
    INSERT INTO organizations (name)
    VALUES (org_name)
    RETURNING id INTO org_id;

    -- Create user_organization link
    INSERT INTO user_organizations (user_id, organization_id, role)
    VALUES (user_id, org_id, 'admin');
  END IF;

  RETURN org_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;