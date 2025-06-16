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
    minute: '2-digit'
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

What happens next?
If you don't want to continue with ${serviceName}, make sure to cancel before your trial ends to avoid being charged.

${cancelUrl ? `Cancel here: ${cancelUrl}` : `Visit your ${serviceName} account settings to cancel your subscription.`}

---
This reminder was sent by CancelHelper.
You set this reminder to help you manage your trial subscriptions.
    `
  }
} 