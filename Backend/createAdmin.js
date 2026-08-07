const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const User = require("./models/User");

dotenv.config();


mongoose.connect(process.env.MONGO_URI)
.then(async()=>{


    const password =
    await bcrypt.hash("Admin@123",10);


    await User.create({

        name:"Admin",

        email:"admin@gmail.com",

        password,

        role:"admin"

    });


    console.log("Admin Created");

    process.exit();


})
.catch(err=>{

    console.log(err);

});