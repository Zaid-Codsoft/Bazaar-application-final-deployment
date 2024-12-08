const nodemailer = require('nodemailer'); // Import Nodemailer
require('dotenv').config(); // Load environment variables from .env file

const sendEmail = async (options) => {
    // Create a transporter for Gmail
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Specify the email service (Gmail in this case)
        auth: {
            user: process.env.EMAIL_USERNAME, // Your Gmail address
            pass: process.env.EMAIL_PASSWORD, // Your Gmail app password
        },
    });

    // Define email options
    const mailOptions = {
        from: process.env.EMAIL_USERNAME, // Sender's email address
        to: options.email, // Recipient's email address
        subject: options.subject, // Subject line
        html: options.message, // HTML body
    };

    // Send the email
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = sendEmail;
