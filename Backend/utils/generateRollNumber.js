const User = require("../models/User");

const departmentCodes = {
  "Computer Science": "CS",
  "Information Technology": "IT",
  Electronics: "EC",
  Mechanical: "ME",
  Civil: "CE",
};

const generateRollNumber = async (department) => {
  const year = new Date().getFullYear().toString().slice(-2);

  const deptCode = departmentCodes[department];

  if (!deptCode) {
    throw new Error("Invalid Department");
  }

  const regex = new RegExp(`^${year}${deptCode}`);

  const lastStudent = await User.findOne({
    rollNumber: regex,
  }).sort({ rollNumber: -1 });

  let nextNumber = 1;

  if (lastStudent) {
    const lastThreeDigits = parseInt(
      lastStudent.rollNumber.slice(-3)
    );

    nextNumber = lastThreeDigits + 1;
  }

  return `${year}${deptCode}${String(nextNumber).padStart(3, "0")}`;
};

module.exports = generateRollNumber;