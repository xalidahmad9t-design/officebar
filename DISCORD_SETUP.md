# Discord Webhook Setup Guide - OfficeBar Notifications

## Overview

**Discord** webhooks are perfect for team notifications. Orders appear instantly in a dedicated Discord channel!

Setup time: **5 minutes**
Cost: **FREE**
Perfect for: **Teams, communities, shared notifications**

---

## Step 1: Create a Discord Server (if needed)

### 1a. Create Server
1. Open Discord (https://discord.com)
2. Click the **+** icon on the left sidebar
3. Select **"Create a Server"**
4. Give it a name: `OfficeBar` or your company name
5. Click **"Create"**

### 1b. Create Channel
1. In your server, click **"+"** next to "Text Channels"
2. Name it: `#office-orders` or `#orders`
3. Set description: "Real-time office drink orders"
4. Click **"Create"**

---

## Step 2: Create Webhook

### 2a. Get Webhook URL
1. In your Discord server, click the **gear icon** (Server Settings)
2. Go to **"Integrations"** (left sidebar)
3. Click **"Webhooks"**
4. Click **"New Webhook"**
5. Select your channel (e.g., `#office-orders`)
6. Give it a name: `OfficeBar Bot`
7. Click **"Copy Webhook URL"**

The URL looks like:
```
https://discord.com/api/webhooks/1234567890/ABC-DEF_xyz123
```

**Save this URL** - it's your `DISCORD_WEBHOOK_URL`

### 2b. (Optional) Set Avatar
1. In the webhook settings, click **"Edit"**
2. Click profile picture area
3. Upload an image (or emoji)
4. Save

---

## Step 3: Update .env File

Edit `.env` in your officeBar directory:

```env
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/1234567890/ABC-DEF_xyz123
```

---

## Step 4: Test It!

### 4a. Restart Server
```bash
npm run dev
```

You should see:
```
🎮 Discord Notifications: ✅ Enabled
```

### 4b. Place an Order
1. Open http://localhost:3000
2. Sign up
3. Add a drink to cart
4. Click "Order Now"

### 4c. Check Discord
Look at your Discord channel - you should see a beautiful message! 🎉

Example:
```
[Embed showing]
🎉 New OfficeBar Order!
New order from John Doe
Items Ordered: • 1x Espresso
Time: 1/12/2024, 10:30:45 AM
```

---

## Features

### Rich Formatting
- ✅ Embed messages with colors
- ✅ Organized fields
- ✅ Timestamps
- ✅ Employee names highlighted
- ✅ Item list formatted

### Team Collaboration
- ✅ Multiple people see orders
- ✅ Thread support
- ✅ Notification settings per user
- ✅ Mobile notifications

### Multiple Channels
You can send to different channels:
```env
DISCORD_WEBHOOK_URL_ADMIN=https://...
DISCORD_WEBHOOK_URL_BARISTA=https://...
DISCORD_WEBHOOK_URL_GENERAL=https://...
```

Then modify `server/services/notifications.js` to send to multiple webhooks.

---

## Troubleshooting

### Message Not Appearing

**Problem**: Placed order but no Discord message

**Solutions**:
1. ✅ Check webhook URL is complete (no truncation)
2. ✅ Verify channel name is correct in webhook
3. ✅ Restart server after editing .env
4. ✅ Check webhook hasn't been deleted
5. ✅ Verify bot has permission to post in channel

### "Invalid Webhook URL"

**Problem**: URL format error

**Solution**:
1. Copy full URL from Discord settings
2. No spaces before/after
3. Check format: `https://discord.com/api/webhooks/...`
4. Create new webhook if unsure

### Webhook Deleted

**Problem**: "Unknown Webhook"

**Solution**:
1. Go to Server Settings → Integrations → Webhooks
2. Create new webhook
3. Copy new URL to .env
4. Restart server

### No Permission

**Problem**: Webhook can't post in channel

**Solution**:
1. Check webhook selected correct channel
2. Verify bot role has "Send Messages" permission
3. Recreate webhook in correct channel
4. Test with manual curl:
   ```bash
   curl -X POST -H 'Content-Type: application/json' \
     -d '{"content":"Test"}' \
     YOUR_WEBHOOK_URL
   ```

---

## Customization

### Change Message Content

Edit `server/services/notifications.js` - look for `sendDiscordNotification()`:

```javascript
const discordPayload = {
  embeds: [
    {
      title: '🎉 New OfficeBar Order!',  // Change title
      color: 0x667eea,                    // Change color (hex)
      fields: [
        {
          name: 'Items Ordered',          // Change field name
          value: items,                    // Change field content
        }
      ]
    }
  ]
};
```

### Change Color

Discord embed colors are in hex format:
```
0x667eea  = Purple
0x10b981  = Green
0xef4444  = Red
0xf59e0b  = Orange
0x3b82f6  = Blue
```

### Add More Fields

```javascript
fields: [
  {
    name: 'Items Ordered',
    value: items,
    inline: false
  },
  {
    name: 'Employee Email',
    value: employeeEmail,
    inline: true
  },
  {
    name: 'Order Time',
    value: timestamp,
    inline: true
  }
]
```

---

## Advanced: Multiple Webhooks

Send to different channels:

**1. Create multiple webhooks**
- Channel: `#office-orders`
- Channel: `#barista-station`
- Channel: `#admin-logs`

**2. Store URLs in .env**
```env
DISCORD_WEBHOOK_ORDERS=https://discord.com/api/webhooks/111...
DISCORD_WEBHOOK_BARISTA=https://discord.com/api/webhooks/222...
DISCORD_WEBHOOK_ADMIN=https://discord.com/api/webhooks/333...
```

**3. Modify notifications.js**
```javascript
async notifyAdmin(employeeName, orderItems) {
  // Send to all channels
  await this.sendDiscordNotification(orderSummary, process.env.DISCORD_WEBHOOK_ORDERS);
  await this.sendDiscordNotification(orderSummary, process.env.DISCORD_WEBHOOK_BARISTA);
  await this.sendDiscordNotification(orderSummary, process.env.DISCORD_WEBHOOK_ADMIN);
}
```

---

## Tips & Tricks

### Tip 1: Mobile Notifications
- Install Discord mobile app
- Enable notifications for the channel
- Get instant alerts on your phone

### Tip 2: Thread Replies
Replies to webhook messages appear as threads:
1. Click message
2. Click "Reply"
3. Your message threads under order

### Tip 3: Mentions
Add role/user mentions to alert specific people:
```javascript
"content": "<@&ROLE_ID> New order!",  // Mention role
"content": "<@USER_ID> Order ready",  // Mention user
```

### Tip 4: Multiple Servers
Create webhooks in different servers and send to all:
```env
DISCORD_WEBHOOK_MAIN=https://...
DISCORD_WEBHOOK_BACKUP=https://...
```

### Tip 5: Rich Timestamps
Discord automatically formats timestamps:
```javascript
timestamp: new Date().toISOString()
// Shows "1/12/2024, 10:30:45 AM" in Discord
```

---

## Discord Permissions

For the best experience, the bot role should have:
- ✅ Send Messages
- ✅ Embed Links (to show formatted messages)
- ✅ Read Messages/Channels
- ✅ Add Reactions (optional)

---

## Cost Comparison

| Channel | Cost | Setup | Speed | Formatting |
|---------|------|-------|-------|-----------|
| **Discord** | FREE | 5 min | ⚡⚡⚡⚡⚡ | ⭐⭐⭐⭐⭐ |
| Telegram | FREE | 5 min | ⚡⚡⚡⚡⚡ | ⭐⭐⭐⭐ |
| Gmail | FREE | 5 min | ⚡⚡⚡ | ⭐⭐⭐⭐ |

---

## Perfect For

✅ **Team collaboration** - Everyone sees orders
✅ **Multiple departments** - Different channels
✅ **Asynchronous work** - Check when convenient
✅ **Archive** - Discord keeps message history
✅ **Community** - Share order activity

---

## Next Steps

✅ **Discord working?** Try Telegram or Gmail too!

See:
- **TELEGRAM_SETUP.md** - Instant bot messages
- **GMAIL_SETUP.md** - Email notifications

You can enable all three channels simultaneously!

---

## Need Help?

- **Discord Docs**: https://discord.com/developers/docs
- **Webhook Docs**: https://discord.com/developers/docs/resources/webhook
- **Discord Support**: https://support.discord.com/

---

## Security Notes

1. **Keep webhook URL private** - Anyone with URL can post
2. **Never commit** .env to GitHub
3. **Regenerate** if compromised:
   - Server Settings → Integrations → Webhooks
   - Delete old, create new
   - Update .env
4. **Use environment variables** - Never hardcode URLs

---

**Discord notifications are now live! 🎮**

Enjoy beautiful, formatted order alerts in your server!

---

*OfficeBar + Discord = Team notifications perfected*
