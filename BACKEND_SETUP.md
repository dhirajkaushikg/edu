# Backend Setup Guide

This guide will help you set up the backend server for handling contact form submissions and sending emails to edurancehub@gmail.com.

## Prerequisites

1. Node.js installed on your system
2. A Gmail account (edurancehub@gmail.com)
3. An App Password for your Gmail account

## Step 1: Generate a Gmail App Password

1. Sign in to your Google Account
2. Go to [Google Account Security](https://myaccount.google.com/security)
3. Under "Signing in to Google," select "App passwords"
4. If you don't see "App passwords," you may need to:
   - Enable 2-Step Verification first
   - Or use an app password from a less secure app setting
5. Select "Mail" and "Other (Custom name)" - give it a name like "Edurance Hub"
6. Click "Generate"
7. Copy the 16-character app password (you'll need this later)

## Step 2: Configure the Backend

1. Open `server.js` in your project
2. Replace `'your_app_password_here'` with the app password you generated:
   ```javascript
   const transporter = nodemailer.createTransporter({
     service: 'gmail',
     auth: {
       user: 'edurancehub@gmail.com',
       pass: 'your_16_character_app_password'
     }
   });
   ```

## Step 3: Install Dependencies

1. Open a terminal in your project directory
2. Run:
   ```bash
   npm install
   ```

## Step 4: Start the Backend Server

1. In your terminal, run:
   ```bash
   node server.js
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

2. You should see:
   ```
   Server is running on port 3001
   Server is ready to send emails
   ```

## Step 5: Test the Contact Form

1. Make sure your React frontend is running
2. Navigate to the Contact page
3. Fill out the form and submit
4. Check edurancehub@gmail.com for the received message

## Troubleshooting

### Common Issues

1. **"Invalid login" or "Authentication failed"**
   - Make sure you're using an App Password, not your regular Gmail password
   - Ensure 2-Step Verification is enabled on your Google account

2. **"Server is not ready to send emails"**
   - Check your internet connection
   - Verify the Gmail credentials in server.js
   - Ensure the Gmail account allows less secure apps or has an app password

3. **CORS Errors**
   - The backend already includes CORS middleware
   - Make sure both frontend and backend are running

4. **Port Conflicts**
   - If port 3001 is in use, change the PORT variable in server.js

### Testing the Backend Directly

You can test the backend API directly using curl:

```bash
curl -X POST http://localhost:3001/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message"
  }'
```

### Health Check

You can check if the server is running with:

```bash
curl http://localhost:3001/health
```

## Security Notes

1. Never commit your app password to version control
2. In a production environment, use environment variables:
   ```javascript
   auth: {
     user: process.env.GMAIL_USER,
     pass: process.env.GMAIL_APP_PASSWORD
   }
   ```

3. Consider using a more secure method for storing credentials in production

## Running in Production

For production deployment:

1. Set up environment variables for sensitive data
2. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js
   ```

3. Consider using a reverse proxy like Nginx

## Alternative Email Services

If you prefer not to use Gmail, you can configure other email services:

1. **SendGrid**:
   ```javascript
   const transporter = nodemailer.createTransporter({
     service: 'SendGrid',
     auth: {
       user: 'apikey',
       pass: 'your_sendgrid_api_key'
     }
   });
   ```

2. **Outlook/Hotmail**:
   ```javascript
   const transporter = nodemailer.createTransporter({
     service: 'hotmail',
     auth: {
       user: 'your_email@hotmail.com',
       pass: 'your_password'
     }
   });
   ```

3. **Custom SMTP**:
   ```javascript
   const transporter = nodemailer.createTransporter({
     host: 'your-smtp-server.com',
     port: 587,
     secure: false,
     auth: {
       user: 'your_username',
       pass: 'your_password'
     }
   });
   ```