-- ============================================================================
-- REMINDERS TABLE CREATION SCRIPT FOR SUPABASE
-- ============================================================================
-- 
-- This script creates the reminders table for CancelHelper trial tracking system.
-- The table stores user trial reminders including service details, trial end dates,
-- and reminder status tracking.
--
-- USAGE:
-- 1. Copy this SQL content
-- 2. Open Supabase Dashboard > SQL Editor
-- 3. Paste and run this script
--
-- TABLE STRUCTURE:
-- - id: Primary key using UUID with automatic generation
-- - email: User email (links to user account)
-- - service_name: Name of the service/subscription (e.g., "Netflix", "Spotify")
-- - trial_end_date: When the trial ends and billing starts
-- - cancel_url: Optional direct link to cancel the subscription
-- - reminder_sent: Boolean flag to track if reminder email was sent
-- - created_at: When the reminder was created (auto-generated)
--
-- FEATURES:
-- - Supports multiple reminders per user
-- - Tracks reminder delivery status
-- - Optional cancel URL for convenience
-- - Timestamps for audit trail
-- ============================================================================

CREATE TABLE reminders (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  service_name text not null,
  trial_end_date timestamp with time zone not null,
  cancel_url text,
  reminder_sent boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create index for efficient querying by email
CREATE INDEX idx_reminders_email ON reminders(email);

-- Create index for efficient querying by trial end date (for cron job)
CREATE INDEX idx_reminders_trial_date ON reminders(trial_end_date);

-- Create index for efficient querying of unsent reminders
CREATE INDEX idx_reminders_unsent ON reminders(reminder_sent, trial_end_date);

-- ============================================================================
-- END OF REMINDERS TABLE CREATION SCRIPT
-- ============================================================================ 