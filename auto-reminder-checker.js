// Auto reminder checker for development
// This simulates the Vercel cron job behavior locally

const https = require('https');
const http = require('http');

const CHECK_INTERVAL = 2 * 60 * 1000; // Check every 2 minutes
const API_URL = 'http://localhost:3000/api/auto-check-reminders';

console.log('🚀 AUTO REMINDER CHECKER STARTED');
console.log(`⏰ Will check for reminders every ${CHECK_INTERVAL / 1000} seconds`);
console.log(`🌐 Checking endpoint: ${API_URL}`);
console.log('📧 This will automatically send 24-hour reminder emails when trials are due');
console.log('---');

function checkReminders() {
  const now = new Date().toISOString();
  console.log(`\n🔍 [${now}] Checking for reminders to send...`);
  
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/auto-check-reminders',
    method: 'GET',
    headers: {
      'User-Agent': 'CancelHelper-Auto-Checker/1.0'
    }
  };

  const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        
        if (response.success) {
          if (response.sent > 0) {
            console.log(`✅ SUCCESS: Sent ${response.sent} reminder email(s)!`);
            response.results?.forEach(result => {
              if (result.status === 'sent') {
                console.log(`   📧 → ${result.email} (${result.service}) - ${result.hoursUntilTrial}h until trial`);
              }
            });
          } else {
            console.log('✅ No reminders to send at this time');
          }
        } else {
          console.log('❌ ERROR:', response.error);
        }
      } catch (error) {
        console.log('❌ Parse error:', error.message);
      }
    });
  });

  req.on('error', (error) => {
    console.log('❌ Request error:', error.message);
    console.log('   Make sure your Next.js server is running on localhost:3000');
  });

  req.setTimeout(10000, () => {
    console.log('❌ Request timeout - server might be slow or not running');
    req.destroy();
  });

  req.end();
}

// Initial check
setTimeout(() => {
  checkReminders();
}, 3000); // Wait 3 seconds for server to be ready

// Set up recurring checks
setInterval(checkReminders, CHECK_INTERVAL);

// Keep the script running
process.on('SIGINT', () => {
  console.log('\n🛑 AUTO REMINDER CHECKER STOPPED');
  process.exit(0);
});

console.log('Press Ctrl+C to stop the auto reminder checker'); 