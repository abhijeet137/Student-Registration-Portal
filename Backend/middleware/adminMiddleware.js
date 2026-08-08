// ======================================
// Admin + Super Admin Authorization
// ======================================

const adminOnly = (req, res, next) => {

try {


    // Check Login

    if(!req.user){

        return res.status(401).json({

            success:false,

            message:"Please login first."

        });

    }





    // Allow admin and superadmin

    if(
        req.user.role !== "admin" &&
        req.user.role !== "superadmin"
    ){

        return res.status(403).json({

            success:false,

            message:"Access Denied. Admin Only."

        });

    }




    next();



}

catch(error){


    console.log(error);


    return res.status(500).json({

        success:false,

        message:"Internal Server Error."

    });


}


};


module.exports = adminOnly;