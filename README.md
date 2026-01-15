# OfficeBar - Premium Office Ordering System

![OfficeBar](https://img.shields.io/badge/OfficeBar-1.0.0-purple)
![Node.js](https://img.shields.io/badge/Node.js-14+-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## Overview

OfficeBar is a premium, modern internal office web application that allows employees to order beverages (coffee, tea, soft drinks) with real-time admin notifications. All drinks are **FREE ($0.00)** - this is a company benefit!

### Key Features

✨ **Premium UI/UX**
- Modern, high-end design with gradient aesthetics
- Responsive layout that works on desktop and mobile
- Smooth animations and transitions
- Real-time cart management

👥 **User Accounts**
- Employee signup and login
- JWT-based authentication
- Order history tracking
- Favorite drinks (extensible)

🍷 **Ordering System**
- Browse menu by category (Coffee, Tea, Soft Drinks)
- Add/remove items from cart
- One-click ordering
- Order confirmation

🔔 **Notifications (THE STAR FEATURE!)**
- **Three Free Notification Channels**:
  - 📱 **Telegram Bot** - Instant messages (recommended)
  - 💬 **Discord Webhook** - Team channel alerts
  - 📧 **Gmail SMTP** - Email notifications
- Real-time notifications when orders are placed
- Admin gets: Employee name + drink ordered + timestamp

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (no frameworks!)
- **Backend**: Node.js + Express.js
- **Database**: In-memory (easily swappable with MongoDB/PostgreSQL)
- **Authentication**: JWT (JSON Web Tokens) + bcryptjs
- **Notifications**: 
  - Telegram Bot API (free)
  - Discord Webhooks (free)
  - Gmail SMTP (free)

## Project Structure

```
officeBar/
├── public/
│   ├── index.html              # Main SPA entry point
│   └── images/                 # Assets
├── src/
│   ├── js/
│   │   ├── api.js             # API client
│   │   └── ui.js              # UI manager & views
│   └── styles/
│       └── main.css           # Premium styling
├── server/
│   ├── index.js               # Express server
│   ├── models/
│   │   ├── User.js            # User model & store
│   │   └── Order.js           # Order model & store
│   ├── routes/
│   │   ├── auth.js            # Auth endpoints
│   │   ├── orders.js          # Order endpoints
│   │   └── menu.js            # Menu endpoints
│   └── services/
│       └── notifications.js   # Telegram, Discord & Gmail service
├── package.json               # Dependencies
├── .env.example               # Environment template
└── README.md                  # This file
```

## Installation

### Prerequisites

- Node.js 14+ and npm
- Choose one or more notification methods:
  - **Telegram Bot** (5 min setup) - [See TELEGRAM_SETUP.md](./TELEGRAM_SETUP.md)
  - **Discord Webhook** (5 min setup) - [See DISCORD_SETUP.md](./DISCORD_SETUP.md)
  - **Gmail SMTP** (5 min setup) - [See GMAIL_SETUP.md](./GMAIL_SETUP.md)

### Step 1: Install Dependencies

```bash
npm install
```

This installs:
- `express` - Web server
- `cors` - Cross-origin requests
- `dotenv` - Environment variables
- `jsonwebtoken` - JWT auth
- `bcryptjs` - Password hashing
- `nodemailer` - Gmail SMTP support (optional, for Gmail notifications)

### Step 2: Set Up Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` and add your chosen notification method(s):

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=your_super_secret_key_change_in_production

# Choose ONE or MORE notification methods:

# Option 1: Telegram Bot (RECOMMENDED - most free, instant)
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id

# Option 2: Discord Webhook (free, beautiful, team-friendly)
DISCORD_WEBHOOK_URL=your_webhook_url

# Option 3: Gmail SMTP (free, archivable)
GMAIL_USER=your_email@gmail.com
GMAIL_PASSWORD=your_app_password

# Required for all methods
ADMIN_EMAIL=admin@yourcompany.com
ADMIN_NAME=Office Manager
COMPANY_NAME=YourCompany Inc.
```

### Step 3: Run the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start at `http://localhost:3000`

## Setting Up Notifications

Choose one or more notification methods. Each takes about 5 minutes to set up - all completely FREE!

### Quick Start: Pick Your Method

| Method | Speed | Cost | Setup Time | Best For |
|--------|-------|------|------------|----------|
| **Telegram** 📱 | ⚡⚡⚡⚡⚡ | FREE | 5 min | Instant phone alerts, recommended |
| **Discord** 💬 | ⚡⚡⚡⚡⚡ | FREE | 5 min | Team channels, beautiful formatting |
| **Gmail** 📧 | ⚡⚡⚡ | FREE | 5 min | Professional emails, archive |

### Option 1: Telegram Bot Setup (RECOMMENDED)

**Time: 5 minutes | Cost: FREE | Delivery: Instant**

Telegram is like WhatsApp but completely free for developers!

[👉 See detailed TELEGRAM_SETUP.md](./TELEGRAM_SETUP.md)

Quick overview:
1. Create a bot with BotFather
2. Get your chat ID
3. Add credentials to .env
4. Done! Instant notifications

### Option 2: Discord Webhook Setup

**Time: 5 minutes | Cost: FREE | Delivery: Instant**

Use Discord for beautiful, team-friendly notifications!

[👉 See detailed DISCORD_SETUP.md](./DISCORD_SETUP.md)

Quick overview:
1. Create a Discord server
2. Create a webhook
3. Add webhook URL to .env
4. Done! Formatted channel alerts

### Option 3: Gmail SMTP Setup

**Time: 5 minutes | Cost: FREE | Delivery: Reliable**

Use your existing Gmail account for professional emails!

[👉 See detailed GMAIL_SETUP.md](./GMAIL_SETUP.md)

Quick overview:
1. Enable 2FA on Gmail
2. Create an app password
3. Add credentials to .env
4. Done! Professional emails

### Can I Use Multiple Methods?

**YES!** The system sends notifications to ALL configured methods:

```env
# Enable Telegram
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...

# ALSO enable Discord
DISCORD_WEBHOOK_URL=...

# ALSO enable Gmail
GMAIL_USER=...
GMAIL_PASSWORD=...
```

Now when an order is placed:
- ✅ Telegram message sent
- ✅ Discord message sent
- ✅ Gmail email sent

If one fails, the others still work! Perfect redundancy.

## API Documentation

### Authentication Endpoints

#### Sign Up
```
POST /api/auth/signup
Content-Type: application/json

{
  "email": "john@company.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}

Response:
{
  "message": "Signup successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "1234567890",
    "email": "john@company.com",
    "name": "John Doe"
  }
}
```

#### Log In
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@company.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}
```

#### Get Profile
```
GET /api/auth/me
Authorization: Bearer {token}

Response:
{
  "user": {
    "id": "1234567890",
    "email": "john@company.com",
    "name": "John Doe",
    "orderHistory": [...],
    "favorites": [...]
  }
}
```

### Menu Endpoints

#### Get Full Menu
```
GET /api/menu

Response:
{
  "message": "OfficeBar Menu",
  "menu": {
    "coffee": {
      "name": "Premium Coffee",
      "emoji": "☕",
      "drinks": [...]
    },
    "tea": { ... },
    "softdrinks": { ... }
  }
}
```

#### Get Category
```
GET /api/menu/category/coffee

Response:
{
  "category": "coffee",
  "categoryName": "Premium Coffee",
  "drinks": [
    {
      "id": "espresso",
      "name": "Espresso",
      "description": "Bold and intense single shot",
      "price": 0.00,
      "image": "☕"
    },
    ...
  ]
}
```

#### Get Drink Details
```
GET /api/menu/drink/espresso

Response:
{
  "drink": { ... },
  "category": "coffee"
}
```

### Order Endpoints

#### Create Order
```
POST /api/orders/create
Authorization: Bearer {token}
Content-Type: application/json

{
  "items": [
    {
      "drinkId": "espresso",
      "drinkName": "Espresso",
      "quantity": 1,
      "price": 0.00
    }
  ]
}

Response:
{
  "message": "Order created successfully",
  "order": {
    "id": "ORD-1703001234567",
    "status": "pending",
    "items": [...],
    "createdAt": "2024-01-12T..."
  },
  "notifications": {
    "whatsapp": { "success": true, "messageId": "SM..." },
    "email": { "success": true }
  }
}
```

#### Get My Orders
```
GET /api/orders/my-orders
Authorization: Bearer {token}

Response:
{
  "orders": [
    {
      "id": "ORD-1703001234567",
      "status": "pending",
      "items": [...],
      "totalPrice": 0.00,
      "createdAt": "2024-01-12T..."
    }
  ]
}
```

#### Get Specific Order
```
GET /api/orders/{orderId}
Authorization: Bearer {token}

Response:
{
  "order": { ... }
}
```

### System Endpoints

#### Health Check
```
GET /api/health

Response:
{
  "status": "OK",
  "message": "OfficeBar server is running",
  "timestamp": "2024-01-12T...",
  "environment": "development"
}
```

#### System Status
```
GET /api/status

Response:
{
  "server": "running",
  "notifications": {
    "whatsapp": "configured",
    "email": "configured"
  },
  "database": "in-memory",
  "timestamp": "2024-01-12T..."
}
```

## Usage

### For Employees

1. **Sign Up**: Create account with name and credentials
2. **Browse Menu**: View drinks in Coffee, Tea, or Soft Drinks categories
3. **Add to Cart**: Click "Add +" on any drink
4. **Review Order**: See items in the cart sidebar
5. **Place Order**: Click "Order Now" when ready
6. **View History**: Check past orders in "My Orders"

### For Admin

The admin receives notifications in two ways:

**WhatsApp Alert**:
```
🎉 New Order Alert!

New Order from John Doe: 1x Espresso, 2x Latte

Time: 1/12/2024, 10:30:45 AM
```

**Email Alert**:
- Professional HTML email with order details
- Sent to configured email address
- Includes employee name, items ordered, and timestamp

## Customization

### Change Drink Menu

Edit `server/routes/menu.js` and modify the `menu` object:

```javascript
const menu = {
  categories: {
    coffee: {
      drinks: [
        {
          id: 'your_drink_id',
          name: 'Your Drink Name',
          description: 'Description',
          price: 0.00,
          image: '☕'
        }
      ]
    }
  }
};
```

### Change Theme Colors

Edit `src/styles/main.css` CSS variables:

```css
:root {
  --primary: #667eea;      /* Main color */
  --secondary: #764ba2;    /* Secondary color */
  --accent: #f093fb;       /* Accent color */
  /* ... more colors ... */
}
```

### Customize Notification Messages

Edit `server/services/notifications.js`:

```javascript
// Modify WhatsApp message format
const message = `Your custom message format: ${orderSummary}`;

// Modify email HTML template
const htmlTemplate = `Your custom HTML email...`;
```

## Deployment

### Heroku

1. Create `Procfile`:
```
web: node server/index.js
```

2. Deploy:
```bash
heroku create your-app-name
heroku config:set JWT_SECRET=your_secret
heroku config:set TWILIO_ACCOUNT_SID=...
heroku config:set TWILIO_AUTH_TOKEN=...
heroku config:set SENDGRID_API_KEY=...
git push heroku main
```

### AWS, Google Cloud, DigitalOcean

Similar process - set environment variables and run `npm start`

## Security Considerations

⚠️ **Before Going to Production**:

1. **Change JWT_SECRET**: Use a strong, random string
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Use Database**: Replace in-memory store with MongoDB/PostgreSQL
3. **Add HTTPS**: Always use SSL certificates
4. **Rate Limiting**: Add request rate limiting
5. **Input Validation**: Add more comprehensive validation
6. **CORS Configuration**: Restrict to your domain only
7. **Admin Authentication**: Add admin dashboard with proper auth

## Troubleshooting

### WhatsApp Notifications Not Sending

- Check Twilio credentials in `.env`
- Verify phone number format: `whatsapp:+1234567890`
- Ensure you've sent initial message to enable 2-way messaging
- Check Twilio Console for error logs

### Email Not Received

- Verify SendGrid API key is active
- Check admin email is verified in SendGrid
- Look in spam folder
- Check SendGrid Activity Feed for bounces/failures

### CORS Errors

- Make sure frontend URL is in CORS whitelist in `server/index.js`
- Check browser console for specific CORS errors

### 401 Unauthorized

- Token may have expired (7 days)
- Re-login to get new token
- Check Authorization header format: `Bearer {token}`

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT - Feel free to use and modify!

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review API documentation
3. Check browser console for errors
4. Review server logs

---

**Made with ☕ by Your Development Team**
