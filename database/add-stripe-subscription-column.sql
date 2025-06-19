-- ============================================================================
-- ADD STRIPE SUBSCRIPTION ID COLUMN - DATABASE MIGRATION
-- ============================================================================
-- 
-- This script adds the stripe_subscription_id column to the existing users table
-- to enable proper Stripe subscription cancellation.
--
-- CRITICAL: This fixes the billing issue where users could "cancel" in the app
-- but still get charged by Stripe because the actual subscription wasn't cancelled.
--
-- USAGE:
-- 1. Copy this SQL content
-- 2. Open Supabase Dashboard > SQL Editor
-- 3. Paste and run this script
--
-- WHAT THIS DOES:
-- - Adds stripe_subscription_id column to store Stripe subscription IDs
-- - Allows NULL values (existing users won't have subscription IDs)
-- - Enables proper subscription cancellation when users downgrade
-- ============================================================================

ALTER TABLE users 
ADD COLUMN stripe_subscription_id text;

-- ============================================================================
-- VERIFICATION QUERY (run this after the above to confirm it worked)
-- ============================================================================

-- SELECT column_name, data_type, is_nullable 
-- FROM information_schema.columns 
-- WHERE table_name = 'users' 
-- AND column_name = 'stripe_subscription_id';

-- ============================================================================
-- END OF MIGRATION SCRIPT
-- ============================================================================ 