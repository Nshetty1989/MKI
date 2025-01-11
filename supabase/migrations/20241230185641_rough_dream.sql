/*
  # Comprehensive Database Policies

  1. Security Policies
    - Adds RLS policies for all tables
    - Implements proper access control
    - Ensures data isolation between organizations

  2. Tables Covered
    - Properties
    - Units
    - Tenants
    - Leases
    - Maintenance
    - Financial records
*/

-- Properties Policies
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

-- Units Policies
CREATE POLICY "units_read_access" ON units
FOR SELECT USING (
  property_id IN (
    SELECT id FROM properties
    WHERE organization_id IN (
      SELECT organization_id FROM user_organizations
      WHERE user_id = auth.uid()
    )
  )
);

CREATE POLICY "units_insert_access" ON units
FOR INSERT WITH CHECK (
  property_id IN (
    SELECT id FROM properties
    WHERE organization_id IN (
      SELECT organization_id FROM user_organizations
      WHERE user_id = auth.uid()
    )
  )
);

CREATE POLICY "units_update_access" ON units
FOR UPDATE USING (
  property_id IN (
    SELECT id FROM properties
    WHERE organization_id IN (
      SELECT organization_id FROM user_organizations
      WHERE user_id = auth.uid()
    )
  )
);

-- Tenants Policies
CREATE POLICY "tenants_read_access" ON tenants
FOR SELECT USING (
  organization_id IN (
    SELECT organization_id FROM user_organizations
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "tenants_insert_access" ON tenants
FOR INSERT WITH CHECK (
  organization_id IN (
    SELECT organization_id FROM user_organizations
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "tenants_update_access" ON tenants
FOR UPDATE USING (
  organization_id IN (
    SELECT organization_id FROM user_organizations
    WHERE user_id = auth.uid()
  )
);

-- Leases Policies
CREATE POLICY "leases_read_access" ON leases
FOR SELECT USING (
  unit_id IN (
    SELECT id FROM units
    WHERE property_id IN (
      SELECT id FROM properties
      WHERE organization_id IN (
        SELECT organization_id FROM user_organizations
        WHERE user_id = auth.uid()
      )
    )
  )
);

CREATE POLICY "leases_insert_access" ON leases
FOR INSERT WITH CHECK (
  unit_id IN (
    SELECT id FROM units
    WHERE property_id IN (
      SELECT id FROM properties
      WHERE organization_id IN (
        SELECT organization_id FROM user_organizations
        WHERE user_id = auth.uid()
      )
    )
  )
);

-- Maintenance Requests Policies
CREATE POLICY "maintenance_requests_read_access" ON maintenance_requests
FOR SELECT USING (
  property_id IN (
    SELECT id FROM properties
    WHERE organization_id IN (
      SELECT organization_id FROM user_organizations
      WHERE user_id = auth.uid()
    )
  )
);

CREATE POLICY "maintenance_requests_insert_access" ON maintenance_requests
FOR INSERT WITH CHECK (
  property_id IN (
    SELECT id FROM properties
    WHERE organization_id IN (
      SELECT organization_id FROM user_organizations
      WHERE user_id = auth.uid()
    )
  )
);

-- Transactions Policies
CREATE POLICY "transactions_read_access" ON transactions
FOR SELECT USING (
  organization_id IN (
    SELECT organization_id FROM user_organizations
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "transactions_insert_access" ON transactions
FOR INSERT WITH CHECK (
  organization_id IN (
    SELECT organization_id FROM user_organizations
    WHERE user_id = auth.uid()
  )
);

-- Invoices Policies
CREATE POLICY "invoices_read_access" ON invoices
FOR SELECT USING (
  transaction_id IN (
    SELECT id FROM transactions
    WHERE organization_id IN (
      SELECT organization_id FROM user_organizations
      WHERE user_id = auth.uid()
    )
  )
);

CREATE POLICY "invoices_insert_access" ON invoices
FOR INSERT WITH CHECK (
  transaction_id IN (
    SELECT id FROM transactions
    WHERE organization_id IN (
      SELECT organization_id FROM user_organizations
      WHERE user_id = auth.uid()
    )
  )
);

-- Payments Policies
CREATE POLICY "payments_read_access" ON payments
FOR SELECT USING (
  invoice_id IN (
    SELECT id FROM invoices
    WHERE transaction_id IN (
      SELECT id FROM transactions
      WHERE organization_id IN (
        SELECT organization_id FROM user_organizations
        WHERE user_id = auth.uid()
      )
    )
  )
);

CREATE POLICY "payments_insert_access" ON payments
FOR INSERT WITH CHECK (
  invoice_id IN (
    SELECT id FROM invoices
    WHERE transaction_id IN (
      SELECT id FROM transactions
      WHERE organization_id IN (
        SELECT organization_id FROM user_organizations
        WHERE user_id = auth.uid()
      )
    )
  )
);

-- Property Images Policies
CREATE POLICY "property_images_read_access" ON property_images
FOR SELECT USING (
  property_id IN (
    SELECT id FROM properties
    WHERE organization_id IN (
      SELECT organization_id FROM user_organizations
      WHERE user_id = auth.uid()
    )
  )
);

CREATE POLICY "property_images_insert_access" ON property_images
FOR INSERT WITH CHECK (
  property_id IN (
    SELECT id FROM properties
    WHERE organization_id IN (
      SELECT organization_id FROM user_organizations
      WHERE user_id = auth.uid()
    )
  )
);

-- Property Documents Policies
CREATE POLICY "property_documents_read_access" ON property_documents
FOR SELECT USING (
  property_id IN (
    SELECT id FROM properties
    WHERE organization_id IN (
      SELECT organization_id FROM user_organizations
      WHERE user_id = auth.uid()
    )
  )
);

CREATE POLICY "property_documents_insert_access" ON property_documents
FOR INSERT WITH CHECK (
  property_id IN (
    SELECT id FROM properties
    WHERE organization_id IN (
      SELECT organization_id FROM user_organizations
      WHERE user_id = auth.uid()
    )
  )
);