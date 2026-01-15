# Quick Start Guide - OfficeBar

## 5-Minute Setup

### 1. Install Dependencies (1 min)

```bash
cd officeBar
npm install
```

### 2. Create `.env` File (2 min)

Copy the template:
```bash
cp .env.example .env
```

For testing **without notifications**, you can use:
```env
PORT=3000
NODE_ENV=development
JWT_SECRET=dev_secret_key_change_this_in_production
```

### 3. Start Server (1 min)

```bash
npm run dev
```

You'll see:
```
╔════════════════════════════════════════════════════════════╗
║          🎉 OfficeBar Server Running 🎉                   ║
╚════════════════════════════════════════════════════════════╝

📍 Server: http://localhost:3000
```

### 4. Open Browser (1 min)

Visit: **http://localhost:3000**

## Test Accounts

The app starts with empty accounts. Create your first account:

```
Email: test@company.com
Password: password123
Name: Test User
```

## Menu Preview

Browse these categories:
- ☕ **Premium Coffee** (Espresso, Americano, Cappuccino, etc.)
- 🍵 **Premium Tea** (Black, Green, Chamomile, etc.)
- 🥤 **Soft Drinks** (Cold Brew, Sparkling Water, Juice, etc.)

All drinks are **$0.00** - it's a company benefit!

## Adding Notifications

### Enable WhatsApp Notifications

1. Go to https://www.twilio.com/console
2. Sign up or login
3. Get your credentials:
   - Account SID
   - Auth Token
4. Set up WhatsApp Business Profile
5. Get a WhatsApp number (starts with `whatsapp:+...`)
6. Update `.env`:

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=whatsapp:+15551234567
ADMIN_WHATSAPP_NUMBER=whatsapp:+15559876543
```

### Enable Email Notifications

1. Go to https://sendgrid.com
2. Sign up or login
3. Create API Key in Settings → API Keys
4. Verify your sender email
5. Update `.env`:

```env
SENDGRID_API_KEY=SG.xxx...
ADMIN_EMAIL=your_email@company.com
```

6. Restart server: `npm run dev`

## Test an Order

1. Sign up
2. Add a drink to cart
3. Click "Order Now"
4. Watch for notification! 🚀

## Important URLs

| Page | URL |
|------|-----|
| Home | http://localhost:3000 |
| API Docs | http://localhost:3000/api/menu |
| Health Check | http://localhost:3000/api/health |

## Project Files

| File | Purpose |
|------|---------|
| `server/index.js` | Main server |
| `src/js/ui.js` | Frontend interface |
| `server/routes/` | API endpoints |
| `server/services/notifications.js` | Twilio & SendGrid |
| `src/styles/main.css` | Premium styling |

## Next Steps

1. ✅ **Basic Setup**: Follow steps 1-4 above
2. 🔔 **Add Notifications**: Configure Twilio/SendGrid
3. 🎨 **Customize Design**: Edit `src/styles/main.css`
4. 📋 **Add More Drinks**: Edit `server/routes/menu.js`
5. 🚀 **Deploy**: See README.md for deployment options

## Common Issues

**Port Already in Use?**
```bash
# Change PORT in .env
PORT=3001
```

**Dependencies Failed?**
```bash
rm -rf node_modules
npm install
```

**WhatsApp Not Sending?**
- Check `.env` has all Twilio credentials
- Verify phone numbers include `whatsapp:+` prefix
- Check Twilio Console for error logs

**Email Not Sending?**
- Verify API key is active
- Confirm sender email is verified in SendGrid
- Check SENDGRID_API_KEY in `.env`

---

**Need Help?** Check `README.md` for detailed documentation!
