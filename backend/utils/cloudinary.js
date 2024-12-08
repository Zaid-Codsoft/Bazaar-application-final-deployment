const cloudinary = require('cloudinary').v2;  // Import the Cloudinary SDK

// Configure Cloudinary with your credentials from the environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;  // Export the configured Cloudinary instance
