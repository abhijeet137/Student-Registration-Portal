require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const seedAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({
      email: "admin@example.com", // <-- Change this
    });

    if (existingAdmin) {
      console.log("⚠️ Admin already exists.");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10); // <-- Change this

    await User.create({
      name: "Administrator",
      email: "admin@example.com", // <-- Change this
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin account created successfully.");

    process.exit();

  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seedAdmin();