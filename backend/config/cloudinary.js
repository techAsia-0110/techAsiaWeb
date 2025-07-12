// config/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';

// --- DIAGNOSTIC LOG FOR DEBUGGING ---
// Let's print the values to see what Node.js is actually seeing.
// console.log("--- Reading Cloudinary Config ---");
// console.log("Cloud Name from .env:", process.env.CLOUDINARY_CLOUD_NAME);
// console.log("API Key from .env:", process.env.CLOUDINARY_API_KEY);
// We check for the secret's existence without logging the actual secret for security.
// console.log("API Secret from .env Exists?:", !!process.env.CLOUDINARY_API_SECRET);
// console.log("---------------------------------");


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;