require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");

const User = require("./models/User");

// Connect MongoDB

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};


// Departments


const departments = [
  "Computer Science",
  "Information Technology",
  "Electronics",
  "Mechanical",
  "Civil",
  "Electrical",
];


// Generate Students


const generateStudents = async () => {
  try {
    await connectDB();

    console.log("Generating Students...\n");

    const password = await bcrypt.hash("student123", 10);

    let students = [];

    for (let i = 1; i <= 1000; i++) {
      students.push({
        name: faker.person.fullName(),

        email: `student${i}@gmail.com`,

        password,

        role: "student",

        rollNumber: `CSE${1000 + i}`,

        department:
          departments[
            Math.floor(Math.random() * departments.length)
          ],

        semester: Math.floor(Math.random() * 8) + 1,

        phone: faker.phone.number("98########"),

        address: faker.location.streetAddress(),
      });
    }

    await User.insertMany(students, {
      ordered: false,
    });

    console.log("\n==============================");
    console.log("✅ 1000 Students Added");
    console.log("==============================");

    process.exit();

  } catch (error) {

    console.log(error);

    process.exit();

  }
};

generateStudents();