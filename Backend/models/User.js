const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(

{
    name: {

        type: String,

        required: true,

        trim: true,

    },


    email: {

        type: String,

        required: true,

        unique: true,

        lowercase: true,

        trim: true,

    },


    password: {

        type: String,

        required: true,

    },


    // ==========================
    // User Roles
    // ==========================

    role: {

        type: String,

        enum: [
            "student",
            "admin",
            "superadmin"
        ],

        default: "student",

    },



    rollNumber: {

        type: String,

        required: true,

        trim: true,

    },


    department: {

        type: String,

        required: true,

        trim: true,

    },


    semester: {

        type: Number,

        default: 1,

    },


    phone: {

        type: String,

        unique: true,

        sparse: true,

        trim: true,

    },


    address: {

        type: String,

        default: "",

    },


},


{
    timestamps:true,
}

);



// ==========================
// Unique Indexes
// ==========================


// Email Unique

userSchema.index(

    { email:1 },

    { unique:true }

);




// Phone Unique

userSchema.index(

    { phone:1 },

    {

        unique:true,

        sparse:true,

    }

);




// Roll Number + Department Unique

userSchema.index(

    {

        department:1,

        rollNumber:1,

    },

    {

        unique:true,

    }

);



module.exports =
mongoose.model(
    "User",
    userSchema
);