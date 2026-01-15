# SendGrid Email Integration Guide

## Overview

This guide shows how to set up **SendGrid email notifications**. When an employee orders, the admin gets a beautiful HTML email with the order details!

## Step 1: Create SendGrid Account

1. Go to **https://sendgrid.com**
2. Click **Sign Up Free**
3. Fill in your details:
   - Name
   - Email
   - Password
4. Verify your email
5. You'll be on the SendGrid Dashboard

## Step 2: Get API Key

1. In your SendGrid Dashboard, click your **profile icon** (top right)
2. Select **Settings** → **API Keys**
3. Click **Create API Key**
4. Give it a name: "OfficeBar"
5. For permissions, select **Full Access** (or custom with "Mail Send" permission)
6. Click **Create**
7. **Copy the API Key** - you'll only see it once!
   - It looks like: `SG.abc123def456...`

**Save this safely!** Never share your API key.

## Step 3: Verify Sender Email

Before SendGrid will send emails FROM your address, you must verify it.

### Option A: Single Sender Verification (Easiest)

1. Go to **Settings** → **Sender Authentication**
2. Click **Verify a Single Sender**
3. Fill in:
   - **From Email**: Your email (e.g., `admin@yourcompany.com`)
   - **From Name**: "OfficeBar Admin"
   - **Reply To Email**: Your email
   - **Company Address**: Your office address
4. Click **Create**
5. SendGrid sends you a verification email
6. Click the link in that email to verify
7. Status changes to "Verified" ✅

### Option B: Domain Authentication (For Production)

1. Go to **Settings** → **Sender Authentication**
2. Click **Verify a Domain**
3. Enter your company domain (e.g., `yourcompany.com`)
4. Follow DNS setup instructions
5. Takes 5-10 minutes to verify

## Step 4: Update .env File

Open `.env` in your officeBar directory and add:

```env
# SendGrid Email Configuration
SENDGRID_API_KEY=SG.your_api_key_here_very_long_string
ADMIN_EMAIL=admin@yourcompany.com
```

