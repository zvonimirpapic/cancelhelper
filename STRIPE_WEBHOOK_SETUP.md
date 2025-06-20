# 🔧 STRIPE WEBHOOK SETUP GUIDE
## Fix Subscription Cancellation Issue

**PROBLEM:** Currently, users can "cancel" in the app but still get charged by Stripe because the webhook isn't working.

**SOLUTION:** Follow these steps to set up webhooks properly.

---

## ⚡ QUICK SETUP (3 Steps)

### 1. **Deploy to Production**
Your app needs a public URL for webhooks to work. `localhost` won't work.

**Deploy to Vercel (recommended):**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy your app
vercel

# Get your production URL (e.g., https://your-app.vercel.app)
```

### 2. **Configure Environment Variables**

Copy from `temp_env.txt` and add your real values:

```env
# Copy this to your .env.local file
STRIPE_SECRET_KEY=sk_test_YOUR_REAL_KEY
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_REAL_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
RESEND_API_KEY=re_YOUR_RESEND_KEY
```

### 3. **Set Up Stripe Webhook**

**In Stripe Dashboard:**
1. Go to **Developers** > **Webhooks**
2. Click **"Add endpoint"**
3. **Endpoint URL:** `https://your-app.vercel.app/api/stripe-webhook`
4. **Events to send:**
   - `checkout.session.completed`
   - `customer.subscription.deleted`
5. Click **"Add endpoint"**
6. **Copy the webhook secret** (`whsec_...`) to your environment variables

---

## 🧪 TESTING

Test your webhook:
```bash
# Test endpoint works
curl -X POST https://your-app.vercel.app/api/webhook-test

# Should see logs in your terminal
```

---

## ✅ VERIFICATION

After setup, test the complete flow:

1. **Subscribe** → Check logs for: `✅ User subscription ID stored successfully`
2. **Cancel** → Check logs for: `✅ CANCELLING STRIPE: Successfully cancelled subscription`

**If you see these logs, subscription cancellation is working properly!**

---

## 🚨 CURRENT STATUS

- ❌ **Webhook NOT working** (no subscription IDs stored)
- ❌ **Cancellations don't affect Stripe** (users still charged)
- ✅ **Code is ready** (just needs webhook setup)

**After webhook setup:**
- ✅ **Subscription IDs will be stored**
- ✅ **Cancellations will work properly**
- ✅ **No more unwanted charges**

---

## 📞 SUPPORT

If you need help with webhook setup, email: cancelhelper@gmail.com 