const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("Node Version:", process.version);
        console.log("Mongoose Version:", mongoose.version);
        console.log("URI:", process.env.MONGODB_URI);

        await mongoose.connect(process.env.MONGODB_URI);

        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("FULL ERROR:");
        console.error(err);
    }
};

module.exports = connectDB;