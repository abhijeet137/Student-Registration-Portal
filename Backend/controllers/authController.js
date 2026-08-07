const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateRollNumber = require("../utils/generateRollNumber");



// ======================================
// Register User
// ======================================

const registerUser = async (req, res) => {

  try {


    let {
      name,
      email,
      password,
      department,
      semester,
      phone,
      address,
    } = req.body;



    name = name.trim();

    email = email.trim().toLowerCase();

    department = department.trim();

    phone = phone ? phone.trim() : "";

    address = address ? address.trim() : "";




    // Name Validation

    if (!/^[A-Za-z\s'-]+$/.test(name)) {

      return res.status(400).json({

        success:false,

        message:
        "Name can contain only letters, spaces, apostrophes and hyphens."

      });

    }




    // Phone Validation

    if (
      phone &&
      !/^[6-9]\d{9}$/.test(phone)
    ) {

      return res.status(400).json({

        success:false,

        message:
        "Phone Number must be a valid 10-digit Indian mobile number."

      });

    }




    // Email Check

    const emailExists =
      await User.findOne({
        email
      });



    if(emailExists){

      return res.status(400).json({

        success:false,

        message:"Email already exists."

      });

    }




    // Phone Check

    if(phone){

      const phoneExists =
        await User.findOne({
          phone
        });



      if(phoneExists){

        return res.status(400).json({

          success:false,

          message:"Phone Number already exists."

        });

      }

    }




    const rollNumber =
      await generateRollNumber(
        department
      );



    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );




    const user =
      await User.create({

        name,

        email,

        password:hashedPassword,

        role:"student",

        rollNumber,

        department,

        semester,

        phone,

        address,

      });





    res.status(201).json({

      success:true,

      message:
      "User Registered Successfully",

      user:{

        id:user._id,

        name:user.name,

        email:user.email,

        role:user.role,

        rollNumber:user.rollNumber,

        department:user.department,

        semester:user.semester,

      }

    });



  }

  catch(error){


    console.log(error);



    return res.status(500).json({

      success:false,

      message:error.message

    });


  }

};









// ======================================
// Login User
// ======================================


const loginUser = async (req,res)=>{


  try{


    const {
      email,
      password
    } = req.body;




    const user =
      await User.findOne({

        email:
        email.trim().toLowerCase()

      });





    if(!user){

      return res.status(400).json({

        success:false,

        message:
        "Invalid Email or Password"

      });

    }





    const isMatch =
      await bcrypt.compare(

        password,

        user.password

      );





    if(!isMatch){


      return res.status(400).json({

        success:false,

        message:
        "Invalid Email or Password"

      });


    }






    // Generate Token


    const token =
      jwt.sign(

        {

          id:user._id,

          email:user.email,

          role:user.role,

        },


        process.env.JWT_SECRET,


        {

          expiresIn:"7d"

        }


      );







    // Cookie for browser sessions


    res.cookie(

      "token",

      token,

      {

        httpOnly:true,

        secure:false,

        sameSite:"lax",

        maxAge:
        7 * 24 * 60 * 60 * 1000

      }

    );








    // Send Token + User

    res.status(200).json({

      success:true,

      message:
      "Login Successful",



      token:token,



      user:{


        id:user._id,

        name:user.name,

        email:user.email,

        role:user.role,

        rollNumber:user.rollNumber,

        department:user.department,

        semester:user.semester,


      }


    });





  }

  catch(error){


    console.log(error);



    res.status(500).json({

      success:false,

      message:error.message

    });



  }


};









// ======================================
// Get Current User
// ======================================


const getCurrentUser =
async(req,res)=>{


try{


const user =
await User.findById(

  req.user.id

)
.select("-password");





if(!user){

return res.status(404).json({

success:false,

message:"User not found"

});

}





res.status(200).json({

success:true,

user

});



}

catch(error){


res.status(500).json({

success:false,

message:error.message

});


}



};








// ======================================
// Logout
// ======================================


const logoutUser =
(req,res)=>{


res.clearCookie(

"token",

{

httpOnly:true,

secure:false,

sameSite:"lax"

}

);



res.status(200).json({

success:true,

message:
"Logged out successfully"

});


};







module.exports = {

registerUser,

loginUser,

logoutUser,

getCurrentUser,

};