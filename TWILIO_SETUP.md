# Twilio WhatsApp Integration Guide

## Overview

This guide shows how to set up **Twilio WhatsApp notifications** for OfficeBar. When an employee places an order, the admin receives an instant WhatsApp message!

## Step 1: Create Twilio Account

1. Go to **https://www.twilio.com**
2. Click "Sign Up" in the top right
3. Fill in your details:
   - Email
   - Password
   - Phone number (for verification)
4. Verify your email and phone
5. You'll be on the Twilio Dashboard

## Step 2: Get Your Account Credentials

1. On your Twilio Dashboard, look for the blue box at the top
2. You'll see:
   - **Account SID**: Starts with `AC...` (24 characters)
   - **Auth Token**: Looks like a long random string
3. Copy both - you'll need them in `.env`

**Save these safely!** Never share your Auth Token.

## Step 3: Set Up WhatsApp Business Account

1. In your Twilio Dashboard, go to **Messaging** → **WhatsApp**
2. Click **Get Started**
3. You'll see a dialog to set up WhatsApp
4. Follow Twilio's wizard:
   - Accept terms
   - Verify your identity
   - Add business info
5. This creates your **Twilio WhatsApp Business Account**

## Step 4: Get Your WhatsApp Phone Numbers

### Get Twilio's WhatsApp Number

1. After setting up, Twilio provides you a **WhatsApp number**
2. It looks like: `+1 (XXX) XXX-XXXX`
3. This is your **TWILIO_PHONE_NUMBER** - format it as: `whatsapp:+15551234567` (no spaces/dashes)

### Get Admin's WhatsApp Number

1. Use **your personal WhatsApp number** or admin's number
2. Make sure it includes country code: `+1` for US, `+44` for UK, etc.
3. This is your **ADMIN_WHATSAPP_NUMBER** - format as: `whatsapp:+15559876543`

## Step 5: Send Test Message (REQUIRED!)

Before Twilio will send messages TO your number, you must send one FROM your number first.

1. Go to **Twilio Console** → **Messaging** → **Try it out** → **Send a message**
2. Send a message from your admin WhatsApp to Twilio:
   - **From**: Your admin WhatsApp number
   - **To**: Twilio's WhatsApp number
   - **Message**: Any message (e.g., "Hello")
3. You'll get a response from Twilio

**This is crucial!** Without this, Twilio won't send alerts TO your number.

## Step 6: Update .env File

Open `.env` in your officeBar directory and add:

```env
# Twilio WhatsApp Configuration
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here_super_long_string
TWILIO_PHONE_NUMBER=whatsapp:+15551234567
ADMIN_WHATSAPP_NUMBER=whatsapp:+15559876543
```

**Example** (don't use these real numbers):
```env
TWILIO_ACCOUNT_SID=ACe8e1a2b3c4d5f6g7h8i9j0k1l2m3n4o
TWILIO_AUTH_TOKEN=sktLj8Hd7fJo2MnQwErTyUiOpLkJhGfDsAwQ1xZcVbNmQwErTy
TWILIO_PHONE_NUMBER=whatsapp:+15551234567
ADMIN_WHATSAPP_NUMBER=whatsapp:+19876543210
```

## Step 7: Restart Server

```bash
npm run dev
```

You should see:
```
📱 WhatsApp Notifications: ✅ Enabled
```

## Step 8: Test It!

1. Open http://localhost:3000
2. Create account and sign in
3. Add a drink to cart
4. Click "Order Now"
5. Check your admin WhatsApp! 🎉

You should get a message like:
```
🎉 New Order Alert!

New Order from John Doe:
1x Espresso

Time: 1/12/2024, 10:30:45 AM
```

## Troubleshooting

### Message Not Received

**Problem**: Sent order but no WhatsApp message

**Solutions**:
1. ✅ Did you send the test message first? (Step 5 is REQUIRED)
2. ✅ Check `.env` has all correct credentials
3. ✅ Verify phone numbers have correct format: `whatsapp:+1234567890`
4. ✅ Check Twilio Console → Monitor → Logs for errors
5. ✅ Make sure Auth Token hasn't expired (console shows when to refresh)

### Wrong Phone Number Format

**Problem**: "Invalid phone number"

**Solution**: Use format `whatsapp:+1234567890`
- Must start with `whatsapp:`
- Must have `+` followed by country code
- No parentheses or dashes
- Example: `whatsapp:+15551234567` ✅
- Wrong: `whatsapp:(555) 123-4567` ❌

### No Credentials Showing

**Problem**: Can't find Account SID and Auth Token

**Solution**:
1. Go to https://www.twilio.com/console
2. Log in
3. Look at the top of the page - there's a blue box
4. It shows `Account SID` and `Auth Token`
5. Click the eye icon to reveal Auth Token

### Still Getting Errors?

**Check Twilio Console**:
1. Go to https://www.twilio.com/console
2. Click **Monitor** → **Logs** → **Message Logs**
3. Find your failed message
4. Click it to see exact error
5. Use that error message to debug

## Rate Limiting

Twilio has rate limits:
- Trial accounts: Limited messages
- Paid accounts: Higher limits
- Upgrade your account for production use

## Security Tips

1. **Never commit** `.env` to GitHub
2. **Change Auth Token** if you suspect compromise
3. **Use environment variables** - never hardcode secrets
4. **Rotate credentials** periodically in production
5. **Monitor logs** for suspicious activity

## Cost

**Twilio Pricing**:
- Free trial: $15 credits (usually enough for testing)
- Pay-as-you-go: ~$0.0075 per message after credits
- Bulk discounts available

For a small office with 10 orders/day:
- Cost: ~$2-3/month (with paid account)

## Advanced: Webhook Responses

You can make OfficeBar even smarter by handling WhatsApp replies!

Edit `server/services/notifications.js`:

```javascript
// Handle admin replies
app.post('/api/notifications/whatsapp-webhook', (req, res) => {
  const message = req.body.Body;
  const from = req.body.From;
  
  // Process admin command
  // e.g., "READY #ORD-123" marks order as ready
  
  res.send('OK');
});
```

## Next Steps

✅ **Done with WhatsApp?** Set up SendGrid Email notifications too!

See `SENDGRID_SETUP.md` for email alerts.

## Need Help?

- Twilio Docs: https://www.twilio.com/docs/whatsapp
- Twilio Support: https://support.twilio.com/
- OfficeBar README: See main README.md

---

**WhatsApp alerts are now live! 🚀**
