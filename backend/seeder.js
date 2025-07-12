import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Seeder...');
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

const importUser = async () => {
  try {
    // Check if credentials are set in the .env file
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
        console.error('Please set ADMIN_EMAIL and ADMIN_PASSWORD in your .env file');
        process.exit(1);
    }

    await connectDB();

    // Clear any existing users to ensure we only have one admin
    await User.deleteMany();

    // Create the user object from environment variables
    const adminUser = new User({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    });

    await adminUser.save();

    console.log('Admin User Imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error during user import: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-import') {
  importUser();
}