# OfficeBar - Quick Reference Card

## 🚀 Get Started in 3 Steps

```bash
# 1. Install & Start
npm install && npm run dev

# 2. Open Browser
http://localhost:3000

# 3. Sign Up & Order!
# 👤 John / 📧 john@company.com / 🔐 password123
```

---

## 📁 Key Files Location

| What | Where | Lines |
|------|-------|-------|
| **Frontend Entry** | `public/index.html` | 45 |
| **API Client** | `src/js/api.js` | 150 |
| **UI & Views** | `src/js/ui.js` | 600+ |
| **Styling** | `src/styles/main.css` | 650+ |
| **Server** | `server/index.js` | 130 |
| **Auth Routes** | `server/routes/auth.js` | 130 |
| **Order Routes** | `server/routes/orders.js` | 100 |
| **Menu Routes** | `server/routes/menu.js` | 180 |
| **Notifications** | `server/services/notifications.js` | 120 |
| **User Model** | `server/models/User.js` | 80 |
| **Order Model** | `server/models/Order.js` | 80 |

---

## 🔌 Configuration

### .env Template

```env
# Required
PORT=3000
NODE_ENV=development
JWT_SECRET=any_string_here

# Optional (Twilio)
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=whatsapp:+...
ADMIN_WHATSAPP_NUMBER=whatsapp:+...

# Optional (SendGrid)
SENDGRID_API_KEY=
ADMIN_EMAIL=admin@yourcompany.com
```

---

## 🔌 API Endpoints

### Auth
```
POST   /api/auth/signup          Create account
POST   /api/auth/login           Login
GET    /api/auth/me              Get profile (protected)
```

### Menu
```
GET    /api/menu                 All drinks
GET    /api/menu/category/:cat   Category drinks
GET    /api/menu/drink/:id       Single drink
```

### Orders
```
POST   /api/orders/create        Create order (protected)
GET    /api/orders/my-orders     User's orders (protected)
GET    /api/orders/:id           Order details (protected)
```

### System
```
GET    /api/health               Server status
GET    /api/status               Notification status
```

---

## 📊 Database Schema

### User
```javascript
{
  id: "1703001234567",
  email: "john@company.com",
  password: "$2a$10$hashed...",
  firstName: "John",
  lastName: "Doe",
  createdAt: Date,
  orderHistory: [
    { orderId, timestamp, items, totalPrice }
  ],
  favorites: ["espresso", "latte"]
}
```

### Order
```javascript
{
  id: "ORD-1703001234567",
  userId: "1703001234567",
  userName: "John Doe",
  items: [
    { drinkId, drinkName, quantity, price }
  ],
  totalPrice: 0.00,
  status: "pending", // pending|preparing|ready|completed
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎨 Color Scheme

```css
Primary:     #667eea (Purple)
Secondary:   #764ba2 (Dark Purple)
Accent:      #f093fb (Pink)
Success:     #10b981 (Green)
Error:       #ef4444 (Red)
Warning:     #f59e0b (Orange)
White:       #ffffff
Light:       #f5f7fa
Gray:        #e0e6ed
Dark:        #2d3748
```

---

## 💬 Notification Templates

### WhatsApp Message
```
🎉 New Order Alert!

New Order from John Doe:
• 1x Espresso
• 2x Latte

