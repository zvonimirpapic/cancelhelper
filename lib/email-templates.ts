interface EmailTemplateProps {
  serviceName: string
  trialEndDate: string
  cancelUrl?: string
}

export function get24HourReminderTemplate({ serviceName, trialEndDate }: EmailTemplateProps) {
  const formattedDate = new Date(trialEndDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  })

  return {
    subject: `Trial Reminder: Your ${serviceName} subscription begins in 24 hours`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Trial Reminder - ${serviceName}</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
          
          <!-- Header -->
          <div style="background-color: #2563eb; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">CancelHelper</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 16px;">Trial Reminder Service</p>
          </div>

          <!-- Main Content -->
          <div style="background-color: white; padding: 40px 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            
            <!-- Alert Box -->
            <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
              <h2 style="color: #92400e; margin: 0 0 10px 0; font-size: 20px; font-weight: 600;">Important Reminder</h2>
              <p style="color: #92400e; margin: 0; font-size: 16px;">Your <strong>${serviceName}</strong> trial will end in approximately 24 hours.</p>
            </div>

            <!-- Trial Details -->
            <div style="background-color: #f9fafb; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
              <h3 style="margin: 0 0 20px 0; color: #374151; font-size: 18px; font-weight: 600;">Trial Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Service:</td>
                  <td style="padding: 8px 0; color: #374151; font-weight: 600;">${serviceName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Trial Ends:</td>
                  <td style="padding: 8px 0; color: #374151; font-weight: 600;">${formattedDate}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Time Remaining:</td>
                  <td style="padding: 8px 0; color: #dc2626; font-weight: 600;">Approximately 24 hours</td>
                </tr>
              </table>
            </div>

            <!-- Action Section -->
            <div style="text-align: center; margin-bottom: 30px;">
              <h3 style="color: #374151; margin-bottom: 15px; font-size: 18px; font-weight: 600;">Next Steps</h3>
              <p style="color: #6b7280; margin-bottom: 20px; line-height: 1.6;">If you wish to avoid being charged for ${serviceName}, please cancel your subscription before the trial period ends.</p>
              
              <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <p style="color: #374151; margin: 0; font-weight: 600;">To cancel your ${serviceName} subscription:</p>
                <p style="color: #6b7280; margin: 8px 0 0 0; font-size: 14px;">Visit your ${serviceName} account settings to manage your subscription</p>
              </div>
            </div>

            <!-- Footer -->
            <div style="border-top: 1px solid #e5e7eb; padding-top: 25px; text-align: center;">
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 8px 0;">
                This reminder was sent by <strong>CancelHelper</strong>
              </p>
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                You requested this reminder to help manage your trial subscriptions.<br>
                Questions? Reply to this email for support.
              </p>
            </div>

          </div>
        </body>
      </html>
    `,
    text: `
TRIAL REMINDER: ${serviceName}

Your ${serviceName} trial ends in approximately 24 hours.

TRIAL DETAILS:
• Service: ${serviceName}
• Trial Ends: ${formattedDate}
• Time Remaining: ~24 hours

NEXT STEPS:
If you wish to avoid being charged for ${serviceName}, please cancel your subscription before the trial period ends.

To cancel your ${serviceName} subscription:
Visit your ${serviceName} account settings to manage your subscription.

---
This reminder was sent by CancelHelper.
You requested this reminder to help manage your trial subscriptions.
Questions? Reply to this email for support.
    `
  }
}

export function getThankYouTemplate() {
  return {
    subject: `Welcome to CancelHelper Pro - Payment Confirmed`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to CancelHelper Pro</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
          
          <!-- Header -->
          <div style="background-color: #2563eb; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">CancelHelper Pro</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 16px;">Thank you for upgrading</p>
          </div>

          <!-- Main Content -->
          <div style="background-color: white; padding: 40px 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">

            <!-- Success Message -->
            <div style="background-color: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; padding: 25px; margin-bottom: 30px; text-align: center;">
              <h2 style="color: #047857; margin: 0 0 10px 0; font-size: 24px; font-weight: 600;">Payment Successful</h2>
              <p style="color: #047857; margin: 0; font-size: 16px;">You are now a CancelHelper Pro member</p>
            </div>

            <!-- Pro Features -->
            <div style="background-color: #f9fafb; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
              <h3 style="margin: 0 0 20px 0; color: #374151; font-size: 18px; font-weight: 600;">Your Pro Benefits</h3>
              <ul style="margin: 0; padding-left: 0; list-style: none;">
                <li style="margin-bottom: 12px; padding-left: 20px; position: relative; color: #6b7280;">
                  <span style="position: absolute; left: 0; color: #10b981; font-weight: bold;">✓</span>
                  <strong>Unlimited trial reminders</strong> - Track as many trials as you want
                </li>
                <li style="margin-bottom: 12px; padding-left: 20px; position: relative; color: #6b7280;">
                  <span style="position: absolute; left: 0; color: #10b981; font-weight: bold;">✓</span>
                  <strong>Priority email support</strong> - Get help when you need it
                </li>
                <li style="margin-bottom: 12px; padding-left: 20px; position: relative; color: #6b7280;">
                  <span style="position: absolute; left: 0; color: #10b981; font-weight: bold;">✓</span>
                  <strong>Advanced insights</strong> - See how much you're saving
                </li>
                <li style="margin-bottom: 12px; padding-left: 20px; position: relative; color: #6b7280;">
                  <span style="position: absolute; left: 0; color: #10b981; font-weight: bold;">✓</span>
                  <strong>Early access</strong> - Be first to try new features
                </li>
              </ul>
            </div>

            <!-- Billing Information -->
            <div style="background-color: #f0f9ff; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
              <h3 style="margin: 0 0 20px 0; color: #0369a1; font-size: 18px; font-weight: 600;">Billing Information</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #0284c7; font-weight: 500;">Plan:</td>
                  <td style="padding: 8px 0; color: #0369a1; font-weight: 600;">CancelHelper Pro</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #0284c7; font-weight: 500;">Price:</td>
                  <td style="padding: 8px 0; color: #0369a1; font-weight: 600;">$4.99/month</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #0284c7; font-weight: 500;">Billing:</td>
                  <td style="padding: 8px 0; color: #0369a1; font-weight: 600;">Monthly (auto-renewal)</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #0284c7; font-weight: 500;">Receipt:</td>
                  <td style="padding: 8px 0; color: #0369a1; font-weight: 600;">Stripe will email you separately</td>
                </tr>
              </table>
            </div>

            <!-- Getting Started -->
            <div style="text-align: center; margin-bottom: 30px;">
              <h3 style="color: #374151; margin-bottom: 15px; font-size: 18px; font-weight: 600;">Ready to get started?</h3>
              <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <p style="color: #374151; margin: 0; font-weight: 600;">Visit cancelhelper.app/dashboard</p>
                <p style="color: #6b7280; margin: 8px 0 0 0; font-size: 14px;">to access your Pro features and manage reminders</p>
              </div>
            </div>

            <!-- Support -->
            <div style="background-color: #fef7ff; border-radius: 8px; padding: 25px; margin-bottom: 30px; text-align: center;">
              <h3 style="margin: 0 0 10px 0; color: #7c3aed; font-size: 16px; font-weight: 600;">Need Help?</h3>
              <p style="color: #7c3aed; margin: 0 0 15px 0;">We're here to help you save money and reduce stress.</p>
              <p style="color: #7c3aed; margin: 0; font-size: 14px;">
                Email us: cancelhelper@gmail.com<br>
                We typically respond within a few hours
              </p>
            </div>

            <!-- Footer -->
            <div style="border-top: 1px solid #e5e7eb; padding-top: 25px; text-align: center;">
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 8px 0;">
                Thanks for trusting us to help you save money<br>
                <strong>The CancelHelper Team</strong>
              </p>
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                Your subscription will auto-renew monthly. You can cancel anytime from your dashboard.
              </p>
            </div>

          </div>
        </body>
      </html>
    `,
    text: `
Welcome to CancelHelper Pro!

PAYMENT SUCCESSFUL
You are now a CancelHelper Pro member.

YOUR PRO BENEFITS:
✓ Unlimited trial reminders - Track as many trials as you want
✓ Priority email support - Get help when you need it  
✓ Advanced insights - See how much you're saving
✓ Early access - Be first to try new features

BILLING INFORMATION:
• Plan: CancelHelper Pro
• Price: $4.99/month
• Billing: Monthly (auto-renewal)
• Receipt: Stripe will email you separately

Ready to get started?
Visit cancelhelper.app/dashboard to access your Pro features and manage reminders

NEED HELP?
We're here to help you save money and reduce stress.
Email us: cancelhelper@gmail.com
We typically respond within a few hours

Thanks for trusting us to help you save money
- The CancelHelper Team

Your subscription will auto-renew monthly. You can cancel anytime from your dashboard.
    `
  }
}

