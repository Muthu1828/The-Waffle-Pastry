const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      family: 4
    });
    
    // Check if admin already exists
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
      console.log('Admin already exists:', adminExists.email);
      process.exit();
    }

    // Create Admin
    const admin = await User.create({
      name: 'Admin Saravana',
      email: 'admin@thewafflepastry.com',
      password: 'adminpassword123',
      role: 'admin'
    });

    console.log('Admin created successfully!');
    console.log('Email: admin@thewafflepastry.com');
    console.log('Password: adminpassword123');
    process.exit();
  } catch (error) {
    console.error('Error seeding admin:', error.message);
    process.exit(1);
  }
};

seedAdmin();
