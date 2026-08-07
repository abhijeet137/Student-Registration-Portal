const express = require("express");

const router = express.Router();


// Middleware

const protect =
require("../middleware/authMiddleware");

const adminOnly =
require("../middleware/adminMiddleware");

const superAdminOnly =
require("../middleware/superAdminMiddleware");



// Controllers

const {

    getDashboardStats,

} = require("../controllers/adminController");



const {

    getAllStudents,

    getStudentById,

    createStudent,

    updateStudent,

    deleteStudent,

} = require("../controllers/studentController");



// Super Admin Controllers

const {

    getAllUsers,

    makeAdmin,

    removeAdmin,

} = require("../controllers/adminController");





// ======================================
// Admin Dashboard
// Admin + Super Admin
// ======================================


router.get(

    "/dashboard",

    protect,

    adminOnly,

    getDashboardStats

);







// ======================================
// Student Management
// Admin + Super Admin
// ======================================



router.get(

    "/students",

    protect,

    adminOnly,

    getAllStudents

);



router.get(

    "/students/:id",

    protect,

    adminOnly,

    getStudentById

);



router.post(

    "/students",

    protect,

    adminOnly,

    createStudent

);



router.put(

    "/students/:id",

    protect,

    adminOnly,

    updateStudent

);



router.delete(

    "/students/:id",

    protect,

    adminOnly,

    deleteStudent

);








// ======================================
// SUPER ADMIN ONLY
// Admin Management
// ======================================



// View all users

router.get(

    "/users",

    protect,

    superAdminOnly,

    getAllUsers

);




// Make Admin

router.put(

    "/make-admin/:id",

    protect,

    superAdminOnly,

    makeAdmin

);




// Remove Admin

router.put(

    "/remove-admin/:id",

    protect,

    superAdminOnly,

    removeAdmin

);





module.exports = router;