**Example** (don't use these - use your real key):
```env
SENDGRID_API_KEY=SG.k8h7j6f5d4c3b2a1z0y9x8w7v6u5t4s3r2q1p0o9n8m7l6k5j
ADMIN_EMAIL=sarah.admin@techcorp.com
```

## Step 5: Restart Server

```bash
npm run dev
```

You should see:
```
📧 Email Notifications: ✅ Enabled
```

## Step 6: Test It!

1. Open http://localhost:3000
2. Create account and sign in
3. Add a drink to cart
4. Click "Order Now"
5. Check your admin email inbox! 📧

You should get an email like:

```
Subject: 🎉 New OfficeBar Order from John Doe

[Beautiful HTML email with:]
- Employee Name
- Drinks ordered
- Timestamp
- Professional formatting
```

## Email Template Preview

The email you receive looks like:

```
╔══════════════════════════════════════╗
║   🎉 New OfficeBar Order!            ║
║                                      ║
║   Employee: John Doe                 ║
║                                      ║
║   Order Details:                     ║
║   • 1x Espresso                      ║
║   • 2x Cappuccino                    ║
║                                      ║
║   ⏰ Time: 1/12/2024 10:30:45 AM    ║
╚══════════════════════════════════════╝
```

## Customizing Email Template

### Change Email Content

Edit `server/services/notifications.js` - look for `sendEmailNotification()`:

```javascript
async sendEmailNotification(orderSummary, employeeName) {
  const msg = {
    to: process.env.ADMIN_EMAIL,
    from: process.env.ADMIN_EMAIL,
    subject: `🎉 New OfficeBar Order from ${employeeName}`,
    html: `
      <!-- Your custom HTML here -->
      <h1>New Order!</h1>
      <p>${orderSummary}</p>
    `
  };
  
  await sgMail.send(msg);
}
```

### Change Email Styling

Modify the HTML in the `html:` field:

```javascript
html: `
  <div style="font-family: Arial; background: #f0f0f0; padding: 20px;">
    <h2 style="color: #667eea;">New Order from ${employeeName}</h2>
    <p style="color: #333;">${orderSummary}</p>
  </div>
`
```

### Use SendGrid Templates (Advanced)

For production, use SendGrid's template engine:

1. Create template in SendGrid Dashboard
2. Save template ID
3. Use in code:
```javascript
const msg = {
  to: process.env.ADMIN_EMAIL,
  from: process.env.ADMIN_EMAIL,
  templateId: 'd-123abc456def',
  dynamicTemplateData: {
    employeeName: employeeName,
    orderSummary: orderSummary
  }
};
```

## Troubleshooting

### Email Not Received

**Problem**: Sent order but no email

**Solutions**:
1. ✅ Did you verify your sender email? (Step 3 is REQUIRED)
2. ✅ Check `.env` has correct `SENDGRID_API_KEY`
3. ✅ Check `.env` has correct `ADMIN_EMAIL`
4. ✅ Check spam/junk folder in your email
5. ✅ Check SendGrid Activity Feed for bounces

### Find SendGrid Activity

1. Go to https://app.sendgrid.com
2. Click **Mail Settings** → **Event Webhook**
3. Or click **Monitor** to see email status
4. Look for failed messages and click them for details

### "Invalid API Key"

**Problem**: Error says API key is invalid

**Solutions**:
1. ✅ Copy the FULL API key from SendGrid (including `SG.` prefix)
2. ✅ No spaces before/after the key
3. ✅ Make sure you created a NEW API key (old ones might be revoked)
4. ✅ Restart server after updating `.env`

### Email Sent But No Bounce

**Problem**: SendGrid confirms sent, but you don't get email

**Solutions**:
1. ✅ Check spam/junk folder
2. ✅ Check email filters (rules that might delete)
3. ✅ Whitelist SendGrid domains in your email provider
4. ✅ Try adding domain authentication (Step 3, Option B)

### Sender Email Not Verified

**Problem**: "403 Forbidden - That's not an authorized SendGrid sender"

**Solution**: You MUST verify sender email:
1. Go to SendGrid → Settings → Sender Authentication
2. Click "Verify a Single Sender"
3. Use the same email as `ADMIN_EMAIL` in `.env`
4. Click verification link when you get the email

## Rate Limiting

SendGrid Free Tier:
- 100 emails/day limit
- Good for testing
- Upgrade to "Pro" for unlimited (around $30/month)

For small office:
- 10 orders/day = 300 emails/month
- **Free plan is enough!**

## SPF & DKIM (For Production)

For professional email delivery:

1. **SPF Record**: Tells servers "SendGrid can send from us"
2. **DKIM**: Digital signature on emails
3. Set up in SendGrid → Sender Authentication
4. Add DNS records to your domain

This ensures emails don't go to spam.

## Cost

**SendGrid Pricing**:
- Free: 100 emails/day, 30 days sender verification
- Pro: $30/month, unlimited emails
- Enterprise: Custom pricing

**For OfficeBar**: Free plan is perfect for most offices.

## Security Tips

1. **Never commit** `.env` to GitHub
2. **Rotate API keys** periodically
3. **Use environment variables** - never hardcode
4. **Monitor** who has access to API keys
5. **Regenerate keys** if you suspect compromise

## Testing Without Real Email

Want to test without sending real emails?

Temporarily comment out the email sending in `server/services/notifications.js`:

```javascript
async sendEmailNotification(orderSummary, employeeName) {
  // await sgMail.send(msg);  // <-- Comment this out
  console.log('Email would be sent to:', process.env.ADMIN_EMAIL);
  return { success: true };
}
```

## Next Steps

✅ **Done with Email?** Set up Twilio WhatsApp too!

See `TWILIO_SETUP.md` for WhatsApp alerts.

## Need Help?

- SendGrid Docs: https://docs.sendgrid.com/
- SendGrid Support: https://support.sendgrid.com/
- OfficeBar README: See main README.md

---

**Email alerts are now live! 📧**
