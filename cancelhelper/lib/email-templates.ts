interface EmailTemplateProps {
  serviceName: string
  trialEndDate: string
  cancelUrl?: string
}

export function get24HourReminderTemplate({ serviceName, trialEndDate, cancelUrl }: EmailTemplateProps) {
  const formattedDate = new Date(trialEndDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  })

  const cancelButton = cancelUrl 
    ? `<a href="${cancelUrl}" style="display: inline-block; background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; margin: 20px 0;">Cancel ${serviceName} Now</a>`
    : ''

  return {
    subject: `⏰ ${serviceName} trial ends in 24 hours - Don't forget to cancel!`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Trial Reminder - ${serviceName}</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="color: #2563eb; margin: 0; font-size: 28px;">⏰ CancelHelper</h1>
            <p style="color: #6b7280; margin: 10px 0 0 0;">Your trial reminder service</p>
          </div>

          <!-- Alert Box -->
          <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
            <h2 style="color: #92400e; margin: 0 0 10px 0; font-size: 20px;">⚠️ Trial Ending Soon!</h2>
            <p style="color: #92400e; margin: 0; font-size: 16px;">Your <strong>${serviceName}</strong> trial will end in approximately 24 hours.</p>
          </div>

          <!-- Trial Details -->
          <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
            <h3 style="margin: 0 0 15px 0; color: #374151;">Trial Details:</h3>
            <ul style="margin: 0; padding-left: 20px; color: #6b7280;">
              <li style="margin-bottom: 8px;"><strong>Service:</strong> ${serviceName}</li>
              <li style="margin-bottom: 8px;"><strong>Trial Ends:</strong> ${formattedDate}</li>
              <li style="margin-bottom: 8px;"><strong>Time Remaining:</strong> ~24 hours</li>
              <li style="margin-bottom: 8px;"><strong>Important:</strong> Times shown in your system timezone</li>
            </ul>
          </div>

          <!-- Action Section -->
          <div style="text-align: center; margin-bottom: 30px;">
            <h3 style="color: #374151; margin-bottom: 15px;">What happens next?</h3>
            <p style="color: #6b7280; margin-bottom: 20px;">If you don't want to continue with ${serviceName}, make sure to cancel before your trial ends to avoid being charged.</p>
            
            ${cancelButton}
            
            ${!cancelUrl ? '<p style="color: #9ca3af; font-size: 14px; margin-top: 20px;">💡 <strong>Tip:</strong> Visit your ${serviceName} account settings to cancel your subscription.</p>' : ''}
          </div>

          <!-- Footer -->
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center;">
            <p style="color: #9ca3af; font-size: 14px; margin: 0;">
              This reminder was sent by <strong>CancelHelper</strong><br>
              You set this reminder to help you manage your trial subscriptions.
            </p>
            <p style="color: #9ca3af; font-size: 12px; margin: 10px 0 0 0;">
              Questions? Simply reply to this email.
            </p>
          </div>

        </body>
      </html>
    `,
    text: `
⏰ TRIAL REMINDER: ${serviceName}

Your ${serviceName} trial ends in approximately 24 hours.

Trial Details:
• Service: ${serviceName}
• Trial Ends: ${formattedDate}
• Time Remaining: ~24 hours
• Important: Times shown in your system timezone

What happens next?
If you don't want to continue with ${serviceName}, make sure to cancel before your trial ends to avoid being charged.

${cancelUrl ? `Cancel here: ${cancelUrl}` : `Visit your ${serviceName} account settings to cancel your subscription.`}

---
This reminder was sent by CancelHelper.
You set this reminder to help you manage your trial subscriptions.
    `
  }
}

export function getThankYouTemplate(email: string) {
  return {
    subject: `🎉 Welcome to CancelHelper Pro! You're all set`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to CancelHelper Pro</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="color: #2563eb; margin: 0; font-size: 28px;">🎉 CancelHelper Pro</h1>
            <p style="color: #6b7280; margin: 10px 0 0 0;">Thank you for upgrading!</p>
          </div>

          <!-- Success Message -->
          <div style="background-color: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; padding: 20px; margin-bottom: 30px; text-align: center;">
            <h2 style="color: #047857; margin: 0 0 10px 0; font-size: 24px;">✅ Payment Successful!</h2>
            <p style="color: #047857; margin: 0; font-size: 16px;">You're now a CancelHelper Pro member</p>
          </div>

          <!-- What's Next -->
          <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
            <h3 style="margin: 0 0 15px 0; color: #374151;">🚀 What you get with Pro:</h3>
            <ul style="margin: 0; padding-left: 20px; color: #6b7280;">
              <li style="margin-bottom: 8px;"><strong>Unlimited trial reminders</strong> - Track as many trials as you want</li>
              <li style="margin-bottom: 8px;"><strong>Priority email support</strong> - Get help when you need it</li>
              <li style="margin-bottom: 8px;"><strong>Advanced insights</strong> - See how much you're saving</li>
              <li style="margin-bottom: 8px;"><strong>Early access</strong> - Be first to try new features</li>
            </ul>
          </div>

          <!-- Billing Info -->
          <div style="background-color: #f0f9ff; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
            <h3 style="margin: 0 0 15px 0; color: #0369a1;">💳 Billing Information:</h3>
            <ul style="margin: 0; padding-left: 20px; color: #0369a1;">
              <li style="margin-bottom: 8px;"><strong>Plan:</strong> CancelHelper Pro</li>
              <li style="margin-bottom: 8px;"><strong>Price:</strong> $4.99/month</li>
              <li style="margin-bottom: 8px;"><strong>Billing:</strong> Monthly (auto-renewal)</li>
              <li style="margin-bottom: 8px;"><strong>Receipt:</strong> Stripe will email you a receipt</li>
            </ul>
          </div>

          <!-- CTA -->
          <div style="text-align: center; margin-bottom: 30px;">
            <h3 style="color: #374151; margin-bottom: 15px;">Ready to never forget a trial again?</h3>
            <a href="https://cancelhelper.app/dashboard" style="display: inline-block; background-color: #2563eb; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">Go to Dashboard</a>
          </div>

          <!-- Support -->
          <div style="background-color: #fef7ff; border-radius: 8px; padding: 20px; margin-bottom: 30px; text-align: center;">
            <h3 style="margin: 0 0 10px 0; color: #7c3aed;">💜 Need Help?</h3>
            <p style="color: #7c3aed; margin: 0 0 15px 0;">We're here to help you save money and reduce stress.</p>
            <p style="color: #7c3aed; margin: 0; font-size: 14px;">
              Email us: <a href="mailto:cancelhelper@gmail.com" style="color: #7c3aed; text-decoration: underline;">cancelhelper@gmail.com</a><br>
              We usually respond within a few hours!
            </p>
          </div>

          <!-- Footer -->
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center;">
            <p style="color: #9ca3af; font-size: 14px; margin: 0;">
              Thanks for trusting us to help you save money! 💰<br>
              <strong>CancelHelper Team</strong>
            </p>
            <p style="color: #9ca3af; font-size: 12px; margin: 10px 0 0 0;">
              Your subscription will auto-renew monthly. You can cancel anytime from your dashboard.
            </p>
          </div>

        </body>
      </html>
    `,
    text: `
🎉 Welcome to CancelHelper Pro!

✅ Payment Successful!
You're now a CancelHelper Pro member.

🚀 What you get with Pro:
• Unlimited trial reminders - Track as many trials as you want
• Priority email support - Get help when you need it  
• Advanced insights - See how much you're saving
• Early access - Be first to try new features

💳 Billing Information:
• Plan: CancelHelper Pro
• Price: $4.99/month
• Billing: Monthly (auto-renewal)
• Receipt: Stripe will email you a receipt

Ready to never forget a trial again?
Visit your dashboard: https://cancelhelper.app/dashboard

💜 Need Help?
We're here to help you save money and reduce stress.
Email us: cancelhelper@gmail.com
We usually respond within a few hours!

Thanks for trusting us to help you save money! 💰
- CancelHelper Team

Your subscription will auto-renew monthly. You can cancel anytime from your dashboard.
    `
  }
}

export function getReminderConfirmationTemplate({ serviceName, trialEndDate, customerEmail }: { serviceName: string, trialEndDate: string, customerEmail: string }) {
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
    subject: `🎯 ${serviceName} trial reminder is set - You're all covered!`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Trial Reminder Confirmed - ${serviceName}</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
          
          <!-- Email Container -->
          <div style="background-color: white; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); overflow: hidden;">
            
            <!-- Header with Gradient -->
            <div style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); padding: 30px 20px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">🎯 CancelHelper</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 16px;">Your money-saving companion</p>
            </div>

            <!-- Main Content -->
            <div style="padding: 40px 30px;">
              
              <!-- Success Message -->
              <div style="background: linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%); border: 2px solid #10b981; border-radius: 12px; padding: 25px; margin-bottom: 30px; text-align: center; position: relative;">
                <div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background-color: white; padding: 0 15px;">
                  <span style="font-size: 24px;">✅</span>
                </div>
                <h2 style="color: #047857; margin: 15px 0 10px 0; font-size: 24px; font-weight: 600;">Reminder Successfully Created!</h2>
                <p style="color: #059669; margin: 0; font-size: 16px; font-weight: 500;">We've got your back for <strong>${serviceName}</strong></p>
              </div>

              <!-- Trial Summary Card -->
              <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 1px solid #e2e8f0; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                <h3 style="margin: 0 0 20px 0; color: #1e293b; font-size: 18px; font-weight: 600; display: flex; align-items: center;">
                  <span style="margin-right: 10px;">📊</span>
                  Trial Summary
                </h3>
                <div style="display: grid; gap: 15px;">
                                     <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                     <span style="color: #64748b; font-weight: 500;">Service</span>
                     <span style="color: #1e293b; font-weight: 600;">${serviceName.trim()}</span>
                   </div>
                   <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                     <span style="color: #64748b; font-weight: 500;">Trial Ends</span>
                     <span style="color: #1e293b; font-weight: 600;">${formattedDate}</span>
                   </div>
                   <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                     <span style="color: #64748b; font-weight: 500;">Time Remaining</span>
                     <span style="color: #059669; font-weight: 700;">~${timeUntilDisplay}</span>
                   </div>
                   <div style="display: flex; justify-content: space-between; padding: 12px 0;">
                     <span style="color: #64748b; font-weight: 500;">Reminder</span>
                     <span style="color: #2563eb; font-weight: 600;">24 hours before trial ends</span>
                   </div>
                </div>
              </div>

              <!-- What's Next Section -->
              <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 1px solid #0ea5e9; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                <h3 style="margin: 0 0 20px 0; color: #0369a1; font-size: 18px; font-weight: 600; display: flex; align-items: center;">
                  <span style="margin-right: 10px;">⚡</span>
                  What Happens Next
                </h3>
                <div style="space-y: 12px;">
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
                      <p style="margin: 4px 0 0 0; color: #0284c7; font-size: 14px;">24 hours before your trial ends with cancellation tips</p>
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
              <div style="background: linear-gradient(135deg, #fef7ff 0%, #fdf4ff 100%); border: 1px solid #d946ef; border-radius: 12px; padding: 20px; margin-bottom: 30px; text-align: center;">
                <div style="font-size: 32px; margin-bottom: 10px;">💡</div>
                <h4 style="margin: 0 0 8px 0; color: #a21caf; font-size: 16px; font-weight: 600;">Pro Tip</h4>
                <p style="margin: 0; color: #c026d3; font-size: 14px;">Average CancelHelper user saves $127/month by avoiding unwanted subscriptions!</p>
              </div>

              <!-- CTA Button -->
              <div style="text-align: center; margin-bottom: 30px;">
                <a href="https://cancelhelper.app/dashboard" style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 14px 0 rgba(37, 99, 235, 0.3); transition: all 0.2s;">
                  📱 Manage Your Reminders
                </a>
                <p style="margin: 12px 0 0 0; color: #64748b; font-size: 13px;">View, edit, or add more trial reminders</p>
              </div>

            </div>

            <!-- Footer -->
            <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 25px 30px; text-align: center;">
              <div style="margin-bottom: 15px;">
                <h4 style="margin: 0 0 8px 0; color: #374151; font-size: 16px; font-weight: 600;">Questions? We're here to help!</h4>
                <p style="margin: 0; color: #6b7280; font-size: 14px;">
                  Email us at <a href="mailto:cancelhelper@gmail.com" style="color: #2563eb; text-decoration: none; font-weight: 600;">cancelhelper@gmail.com</a>
                </p>
              </div>
              <div style="border-top: 1px solid #e2e8f0; padding-top: 15px;">
                <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                  © 2024 CancelHelper • Helping you save money, one trial at a time 💰
                </p>
              </div>
            </div>

          </div>
        </body>
      </html>
    `,
    text: `
