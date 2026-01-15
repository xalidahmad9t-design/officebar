# Telegram Bot Setup Guide - OfficeBar Notifications

## Overview

**Telegram** is the recommended free notification channel for OfficeBar. It's instant, reliable, and works like WhatsApp without any cost!

Setup time: **5 minutes**
Cost: **FREE**
Reliability: **Excellent**

---

## Step 1: Create a Telegram Bot

### 1a. Open Telegram
- Download Telegram (https://telegram.org) if you don't have it
- Create account if needed

### 1b. Create a Bot
1. Search for **"BotFather"** in Telegram
2. Click the verified BotFather account
3. Send the message: `/start`
4. Send: `/newbot`
5. Follow the prompts:
   - Name your bot: `OfficeBar Bot` (or any name)
   - Username: `officebar_yourname_bot` (must be unique, include `bot` at the end)
6. BotFather gives you a **token** that looks like:
   ```
   123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
   ```
   **Copy this token** - it's your `TELEGRAM_BOT_TOKEN`

---

## Step 2: Get Your Chat ID

You need to tell the bot who to send messages to (your chat ID).

### 2a. Message Your Bot
1. Search for your new bot (the username from Step 1b)
2. Click it and send: `/start` or any message
3. The bot will respond (probably a greeting or error - that's fine)

### 2b. Get Chat ID
1. Go to this URL in your browser (replace TOKEN with your actual token):
   ```
   https://api.telegram.org/botTOKEN/getUpdates
   ```
   Example:
   ```
   https://api.telegram.org/bot123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11/getUpdates
   ```

2. You'll see JSON response like:
   ```json
   {
     "ok": true,
     "result": [
       {
         "update_id": 123456789,
         "message": {
           "message_id": 1,
           "from": {
             "id": 987654321,
             ...
           }
         }
       }
     ]
   }
   ```

3. Copy the `"id"` number from the `"from"` section:
   ```
   987654321
   ```
   This is your `TELEGRAM_CHAT_ID`

---

## Step 3: Update .env File

Edit `.env` in your officeBar directory:

```env
TELEGRAM_BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
TELEGRAM_CHAT_ID=987654321
```

**Never share these values!** Keep them private.

---

## Step 4: Test It!

### 4a. Restart Server
```bash
npm run dev
```

You should see:
```
📱 Telegram Notifications: ✅ Enabled
```

### 4b. Place an Order
1. Open http://localhost:3000
2. Sign up
3. Add a drink to cart
4. Click "Order Now"

### 4c. Check Telegram
Look at your Telegram chat - you should get an instant notification! 🎉

Example message:
```
🎉 New OfficeBar Order!

New Order from John Doe:
• 1x Espresso
• 2x Latte

⏰ Time: 1/12/2024, 10:30:45 AM
```

---

## Troubleshooting

### Bot Not Sending Messages

**Problem**: Order placed but no Telegram message

**Solutions**:
1. ✅ Did you message the bot first? (Step 2a required!)
2. ✅ Check token is correct (no spaces, full token)
3. ✅ Check chat ID is correct (numeric only)
4. ✅ Restart server after editing .env
5. ✅ Check server logs for error messages

### Can't Find Chat ID

**Problem**: /getUpdates shows empty result

**Solution**:
1. Make sure you message your bot AFTER creating it
2. Wait a few seconds
3. Then check /getUpdates again
4. The message should appear

### Bot Not Responding at All

**Problem**: No Telegram bot found

**Solution**:
1. Check bot username (BotFather confirmation)
2. Search for exact username in Telegram
3. If not found, create a new bot via BotFather
4. Make sure `bot` is in the username

### Invalid Token

**Problem**: "Invalid bot token"

**Solution**:
1. Copy full token from BotFather (no truncating)
2. Check for accidental spaces
3. Make sure it matches: `numbers:letters-numbers`
4. Create a new bot if still having issues

### Still Not Working?

1. **Test token manually**:
   ```bash
   curl https://api.telegram.org/botYOUR_TOKEN/getMe
   ```
   Should return bot info if token is valid.

2. **Check server logs**:
   - Look at terminal output
   - See if errors are logged
   - Screenshots of error messages help

3. **Verify chat ID**:
   ```bash
   curl "https://api.telegram.org/botYOUR_TOKEN/getUpdates"
   ```
   Should show your chat ID in response.

---

## Tips & Tricks

### Tip 1: Create a Telegram Group
Want to share notifications with team?

1. Create a Telegram group
2. Add the bot to the group
3. Send one message in group
4. Get the group's chat ID (same process)
5. Use group chat ID in .env

Group chat IDs start with `-` (negative number):
```
TELEGRAM_CHAT_ID=-987654321
```

### Tip 2: Customize Messages
Edit `server/services/notifications.js` to customize the message format.

### Tip 3: Multiple Bots
You can create multiple bots and send to different chat IDs.

### Tip 4: Telegram Desktop
Use Telegram Desktop app for better notification sounds on computer.

---

## Cost Comparison

| Service | Cost | Setup Time | Reliability |
|---------|------|-----------|-------------|
| **Telegram** | FREE | 5 min | ⭐⭐⭐⭐⭐ |
| Twilio SMS | $0.0075/msg | 30 min | ⭐⭐⭐⭐ |
| Twilio WhatsApp | $0.0432/msg | 30 min | ⭐⭐⭐⭐⭐ |
| SendGrid Email | $30/month | 15 min | ⭐⭐⭐⭐ |
| Discord | FREE | 5 min | ⭐⭐⭐⭐⭐ |
| Gmail | FREE | 5 min | ⭐⭐⭐⭐ |

**Telegram is the clear winner!** Free, instant, reliable.

---

## Next Steps

✅ **Telegram working?** Try Discord or Gmail too!

See:
- **DISCORD_SETUP.md** - Discord webhook notifications
- **GMAIL_SETUP.md** - Email via Gmail

You can enable all three - orders will send to all configured channels!

---

## Need Help?

- **Telegram Bot API Docs**: https://core.telegram.org/bots/api
- **BotFather**: Search in Telegram app
- **Stack Overflow**: Tag `python-telegram-bot` or `telegram`

---

## Security Notes

1. **Never commit** .env to GitHub
2. **Keep token private** - anyone with token can control bot
3. **Use environment variables** - never hardcode
4. **Regenerate token** if you suspect compromise
   - Go to BotFather → /mybots → Select bot → Edit → Change Token

---

**Telegram notifications are now live! 🎉**

Enjoy instant order alerts on your phone!

---

*OfficeBar + Telegram = Perfect notifications setup*
