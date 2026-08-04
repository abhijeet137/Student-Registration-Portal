require("dotenv").config();

const mongoose = require("mongoose");

const User = require("./models/User");

// ==============================
// Connect Database
// ==============================

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected");

  } catch (error) {

    console.log(error);

    process.exit(1);

  }
};

// ==============================
// Delete Only Students
// ==============================

const deleteStudents = async () => {
  try {

    await connectDB();

    const result = await User.deleteMany({
      role: "student",
    });

    console.log("\n==============================");
    console.log(`✅ ${result.deletedCount} Students Deleted`);
    console.log("Admin accounts are safe.");
    console.log("==============================");

    process.exit();

  } catch (error) {

    console.log(error);

    process.exit();

  }
};

deleteStudents();