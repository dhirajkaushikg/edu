const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Create a transporter object using Gmail SMTP
// Note: You need to generate an App Password for Gmail
// Visit: https://myaccount.google.com/apppasswords
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'edurancehub@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD || 'your_app_password_here' // Use environment variable in production
  }
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('Transporter configuration error:', error);
    console.log('Email service not properly configured. Please check the setup instructions in EMAIL_SETUP.md');
  } else {
    console.log('Server is ready to send emails');
  }
});

// Contact form endpoint
app.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Check if transporter is properly configured
    const verifyResult = await new Promise((resolve) => {
      transporter.verify((error, success) => {
        if (error) {
          console.log('Transporter verification failed:', error);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });

    if (!verifyResult) {
      return res.status(500).json({ 
        success: false, 
        message: 'Email service not properly configured. Please check the setup instructions.' 
      });
    }

    // Email content - sending to edurancehub@gmail.com
    const mailOptions = {
      from: `"${name}" <info@edurancehub.com>`, // Display name with info@edurancehub.com
      to: 'edurancehub@gmail.com', // Actual recipient
      subject: `Contact Form: ${subject}`,
      text: `
        You have received a new message from your website contact form.
        
        From: ${name} (${email})
        Subject: ${subject}
        
        Message:
        ${message}
      `,
      replyTo: email // Reply will go to the user's email
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    
    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    // Check if it's an authentication error
    if (error.code === 'EAUTH') {
      res.status(500).json({ 
        success: false, 
        message: 'Email service not properly configured. Please check the setup instructions.' 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to send message. Please try again later.' 
      });
    }
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`See EMAIL_SETUP.md for email configuration instructions`);
});