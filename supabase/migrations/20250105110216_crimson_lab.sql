/*
  # Update Tenants Table Schema

  1. Changes
    - Remove credit_score column
    - Add permanent_address column
    - Add aadhar_id column

  2. Security
    - Maintain existing RLS policies
    - No changes to other tables
*/

-- Remove credit_score column
ALTER TABLE tenants 
DROP COLUMN IF EXISTS credit_score;

-- Add new columns
ALTER TABLE tenants
ADD COLUMN IF NOT EXISTS permanent_address jsonb DEFAULT jsonb_build_object(
  'street', '',
  'city', '',
  'state', '',
  'zipCode', '',
  'country', ''
),
ADD COLUMN IF NOT EXISTS aadhar_id text;

-- Create index for new columns
CREATE INDEX IF NOT EXISTS idx_tenants_aadhar_id ON tenants(aadhar_id);

-- Ensure RLS policies are maintained
DROP POLICY IF EXISTS "tenants_access_policy" ON tenants;

CREATE POLICY "tenants_access_policy" ON tenants
FOR ALL USING (
  organization_id IN (
    SELECT organization_id 
    FROM user_organizations 
    WHERE user_id = auth.uid()
  )
);