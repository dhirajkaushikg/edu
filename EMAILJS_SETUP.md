# EmailJS Setup Guide

Follow these steps to configure EmailJS for the contact form to send emails to edurancehub@gmail.com:

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" or "Sign In" if you already have an account
3. Verify your email address

## Step 2: Set Up an Email Service

1. After logging in, go to the "Email Services" tab
2. Click "Add New Service"
3. Choose "Gmail" as your email provider
4. Connect your Gmail account (use edurancehub@gmail.com)
5. Give your service a name (e.g., "Edurance Hub Contact Service")
6. Click "Create Service"
7. Note the Service ID (you'll need this later)

## Step 3: Create an Email Template

1. Go to the "Email Templates" tab
2. Click "Create new template"
3. Design your email template with the following variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{subject}}` - Email subject
   - `{{message}}` - Message content
4. Set the "To email" field to `edurancehub@gmail.com`
5. Set the "From name" to `{{from_name}}`
6. Set the "From email" to `{{from_email}}`
7. Set the "Subject" to `{{subject}}`
8. In the email body, include the message content:
   ```
   You have received a new message from your website contact form.
   
   From: {{from_name}} ({{from_email}})
   Subject: {{subject}}
   
   Message:
   {{message}}
   ```
9. Save your template and note the Template ID (you'll need this later)

## Step 4: Get Your Credentials

1. Go to the "Account" tab
2. Find your "User ID" (this is your Public Key)
3. Note your Service ID from the service you created in Step 2
4. Note your Template ID from the template you created in Step 3

## Step 5: Update the Contact Form Code

In `src/pages/Contact.tsx`, replace the placeholder values with your actual EmailJS credentials:

```javascript
// Replace these with your actual EmailJS credentials
const serviceId = 'YOUR_SERVICE_ID'; // Your actual Service ID
const templateId = 'YOUR_TEMPLATE_ID'; // Your actual Template ID
const publicKey = 'YOUR_PUBLIC_KEY'; // Your actual Public Key
```

For example:
```javascript
const serviceId = 'service_xxxxxxxxxxxxxxxx';
const templateId = 'template_xxxxxxxxxxxxxxxx';
const publicKey = 'user_xxxxxxxxxxxxxxxx';
```

## Step 6: Test the Contact Form

1. Save all changes
2. Run your application
3. Navigate to the Contact page
4. Fill out the form and submit
5. Check if edurancehub@gmail.com receives the email

## Troubleshooting Common Issues

### 400 Error (Bad Request)
This error typically occurs when:

1. **Incorrect Service ID, Template ID, or Public Key**
   - Double-check that you've replaced all placeholder values with your actual credentials
   - Make sure there are no extra spaces or characters in your IDs

2. **Template Variables Mismatch**
   - Ensure all variables used in your template (`{{from_name}}`, `{{from_email}}`, etc.) are being sent from your code
   - Check that variable names match exactly between your template and code

3. **Service Not Connected Properly**
   - Go to your Email Service and verify it's connected to your Gmail account
   - Try reconnecting your Gmail account if needed

### CORS or Network Errors
- Ensure you're using the correct public key (User ID)
- Check that your service is properly configured and active

### Email Not Received
- Check your spam/junk folder
- Verify that your Gmail account can send emails
- Make sure the "To email" in your template is set to `edurancehub@gmail.com`

## Advanced Troubleshooting

If you're still experiencing issues:

1. Open your browser's Developer Tools (F12)
2. Go to the Network tab
3. Submit the form again
4. Look for requests to emailjs.com
5. Check the response for specific error messages

Common specific errors:
- "Bad Request" - Usually means incorrect IDs or template variables
- "Unauthorized" - Usually means incorrect Public Key
- "Forbidden" - Usually means the service isn't properly connected

## Security Notes

- The Public Key is safe to use in client-side code
- Never expose your Private Key
- EmailJS handles the email sending securely
- All communication with EmailJS is over HTTPS

## Alternative: Using a Different Email Service

If you prefer to use a different email provider:
1. In Step 2, choose a different service (e.g., Outlook, Yahoo, etc.)
2. Follow the connection instructions for that provider
3. The rest of the setup remains the same