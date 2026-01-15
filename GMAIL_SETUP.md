# Gmail SMTP Setup Guide - OfficeBar Email Notifications

## Overview

**Gmail** is the simplest free email solution. Use your own Gmail account to send order notifications!

Setup time: **5 minutes**
Cost: **FREE**
Perfect for: **Simple email alerts, professional emails, archiving**

---

## Why Gmail?

✅ **Free** - No SendGrid or Twilio costs
✅ **Simple** - Use your existing Gmail account
✅ **Reliable** - Gmail infrastructure
✅ **Professional** - HTML-formatted emails
✅ **No config** - Works out of the box
✅ **Archive** - All emails saved in Gmail

---

## Step 1: Enable 2-Factor Authentication

Gmail requires 2FA for app passwords. Don't worry, it's quick!

### 1a. Go to Google Account Settings
1. Open https://myaccount.google.com
2. Click **"Security"** (left sidebar)
3. Look for **"2-Step Verification"**
4. Click **"Get Started"**

### 1b. Verify Your Identity
1. Choose verification method (phone number recommended)
2. Enter your phone number
3. Verify the code Google sends
4. You're done! 2FA is enabled

---

## Step 2: Create App Password

App passwords are special passwords for third-party apps.

### 2a. Go to App Passwords
1. Go back to https://myaccount.google.com
2. Click **"Security"** again
3. Scroll down to **"App passwords"**
4. You might need to log in again
5. Select:
   - **App**: Mail
   - **Device**: Windows/Mac/Linux
6. Click **"Generate"**

### 2b. Copy Password
Google shows you a **16-character password**:
```
abcd efgh ijkl mnop
```

**Copy this exactly** - it's your `GMAIL_PASSWORD`
(Remove spaces: `abcdefghijklmnop`)

---

## Step 3: Update .env File

Edit `.env` in your officeBar directory:

```env
GMAIL_USER=your_gmail_address@gmail.com
GMAIL_PASSWORD=abcdefghijklmnop
ADMIN_EMAIL=your_email@gmail.com
```

**Important:**
- `GMAIL_USER` = Your Gmail address
- `GMAIL_PASSWORD` = The 16-character app password (no spaces)
- `ADMIN_EMAIL` = Where to send notifications (can be same as GMAIL_USER)

**Example:**
```env
GMAIL_USER=sarah.admin@gmail.com
GMAIL_PASSWORD=abcdefghijklmnop
ADMIN_EMAIL=sarah.admin@gmail.com
```

---

## Step 4: Test It!

### 4a. Restart Server
```bash
npm run dev
```

You should see:
```
📧 Gmail Notifications: ✅ Enabled
```

### 4b. Place an Order
1. Open http://localhost:3000
2. Sign up
3. Add a drink to cart
4. Click "Order Now"

### 4c. Check Email
Look at your inbox - you should see a beautiful order notification! 📧

Example:
```
Subject: 🎉 New OfficeBar Order from John Doe

[Beautiful HTML email with order details, formatting, colors]
```

---

## Email Features

The emails include:
- ✅ Professional HTML formatting
- ✅ Gradient header with colors
- ✅ Employee name highlighted
- ✅ Drink items listed clearly
- ✅ Timestamp of order
- ✅ Responsive design (looks good on mobile)

---

## Troubleshooting

### Email Not Received

**Problem**: Placed order but no email

**Solutions** (in order):
1. ✅ Check email is correct in .env
2. ✅ Check Gmail address is correct
3. ✅ Verify app password is correct (16 characters, no spaces)
4. ✅ Check spam/junk folder
5. ✅ Restart server after .env changes
6. ✅ Check server logs for errors

### "Invalid Credentials"

**Problem**: Gmail rejects password

**Solutions**:
1. ✅ Verify 2-Factor Authentication is enabled (Step 1)
2. ✅ Regenerate app password (it expires sometimes)
3. ✅ Copy app password exactly (including spaces in initial generation)
4. ✅ Remove spaces from final password
5. ✅ Try without spaces: `abcdefghijklmnop` not `abcd efgh ijkl mnop`

### "Less Secure App Access"

**Problem**: "Please log in with your app password"

**Solution**:
- You're using wrong password type
- Must use **App Password** not regular Gmail password
- Follow Step 2 exactly to create app password

### Email Goes to Spam

**Problem**: Email arrives in spam folder

**Solutions**:
1. ✅ Whitelist sender email
2. ✅ Use custom domain (see below)
3. ✅ Add reply-to address
4. ✅ Try Discord or Telegram instead

### "SMTP Connection Timeout"

**Problem**: Can't connect to Gmail

**Solutions**:
1. ✅ Check internet connection
2. ✅ Check Gmail username/password
3. ✅ Verify 2FA is enabled
4. ✅ Wait a moment and try again
5. ✅ Restart server

### Still Not Working?

**Debug steps:**
1. Check server logs (terminal output)
2. Look for error messages
3. Note the exact error
4. Verify .env values
5. Try restarting everything

