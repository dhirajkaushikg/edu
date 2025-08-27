# Email Service Setup Guide

This guide will help you properly configure the email service for the contact form.

## Prerequisites

1. You need to have a Gmail account (edurancehub@gmail.com)
2. You need to generate an App Password for Gmail

## Setting up Gmail App Password

1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to Security → 2-Step Verification (enable if not already enabled)
3. Scroll down to "App passwords" section
4. Generate a new app password for "Mail"
5. Copy the generated password (16 characters)

## Configuration

### Backend Configuration

1. Open `server.js` file
2. Replace `'your_app_password_here'` with the actual App Password you generated
   ```javascript
   const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
       user: 'edurancehub@gmail.com',
       pass: 'your_actual_app_password_here' // <- Replace this
     }
   });
   ```

### Environment Variable (Recommended for Production)

Instead of hardcoding the password, create a `.env` file in the project root:

```
GMAIL_APP_PASSWORD=your_actual_app_password_here
```

Then modify the transporter configuration to use:
```javascript
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'edurancehub@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD
  }
});
```

## Running the Application

1. Make sure the backend server is running:
   ```bash
   cd c:\Users\dhira\Downloads\tools\project
   node server.js
   ```

2. Start the frontend application in another terminal:
   ```bash
   npm run dev
   ```

## Testing

1. Open your browser and navigate to the contact page
2. Fill out the form with test data
3. Submit the form
4. Check the server console for success messages
5. Check edurancehub@gmail.com for the received message

## Troubleshooting

If you're still getting the "Email service not properly configured" error:

1. Verify the App Password is correct
2. Ensure 2-Factor Authentication is enabled on the Gmail account
3. Check that the server is running on port 3001
4. Make sure there are no firewall issues blocking the connection
5. Check the server console for any error messages

## Common Issues and Solutions

### 1. "Invalid login: 535-5.7.8 Username and Password not accepted"

This error occurs when:
- The Gmail App Password is incorrect
- 2-Factor Authentication is not enabled
- The App Password was generated for a different app

Solution:
1. Double-check the App Password
2. Generate a new App Password specifically for "Mail"
3. Ensure 2-Factor Authentication is enabled

### 2. "Network error. Please check your connection and ensure the server is running."

This error occurs when:
- The backend server is not running
- The frontend cannot connect to the backend

Solution:
1. Make sure the server is running on port 3001
2. Check that there are no firewall issues
3. Verify that both frontend and backend are running

## Security Notes

- Never commit the App Password to version control
- Use environment variables in production
- Regenerate the App Password if you suspect it has been compromised
- The contact form sends emails to edurancehub@gmail.com while showing info@edurancehub.com as the contact information