export function getReminderConfirmationTemplate({ serviceName, trialEndDate }: { serviceName: string, trialEndDate: string }) {
  const trialDate = new Date(trialEndDate)
  const now = new Date()
  const hoursUntilTrial = Math.round((trialDate.getTime() - now.getTime()) / (1000 * 60 * 60))
  
  // Format time until trial in a user-friendly way
  const timeUntilDisplay = hoursUntilTrial > 48 
    ? `${Math.round(hoursUntilTrial / 24)} days`
    : `${hoursUntilTrial} hours`
  
  const formattedDate = trialDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  })

  return {
    subject: `Reminder confirmed for ${serviceName} trial`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Trial Reminder Confirmed - ${serviceName}</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
          
          <!-- Header -->
          <div style="background-color: #2563eb; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">CancelHelper</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 16px;">Your money-saving companion</p>
          </div>

          <!-- Main Content -->
          <div style="background-color: white; padding: 40px 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            
            <!-- Success Message -->
            <div style="background-color: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; padding: 25px; margin-bottom: 30px; text-align: center;">
              <h2 style="color: #047857; margin: 0 0 10px 0; font-size: 24px; font-weight: 600;">Reminder Successfully Created</h2>
              <p style="color: #047857; margin: 0; font-size: 16px;">We've got your back for <strong>${serviceName}</strong></p>
            </div>

            <!-- Trial Summary -->
            <div style="background-color: #f9fafb; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
              <h3 style="margin: 0 0 20px 0; color: #374151; font-size: 18px; font-weight: 600;">Trial Summary</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #6b7280; font-weight: 500;">Service</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #374151; font-weight: 600;">${serviceName}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #6b7280; font-weight: 500;">Trial Ends</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #374151; font-weight: 600;">${formattedDate}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #6b7280; font-weight: 500;">Time Remaining</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #059669; font-weight: 700;">~${timeUntilDisplay}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #6b7280; font-weight: 500;">Reminder</td>
                  <td style="padding: 12px 0; color: #2563eb; font-weight: 600;">24 hours before trial ends</td>
                </tr>
              </table>
            </div>

            <!-- What's Next -->
            <div style="background-color: #f0f9ff; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
              <h3 style="margin: 0 0 20px 0; color: #0369a1; font-size: 18px; font-weight: 600;">What Happens Next</h3>
              <div style="space-y: 15px;">
                <div style="display: flex; align-items: start; margin-bottom: 15px;">
                  <div style="background-color: #0ea5e9; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 12px; flex-shrink: 0;">1</div>
                  <div>
                    <p style="margin: 0; color: #0369a1; font-weight: 600;">Sit back and relax</p>
                    <p style="margin: 4px 0 0 0; color: #0284c7; font-size: 14px;">No action needed from you right now</p>
                  </div>
                </div>
                <div style="display: flex; align-items: start; margin-bottom: 15px;">
                  <div style="background-color: #0ea5e9; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 12px; flex-shrink: 0;">2</div>
                  <div>
                    <p style="margin: 0; color: #0369a1; font-weight: 600;">We'll send your reminder</p>
                    <p style="margin: 4px 0 0 0; color: #0284c7; font-size: 14px;">24 hours before your trial ends with helpful information</p>
                  </div>
                </div>
                <div style="display: flex; align-items: start;">
                  <div style="background-color: #10b981; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 12px; flex-shrink: 0;">3</div>
                  <div>
                    <p style="margin: 0; color: #0369a1; font-weight: 600;">You decide and save money</p>
                    <p style="margin: 4px 0 0 0; color: #0284c7; font-size: 14px;">Cancel or continue - the choice is yours</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Money Saving Tip -->
            <div style="background-color: #fef7ff; border: 1px solid #d946ef; border-radius: 8px; padding: 20px; margin-bottom: 30px; text-align: center;">
              <h4 style="margin: 0 0 8px 0; color: #a21caf; font-size: 16px; font-weight: 600;">Pro Tip</h4>
              <p style="margin: 0; color: #c026d3; font-size: 14px;">Average CancelHelper user saves $127/month by avoiding unwanted subscriptions</p>
            </div>

            <!-- Dashboard Access -->
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <p style="color: #374151; margin: 0; font-weight: 600;">Manage Your Reminders</p>
                <p style="color: #6b7280; margin: 8px 0 0 0; font-size: 14px;">Visit cancelhelper.app/dashboard to view, edit, or add more trial reminders</p>
              </div>
            </div>

            <!-- Footer -->
            <div style="border-top: 1px solid #e2e8f0; padding-top: 25px; text-align: center;">
              <div style="margin-bottom: 15px;">
                <h4 style="margin: 0 0 8px 0; color: #374151; font-size: 16px; font-weight: 600;">Questions? We're here to help</h4>
                <p style="margin: 0; color: #6b7280; font-size: 14px;">
                  Email us at cancelhelper@gmail.com
                </p>
              </div>
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                © 2024 CancelHelper • Helping you save money, one trial at a time
              </p>
            </div>

          </div>
        </body>
      </html>
    `,
    text: `
CANCELHELPER - Trial Reminder Confirmed

REMINDER SUCCESSFULLY CREATED
We've got your back for ${serviceName}

TRIAL SUMMARY:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Service: ${serviceName}
• Trial Ends: ${formattedDate}
• Time Remaining: ~${timeUntilDisplay}
• Reminder: 24 hours before trial ends
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT HAPPENS NEXT:
1. Sit back and relax (no action needed)
2. We'll send your reminder 24 hours before trial ends
3. You decide and save money

PRO TIP: Average CancelHelper user saves $127/month!

MANAGE REMINDERS:
Visit cancelhelper.app/dashboard to view, edit, or add more trial reminders

QUESTIONS? We're here to help
Email: cancelhelper@gmail.com

© 2024 CancelHelper • Helping you save money, one trial at a time
    `
  }
}

export function getCancellationTemplate() {
  return {
    subject: `Subscription cancelled - Thank you for using CancelHelper Pro`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Subscription Cancelled - CancelHelper</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
          
          <!-- Header -->
          <div style="background-color: #2563eb; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">CancelHelper</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 16px;">Subscription cancelled successfully</p>
          </div>

          <!-- Main Content -->
          <div style="background-color: white; padding: 40px 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">

            <!-- Confirmation Message -->
            <div style="background-color: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px; padding: 25px; margin-bottom: 30px; text-align: center;">
              <h2 style="color: #0369a1; margin: 0 0 10px 0; font-size: 24px; font-weight: 600;">Subscription Cancelled</h2>
              <p style="color: #0369a1; margin: 0; font-size: 16px;">You've been moved to the Free plan</p>
            </div>

            <!-- What Happens Now -->
            <div style="background-color: #f9fafb; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
              <h3 style="margin: 0 0 20px 0; color: #374151; font-size: 18px; font-weight: 600;">What happens now</h3>
              <ul style="margin: 0; padding-left: 0; list-style: none;">
                <li style="margin-bottom: 12px; padding-left: 20px; position: relative; color: #6b7280;">
                  <span style="position: absolute; left: 0; color: #10b981; font-weight: bold;">✓</span>
                  <strong>No more monthly charges</strong> - Your billing has been cancelled
                </li>
                <li style="margin-bottom: 12px; padding-left: 20px; position: relative; color: #6b7280;">
                  <span style="position: absolute; left: 0; color: #10b981; font-weight: bold;">✓</span>
                  <strong>Free plan active</strong> - You can still track 1 trial reminder
                </li>
                <li style="margin-bottom: 12px; padding-left: 20px; position: relative; color: #6b7280;">
                  <span style="position: absolute; left: 0; color: #10b981; font-weight: bold;">✓</span>
                  <strong>Data preserved</strong> - Your existing reminders are still saved
                </li>
                <li style="margin-bottom: 12px; padding-left: 20px; position: relative; color: #6b7280;">
                  <span style="position: absolute; left: 0; color: #10b981; font-weight: bold;">✓</span>
                  <strong>Re-upgrade anytime</strong> - Welcome back whenever you're ready
                </li>
              </ul>
            </div>

            <!-- Free Plan Features -->
            <div style="background-color: #f0fdf4; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
              <h3 style="margin: 0 0 20px 0; color: #166534; font-size: 18px; font-weight: 600;">Your Free Plan includes</h3>
              <ul style="margin: 0; padding-left: 0; list-style: none;">
                <li style="margin-bottom: 8px; padding-left: 20px; position: relative; color: #166534;">
                  <span style="position: absolute; left: 0; color: #059669; font-weight: bold;">•</span>
                  Track up to 1 trial reminder
                </li>
                <li style="margin-bottom: 8px; padding-left: 20px; position: relative; color: #166534;">
                  <span style="position: absolute; left: 0; color: #059669; font-weight: bold;">•</span>
                  24-hour email reminders
                </li>
                <li style="margin-bottom: 8px; padding-left: 20px; position: relative; color: #166534;">
                  <span style="position: absolute; left: 0; color: #059669; font-weight: bold;">•</span>
                  Basic support via email
                </li>
              </ul>
            </div>

            <!-- Feedback -->
            <div style="background-color: #fef7ff; border-radius: 8px; padding: 25px; margin-bottom: 30px; text-align: center;">
              <h3 style="margin: 0 0 10px 0; color: #7c3aed; font-size: 16px; font-weight: 600;">We'd love your feedback</h3>
              <p style="color: #7c3aed; margin: 0 0 15px 0;">Help us improve - what made you cancel?</p>
              <p style="color: #7c3aed; margin: 0; font-size: 14px;">Email us at cancelhelper@gmail.com with subject "Cancellation Feedback"</p>
            </div>

            <!-- Re-upgrade CTA -->
            <div style="text-align: center; margin-bottom: 30px;">
              <h3 style="color: #374151; margin-bottom: 15px; font-size: 18px; font-weight: 600;">Changed your mind?</h3>
              <p style="color: #6b7280; margin-bottom: 20px;">You can upgrade back to Pro anytime to get unlimited reminders.</p>
              <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <p style="color: #374151; margin: 0; font-weight: 600;">Upgrade to Pro</p>
                <p style="color: #6b7280; margin: 8px 0 0 0; font-size: 14px;">Visit cancelhelper.app/pricing</p>
              </div>
            </div>

            <!-- Footer -->
            <div style="border-top: 1px solid #e5e7eb; padding-top: 25px; text-align: center;">
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 8px 0;">
                Thank you for using CancelHelper Pro<br>
                <strong>The CancelHelper Team</strong>
              </p>
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                Questions? Email us at cancelhelper@gmail.com
              </p>
            </div>

          </div>
        </body>
      </html>
    `,
    text: `
CancelHelper - Subscription Cancelled

SUBSCRIPTION CANCELLED
You've been moved to the Free plan.

WHAT HAPPENS NOW:
✓ No more monthly charges - Your billing has been cancelled
✓ Free plan active - You can still track 1 trial reminder
✓ Data preserved - Your existing reminders are still saved
✓ Re-upgrade anytime - Welcome back whenever you're ready

YOUR FREE PLAN INCLUDES:
• Track up to 1 trial reminder
• 24-hour email reminders
• Basic support via email

WE'D LOVE YOUR FEEDBACK
Help us improve - what made you cancel?
Email us at cancelhelper@gmail.com with subject "Cancellation Feedback"

CHANGED YOUR MIND?
You can upgrade back to Pro anytime to get unlimited reminders.
Visit cancelhelper.app/pricing

Thank you for using CancelHelper Pro
- The CancelHelper Team

Questions? Email us at cancelhelper@gmail.com
    `
  }
} 