🎯 CANCELHELPER - Trial Reminder Confirmed

✅ SUCCESS: Your ${serviceName} trial reminder is set!

TRIAL SUMMARY:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Service: ${serviceName}
• Trial Ends: ${formattedDate}
• Time Remaining: ~${timeUntilDisplay}
• Reminder: 24 hours before trial ends
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT HAPPENS NEXT:
⚡ Step 1: Sit back and relax (no action needed)
⚡ Step 2: We'll send your reminder 24 hours before trial ends
⚡ Step 3: You decide and save money

💡 PRO TIP: Average CancelHelper user saves $127/month!

📱 MANAGE REMINDERS:
Visit your dashboard: https://cancelhelper.app/dashboard

❓ QUESTIONS? We're here to help!
Email: cancelhelper@gmail.com

© 2024 CancelHelper • Helping you save money, one trial at a time 💰
    `
  }
}

export function getCancellationTemplate(email: string) {
  return {
    subject: `✅ Subscription cancelled - Thanks for using CancelHelper Pro`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Subscription Cancelled - CancelHelper</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="color: #2563eb; margin: 0; font-size: 28px;">🔔 CancelHelper</h1>
            <p style="color: #6b7280; margin: 10px 0 0 0;">Subscription cancelled successfully</p>
          </div>

          <!-- Confirmation Message -->
          <div style="background-color: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px; padding: 20px; margin-bottom: 30px; text-align: center;">
            <h2 style="color: #0369a1; margin: 0 0 10px 0; font-size: 24px;">✅ Subscription Cancelled</h2>
            <p style="color: #0369a1; margin: 0; font-size: 16px;">You've been downgraded to the Free plan</p>
          </div>

          <!-- What Happens Next -->
          <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
            <h3 style="margin: 0 0 15px 0; color: #374151;">📋 What happens now:</h3>
            <ul style="margin: 0; padding-left: 20px; color: #6b7280;">
              <li style="margin-bottom: 8px;"><strong>No more monthly charges</strong> - Your billing has been cancelled</li>
              <li style="margin-bottom: 8px;"><strong>Free plan active</strong> - You can still track 1 trial reminder</li>
              <li style="margin-bottom: 8px;"><strong>Data preserved</strong> - Your existing reminders are still saved</li>
              <li style="margin-bottom: 8px;"><strong>Re-upgrade anytime</strong> - Welcome back whenever you're ready</li>
            </ul>
          </div>

          <!-- Free Plan Features -->
          <div style="background-color: #f0fdf4; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
            <h3 style="margin: 0 0 15px 0; color: #166534;">🆓 Your Free Plan includes:</h3>
            <ul style="margin: 0; padding-left: 20px; color: #166534;">
              <li style="margin-bottom: 8px;">Track up to 1 trial reminder</li>
              <li style="margin-bottom: 8px;">24-hour email reminders</li>
              <li style="margin-bottom: 8px;">Basic support via email</li>
            </ul>
          </div>

          <!-- Feedback -->
          <div style="background-color: #fef7ff; border-radius: 8px; padding: 20px; margin-bottom: 30px; text-align: center;">
            <h3 style="margin: 0 0 10px 0; color: #7c3aed;">💜 We'd love your feedback</h3>
            <p style="color: #7c3aed; margin: 0 0 15px 0;">Help us improve! What made you cancel?</p>
            <a href="mailto:cancelhelper@gmail.com?subject=Cancellation Feedback" style="color: #7c3aed; text-decoration: underline; font-weight: 500;">Share your feedback</a>
          </div>

          <!-- Re-upgrade CTA -->
          <div style="text-align: center; margin-bottom: 30px;">
            <h3 style="color: #374151; margin-bottom: 15px;">Changed your mind?</h3>
            <p style="color: #6b7280; margin-bottom: 20px;">You can upgrade back to Pro anytime to get unlimited reminders.</p>
            <a href="https://cancelhelper.app/pricing" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">Upgrade to Pro</a>
          </div>

          <!-- Footer -->
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center;">
            <p style="color: #9ca3af; font-size: 14px; margin: 0;">
              Thanks for giving CancelHelper Pro a try! 💙<br>
              <strong>CancelHelper Team</strong>
            </p>
            <p style="color: #9ca3af; font-size: 12px; margin: 10px 0 0 0;">
              Your account remains active on the Free plan. No further action needed.
            </p>
          </div>

        </body>
      </html>
    `,
    text: `
✅ Subscription Cancelled - CancelHelper

Your CancelHelper Pro subscription has been successfully cancelled and you've been downgraded to the Free plan.

📋 What happens now:
• No more monthly charges - Your billing has been cancelled
• Free plan active - You can still track 1 trial reminder  
• Data preserved - Your existing reminders are still saved
• Re-upgrade anytime - Welcome back whenever you're ready

🆓 Your Free Plan includes:
• Track up to 1 trial reminder
• 24-hour email reminders
• Basic support via email

💜 We'd love your feedback
Help us improve! What made you cancel?
Email us: cancelhelper@gmail.com

Changed your mind?
You can upgrade back to Pro anytime to get unlimited reminders.
Upgrade here: https://cancelhelper.app/pricing

Thanks for giving CancelHelper Pro a try! 💙
- CancelHelper Team

Your account remains active on the Free plan. No further action needed.
    `
  }
} 