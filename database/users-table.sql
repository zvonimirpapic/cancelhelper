-- ============================================================================
-- USERS TABLE CREATION SCRIPT FOR SUPABASE
-- ============================================================================
-- 
-- This script creates the users table for CancelHelper authentication system.
-- The table stores user account information including email credentials and 
-- timestamps for account creation tracking.
--
-- USAGE:
-- 1. Copy this SQL content
-- 2. Open Supabase Dashboard > SQL Editor
-- 3. Paste and run this script
--
-- TABLE STRUCTURE:
-- - id: Primary key using UUID with automatic generation
-- - email: Unique email address for user login (required)
-- - password_hash: Encrypted password storage (required)
-- - created_at: Account creation timestamp (auto-generated)
--
-- SECURITY NOTES:
-- - Passwords should be hashed before storage (never store plain text)
-- - Email uniqueness is enforced at database level
-- - Uses UUID for better security than sequential IDs
-- ============================================================================

CREATE TABLE users (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  password_hash text not null,
  plan text default 'free' check (plan in ('free', 'pro')),
  stripe_subscription_id text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- ============================================================================
-- END OF USERS TABLE CREATION SCRIPT
-- ============================================================================ 