**Manual test:**
```javascript
// In Node.js terminal
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_app_password'
  }
});
transporter.verify((error, success) => {
  if (error) console.log(error);
  else console.log('Connected!');
});
```

---

## Customization

### Change Email Address

Send to different email:
```env
ADMIN_EMAIL=team@yourcompany.com
```

Email will be sent to this address instead.

### Change Email Subject

Edit `server/services/notifications.js`:

```javascript
subject: `🎉 New OfficeBar Order from ${employeeName}`,
// Change to:
subject: `New Order: ${employeeName}`,
```

### Change Email Content

Edit the HTML template in `server/services/notifications.js`:

```javascript
html: `
  <div style="...">
    <!-- Customize this HTML -->
    <h2>Your custom header</h2>
    <p>${orderSummary}</p>
  </div>
`
```

### Use Custom Domain (Advanced)

For professional emails, use your own domain:

1. Go to Gmail Settings (gear icon)
2. Click "Accounts and Import"
3. Click "Send mail as"
4. Follow instructions to add your domain
5. Update `GMAIL_USER` to your domain email
6. Verify domain ownership (Gmail will guide you)

---

## Multiple Recipients

Want to email multiple people?

**Option 1: Use Gmail Groups**
1. In Gmail, create a group
2. Add team members
3. Use group email as `ADMIN_EMAIL`

**Option 2: Modify Code**
Edit `server/services/notifications.js`:

```javascript
const mailOptions = {
  to: 'admin1@company.com, admin2@company.com, admin3@company.com',
  // ... rest of email
};
```

---

## Archive & History

All emails are saved in Gmail:
1. Open https://mail.google.com
2. Click **"All Mail"** to see every order notification
3. Search by date, employee name, etc.
4. Perfect for auditing and history

---

## Tips & Tricks

### Tip 1: Gmail Filters
Create filters to organize order emails:
1. Open Gmail
2. Click settings gear → "Create a filter"
3. From: noreply@yourofficeapp
4. Apply label: "OfficeBar Orders"
5. Archive automatically

### Tip 2: Desktop Notifications
Enable Gmail notifications:
1. Settings → Desktop notifications
2. Get popup alerts for new orders

### Tip 3: Email Templates
Create custom email templates (requires editing HTML in notifications.js)

### Tip 4: Unsubscribe Link (optional)
Add unsubscribe link to emails for compliance:
```html
<a href="#">Unsubscribe</a>
```

### Tip 5: Reply Tracking
Add reply-to address:
```javascript
replyTo: 'noreply@company.com'
```

---

## Sending Limits

Gmail has rate limits:
- **Free accounts**: ~500 emails/day
- **Workspace accounts**: ~2,000 emails/day

For OfficeBar with 10 orders/day, you're fine with free Gmail!

---

## Cost Comparison

| Method | Cost | Setup | Speed | Email Quality |
|--------|------|-------|-------|--------------|
| **Gmail** | FREE | 5 min | ⚡⚡⚡ | ⭐⭐⭐⭐ |
| SendGrid | $30/mo | 15 min | ⚡⚡⚡⚡ | ⭐⭐⭐⭐⭐ |
| Mailgun | $35/mo | 15 min | ⚡⚡⚡⚡ | ⭐⭐⭐⭐⭐ |
| Telegram | FREE | 5 min | ⚡⚡⚡⚡⚡ | ⭐⭐⭐ |
| Discord | FREE | 5 min | ⚡⚡⚡⚡⚡ | ⭐⭐⭐⭐ |

---

## Perfect For

✅ **Small offices** - Simple email
✅ **Backup** - Alternative to other services
✅ **Archive** - Keep email history
✅ **Professional** - Formatted HTML emails
✅ **No cost** - Just use your Gmail

---

## Next Steps

✅ **Gmail working?** Try Telegram or Discord too!

You can enable all THREE notification methods:
- **Telegram** - Instant phone alerts
- **Discord** - Team channel
- **Gmail** - Email archive

See:
- **TELEGRAM_SETUP.md** - Free bot notifications
- **DISCORD_SETUP.md** - Free team channels

---

## Need Help?

- **Gmail Help**: https://support.google.com/mail
- **Nodemailer Docs**: https://nodemailer.com/
- **Gmail SMTP Settings**: https://support.google.com/mail/answer/7126229

---

## Security Notes

1. **Never commit** .env to GitHub
2. **App password** only for apps (not your real password)
3. **Keep .env private** - Contains sensitive data
4. **Use 2FA** - Protects your Google account
5. **Monitor** "Less secure app access" alerts
6. **Rotate credentials** if you suspect compromise

### Disable App Password Anytime
1. Go to https://myaccount.google.com/security
2. Click "App passwords"
3. Delete the app password
4. The app can no longer access Gmail

---

**Gmail notifications are now live! 📧**

Enjoy professional, free email alerts!

---

*OfficeBar + Gmail = Simple email notifications perfected*
