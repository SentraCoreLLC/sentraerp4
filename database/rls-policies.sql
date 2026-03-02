-- Row Level Security Policies for Tables in Sentra ERP

-- Enable Row Level Security on all required tables
ALTER TABLE admin ENABLE ROW LEVEL SECURITY;
ALTER TABLE finance ENABLE ROW LEVEL SECURITY;
ALTER TABLE operations ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policies for admin role
CREATE POLICY admin_access ON admin
FOR ALL
USING (current_setting('jwt.claims.role') = 'admin');

-- Policies for finance role
CREATE POLICY finance_access ON finance
FOR ALL
USING (current_setting('jwt.claims.role') = 'finance');

-- Policies for operations role
CREATE POLICY operations_access ON operations
FOR ALL
USING (current_setting('jwt.claims.role') = 'operations');

-- Policies for compliance role
CREATE POLICY compliance_access ON compliance
FOR ALL
USING (current_setting('jwt.claims.role') = 'compliance');

-- Policies for user role
CREATE POLICY user_access ON users
FOR ALL
USING (current_setting('jwt.claims.claims.role') = 'user');

-- Optionally, you can add more specific access controls based on
-- specific table fields, conditions, and more granular policy definitions