Time: 1/12/2024, 10:30:45 AM
```

### Email Subject
```
🎉 New OfficeBar Order from John Doe
```

---

## 🧪 Test Data

### Test Account
- Email: `test@company.com`
- Password: `password123`
- Name: `Test User`

### Test Drinks
- Espresso (☕)
- Cappuccino (☕)
- Latte (☕)
- Green Tea (🍵)
- Cold Brew (🥤)

---

## 🐛 Troubleshooting Checklist

**Server won't start?**
- [ ] Node.js installed? (`node --version`)
- [ ] Dependencies installed? (`npm install`)
- [ ] Port 3000 free? (change PORT in .env)

**Frontend not loading?**
- [ ] Server running? (`npm run dev`)
- [ ] http://localhost:3000 in browser
- [ ] Check browser console (F12)

**Login not working?**
- [ ] Account created? (sign up first)
- [ ] Correct email/password?
- [ ] Check server logs for errors

**Notifications not sending?**
- [ ] WhatsApp: Check TWILIO_* in .env
- [ ] Email: Check SENDGRID_API_KEY in .env
- [ ] Restart server after .env changes
- [ ] Check Twilio/SendGrid dashboards for errors

---

## 📚 Documentation

| Doc | Content |
|-----|---------|
| `README.md` | Full documentation |
| `SETUP_GUIDE.md` | Quick start (5 min) |
| `ARCHITECTURE.md` | System design |
| `TWILIO_SETUP.md` | WhatsApp setup |
| `SENDGRID_SETUP.md` | Email setup |
| `PROJECT_SUMMARY.md` | Project overview |

---

## 🔐 Security Checklist

**Development**:
- [ ] JWT_SECRET set (any string)
- [ ] .env not committed to git
- [ ] CORS configured
- [ ] Input validation working

**Production**:
- [ ] JWT_SECRET strong random string
- [ ] HTTPS/SSL enabled
- [ ] Rate limiting added
- [ ] Database encrypted
- [ ] API keys rotated
- [ ] Secrets in environment variables
- [ ] Admin auth added
- [ ] Audit logging enabled

---

## 🚀 Deployment

### Heroku
```bash
heroku create your-app
heroku config:set JWT_SECRET=xxx
heroku config:set TWILIO_ACCOUNT_SID=xxx
git push heroku main
```

### DigitalOcean
```bash
# Create App Platform
# Connect GitHub repo
# Set environment variables
# Deploy
```

### AWS
```bash
# Create EC2 instance
# Install Node.js
# Clone repo
# npm install && npm start
# Set up Load Balancer
```

---

## 💰 Cost Estimate

| Service | Free | Paid |
|---------|------|------|
| Hosting | $0-100/yr | $500+/yr |
| Twilio | $15 trial | $0.0075/msg |
| SendGrid | 100/day | $30/month |
| Database | ✅ In-memory | ~$100+/yr |
| **Total/Year** | **$0-100** | **$500+** |

---

## 📱 Browser Support

✅ Chrome 90+  
✅ Firefox 88+  
✅ Safari 14+  
✅ Edge 90+  
✅ Mobile Browsers  

---

## 🎯 Common Tasks

### Add New Drink

Edit `server/routes/menu.js`:
```javascript
{
  id: 'cortado',
  name: 'Cortado',
  description: 'Equal parts espresso and milk',
  price: 0.00,
  image: '☕'
}
```

### Change Theme Color

Edit `src/styles/main.css`:
```css
:root {
  --primary: #667eea;    /* Change this */
  --secondary: #764ba2;  /* Change this */
}
```

### Customize Notification

Edit `server/services/notifications.js`:
```javascript
const message = `Your custom format: ${orderSummary}`;
```

---

## 📞 Support Resources

- **Twilio Docs**: https://twilio.com/docs
- **SendGrid Docs**: https://docs.sendgrid.com
- **Express Docs**: https://expressjs.com
- **MDN Web Docs**: https://developer.mozilla.org
- **Stack Overflow**: Tag your question

---

## ✨ Pro Tips

1. **Use VS Code Extensions**:
   - Rest Client (test APIs)
   - Prettier (format code)
   - Thunder Client (like Postman)

2. **Test APIs Quickly**:
   ```bash
   curl http://localhost:3000/api/menu
   ```

3. **Monitor Server**:
   ```bash
   npm run dev  # Shows all logs
   ```

4. **Clear Browser Cache**:
   ```
   DevTools → Application → Clear site data
   ```

5. **Debug Tokens**:
   ```javascript
   // In browser console
   localStorage.getItem('token')
   ```

---

## 🎉 You're All Set!

Start with: `npm run dev`

Then: `http://localhost:3000`

Questions? Check the docs or see setup guides!

---

**Made with ☕ & 💜**
