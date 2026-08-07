const User = require("../models/User");



// ======================================
// Admin Dashboard Statistics
// ======================================

const getDashboardStats = async (req, res) => {

    try {


        const totalStudents =
            await User.countDocuments({

                role:"student"

            });



        const totalAdmins =
            await User.countDocuments({

                role:"admin"

            });





        const totalSuperAdmins =
            await User.countDocuments({

                role:"superadmin"

            });





        const departmentStats =
            await User.aggregate([

                {
                    $match:{
                        role:"student"
                    }
                },


                {
                    $group:{

                        _id:"$department",

                        count:{
                            $sum:1
                        }

                    }

                },


                {
                    $project:{

                        _id:0,

                        department:"$_id",

                        count:1

                    }

                },


                {
                    $sort:{

                        count:-1

                    }

                }


            ]);







        const latestStudents =
            await User.find({

                role:"student"

            })

            .select(
                "name rollNumber department semester createdAt"
            )

            .sort({

                createdAt:-1

            })

            .limit(5);







        res.status(200).json({

            success:true,


            stats:{

                totalStudents,

                totalAdmins,

                totalSuperAdmins,

                departments:
                departmentStats.length,

                semesters:8

            },


            departmentStats,


            latestStudents


        });



    }

    catch(error){


        console.error(error);



        res.status(500).json({

            success:false,

            message:error.message

        });


    }

};







// ======================================
// Get All Users
// SUPER ADMIN ONLY
// ======================================


const getAllUsers = async(req,res)=>{


    try{


        const users =
            await User.find()

            .select("-password")

            .sort({

                createdAt:-1

            });





        res.status(200).json({

            success:true,

            users

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
// Make Admin
// SUPER ADMIN ONLY
// ======================================


const makeAdmin = async(req,res)=>{


    try{


        const user =
            await User.findById(
                req.params.id
            );





        if(!user){


            return res.status(404).json({

                success:false,

                message:"User not found"

            });


        }






        // Prevent changing superadmin

        if(user.role === "superadmin"){


            return res.status(400).json({

                success:false,

                message:
                "Super Admin cannot be changed"

            });


        }






        user.role = "admin";


        await user.save();






        res.status(200).json({

            success:true,

            message:
            "User promoted to Admin successfully"

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
// Remove Admin
// SUPER ADMIN ONLY
// ======================================


const removeAdmin = async(req,res)=>{


    try{


        const user =
            await User.findById(
                req.params.id
            );





        if(!user){


            return res.status(404).json({

                success:false,

                message:
                "User not found"

            });


        }






        // Cannot remove superadmin

        if(user.role === "superadmin"){


            return res.status(400).json({

                success:false,

                message:
                "Super Admin cannot be removed"

            });


        }







        user.role = "student";


        await user.save();







        res.status(200).json({

            success:true,

            message:
            "Admin access removed successfully"

        });



    }

    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};







module.exports = {


    getDashboardStats,


    getAllUsers,


    makeAdmin,


    removeAdmin,


};