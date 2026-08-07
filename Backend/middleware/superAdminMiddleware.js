// ======================================
// Super Admin Only Middleware
// ======================================

const superAdminOnly = (req, res, next) => {

    try {


        // Check if user exists

        if (!req.user) {

            return res.status(401).json({

                success:false,

                message:
                "Authentication required."

            });

        }





        // Only superadmin allowed

        if (req.user.role !== "superadmin") {


            return res.status(403).json({

                success:false,

                message:
                "Access denied. Only Super Admin can perform this action."

            });


        }





        next();



    }

    catch(error){


        return res.status(500).json({

            success:false,

            message:
            error.message

        });


    }

};



module.exports = superAdminOnly;