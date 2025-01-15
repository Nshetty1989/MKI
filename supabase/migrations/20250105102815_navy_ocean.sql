/*
  # Add Description to Properties Table

  1. Changes
    - Add description column to properties table
    - Update RLS policies to include new column
    - Add index for better performance

  2. Security
    - Maintain existing RLS policies
*/

-- Add description column to properties table
ALTER TABLE properties
ADD COLUMN IF NOT EXISTS description text;

-- Create index for description column
CREATE INDEX IF NOT EXISTS idx_properties_description ON properties(description);

-- Ensure RLS policies are up to date
DROP POLICY IF EXISTS "properties_read_access" ON properties;
DROP POLICY IF EXISTS "properties_insert_access" ON properties;
DROP POLICY IF EXISTS "properties_update_access" ON properties;

-- Recreate policies with description column
CREATE POLICY "properties_read_access" ON properties
FOR SELECT USING (
  organization_id IN (
    SELECT organization_id FROM user_organizations
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "properties_insert_access" ON properties
FOR INSERT WITH CHECK (
  organization_id IN (
    SELECT organization_id FROM user_organizations
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "properties_update_access" ON properties
FOR UPDATE USING (
  organization_id IN (
    SELECT organization_id FROM user_organizations
    WHERE user_id = auth.uid()
  )
) WITH CHECK (
  organization_id IN (
    SELECT organization_id FROM user_organizations
    WHERE user_id = auth.uid()
  )
);