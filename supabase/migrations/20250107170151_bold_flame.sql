-- Create enum type for background check status
DO $$ BEGIN
    CREATE TYPE background_check_status_type AS ENUM ('pending', 'failed', 'passed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Add unique constraint to properties.name
ALTER TABLE properties 
ADD CONSTRAINT properties_name_unique UNIQUE (name, organization_id);

-- Update tenants table
ALTER TABLE tenants
  ALTER COLUMN background_check_status TYPE background_check_status_type 
    USING (CASE 
      WHEN background_check_status = 'pending' THEN 'pending'::background_check_status_type
      WHEN background_check_status = 'failed' THEN 'failed'::background_check_status_type
      WHEN background_check_status = 'passed' THEN 'passed'::background_check_status_type
      ELSE 'pending'::background_check_status_type
    END),
  ALTER COLUMN background_check_status SET DEFAULT 'pending'::background_check_status_type;

-- Add property_name with proper reference
ALTER TABLE tenants
ADD COLUMN IF NOT EXISTS property_name text,
ADD CONSTRAINT tenants_property_name_fkey 
  FOREIGN KEY (property_name, organization_id) 
  REFERENCES properties(name, organization_id) 
  ON DELETE SET NULL;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_tenants_background_check_status 
  ON tenants(background_check_status);
CREATE INDEX IF NOT EXISTS idx_tenants_property_name 
  ON tenants(property_name);

-- Add constraint to ensure valid status transitions
CREATE OR REPLACE FUNCTION validate_background_check_status()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.background_check_status = 'failed' AND NEW.background_check_status = 'passed' THEN
    RAISE EXCEPTION 'Cannot change status from failed to passed directly';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_background_check_status
  BEFORE UPDATE ON tenants
  FOR EACH ROW
  EXECUTE FUNCTION validate_background_check_status();