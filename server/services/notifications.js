// Notification Service - handles Telegram, Discord, and Gmail notifications
// All completely FREE! No paid subscriptions needed.

const https = require('https');
const nodemailer = require('nodemailer');

class NotificationService {
  constructor() {
    // Telegram Bot Setup
    this.telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    this.telegramChatId = process.env.TELEGRAM_CHAT_ID;
    this.telegramReady = !!(this.telegramToken && this.telegramChatId);

    if (!this.telegramReady && process.env.TELEGRAM_BOT_TOKEN) {
      console.warn('⚠️ Telegram Chat ID not configured - set TELEGRAM_CHAT_ID');
    } else if (!this.telegramReady && !process.env.TELEGRAM_BOT_TOKEN) {
      console.log('ℹ️ Telegram notifications disabled - see TELEGRAM_SETUP.md to enable');
    }

    // Discord Webhook Setup
    this.discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
    this.discordReady = !!this.discordWebhookUrl;

    if (!this.discordReady) {
      console.log('ℹ️ Discord notifications disabled - see DISCORD_SETUP.md to enable');
    }

    // Gmail SMTP Setup
    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_PASSWORD;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (gmailUser && gmailPassword && adminEmail) {
      this.mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: gmailUser,
          pass: gmailPassword
        }
      });
      this.gmailReady = true;
      this.gmailUser = gmailUser;
      this.adminEmail = adminEmail;
    } else {
      this.gmailReady = false;
      console.log('ℹ️ Gmail notifications disabled - see GMAIL_SETUP.md to enable');
    }
  }

  /**
   * Send Telegram notification (FREE - uses Telegram Bot API)
   */
  async sendTelegramNotification(orderSummary) {
    if (!this.telegramReady) {
      console.log('📱 Telegram disabled - skipping notification');
      return { success: false, message: 'Telegram not configured' };
    }

    try {
      const message = `🎉 New OfficeBar Order!\n\n${orderSummary}\n\n⏰ Time: ${new Date().toLocaleString()}`;

      const url = `https://api.telegram.org/bot${this.telegramToken}/sendMessage`;
      const postData = JSON.stringify({
        chat_id: this.telegramChatId,
        text: message,
        parse_mode: 'HTML'
      });

      const options = {
        hostname: 'api.telegram.org',
        path: `/bot${this.telegramToken}/sendMessage`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': postData.length
        }
      };

      return new Promise((resolve) => {
        const req = https.request(options, (res) => {
          let data = '';
          res.on('data', (chunk) => { data += chunk; });
          res.on('end', () => {
            if (res.statusCode === 200) {
              console.log(`✅ Telegram notification sent`);
              resolve({ success: true });
            } else {
              console.error(`❌ Telegram error: ${res.statusCode}`);
              resolve({ success: false, error: `Status ${res.statusCode}` });
            }
          });
        });

        req.on('error', (error) => {
          console.error('❌ Telegram notification failed:', error.message);
          resolve({ success: false, error: error.message });
        });

        req.write(postData);
        req.end();
      });
    } catch (error) {
      console.error('❌ Telegram notification failed:', error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Send Discord notification (FREE - uses Discord Webhook)
   */
  async sendDiscordNotification(orderSummary, employeeName) {
    if (!this.discordReady) {
      console.log('🎮 Discord disabled - skipping notification');
      return { success: false, message: 'Discord not configured' };
    }

    try {
      const items = orderSummary.split('New Order from ')[1];
      
      const discordPayload = {
        content: null,
        embeds: [
          {
            title: '🎉 New OfficeBar Order!',
            description: `New order from **${employeeName}**`,
            color: 0x667eea,
            fields: [
              {
                name: 'Items Ordered',
                value: items || orderSummary,
                inline: false
              },
              {
                name: 'Time',
                value: new Date().toLocaleString(),
                inline: false
              }
            ],
            footer: {
              text: 'OfficeBar Order System'
            }
          }
        ]
      };

      return new Promise((resolve) => {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        };

        const req = https.request(this.discordWebhookUrl, options, (res) => {
          let data = '';
          res.on('data', (chunk) => { data += chunk; });
          res.on('end', () => {
            if (res.statusCode === 204 || res.statusCode === 200) {
              console.log(`✅ Discord notification sent`);
              resolve({ success: true });
            } else {
              console.error(`❌ Discord error: ${res.statusCode}`);
              resolve({ success: false, error: `Status ${res.statusCode}` });
            }
          });
        });

        req.on('error', (error) => {
          console.error('❌ Discord notification failed:', error.message);
          resolve({ success: false, error: error.message });
        });

        req.write(JSON.stringify(discordPayload));
        req.end();
      });
    } catch (error) {
      console.error('❌ Discord notification failed:', error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Send Email notification via Gmail SMTP (FREE - using your own Gmail account)
   */
  async sendGmailNotification(orderSummary, employeeName) {
    if (!this.gmailReady) {
      console.log('📧 Gmail disabled - skipping email notification');
      return { success: false, message: 'Gmail not configured' };
    }

    try {
      const mailOptions = {
        from: this.gmailUser,
        to: this.adminEmail,
        subject: `🎉 New OfficeBar Order from ${employeeName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5; border-radius: 10px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; text-align: center;">
              <h2 style="margin: 0; font-size: 24px;">🎉 New OfficeBar Order!</h2>
            </div>
            <div style="background: white; padding: 20px; margin-top: 10px; border-radius: 10px;">
              <p style="font-size: 16px; color: #333;"><strong>Employee:</strong> ${employeeName}</p>
              <p style="font-size: 16px; color: #333;"><strong>Order Details:</strong></p>
              <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #667eea; margin: 10px 0; border-radius: 5px;">
                <p style="margin: 5px 0; color: #555;">${orderSummary}</p>
              </div>
              <p style="font-size: 14px; color: #999; margin-top: 20px;">⏰ Time: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        `,
        text: `New OfficeBar Order from ${employeeName}\n\n${orderSummary}\n\nTime: ${new Date().toLocaleString()}`
      };

      await this.mailTransporter.sendMail(mailOptions);
      console.log(`✅ Email notification sent to ${this.adminEmail}`);
      return { success: true };
    } catch (error) {
      console.error('❌ Email notification failed:', error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Send notifications via all configured channels
   */
  async notifyAdmin(employeeName, orderItems) {
    // Format order summary
    const itemsList = orderItems
      .map(item => `• ${item.quantity}x ${item.drinkName}`)
      .join('\n');

    const orderSummary = `New Order from ${employeeName}:\n${itemsList}`;

    console.log(`\n🔔 Sending notifications for order:\n${orderSummary}\n`);

    // Send all notifications in parallel
    const results = await Promise.all([
      this.sendTelegramNotification(orderSummary),
      this.sendDiscordNotification(orderSummary, employeeName),
      this.sendGmailNotification(orderSummary, employeeName)
    ]);

    // Count successes
    const successCount = results.filter(r => r.success).length;
    console.log(`✅ Notifications sent: ${successCount} of 3 channels\n`);

    return {
      telegram: results[0],
      discord: results[1],
      gmail: results[2],
      totalSent: successCount
    };
  }
}

// Export singleton instance
module.exports = new NotificationService();
