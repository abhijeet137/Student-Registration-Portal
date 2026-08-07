import {
  FaHome,
  FaUserGraduate,
  FaUser,
  FaUserEdit,
  FaKey,
  FaInfoCircle,
  FaSignOutAlt,
  FaPlus,
  FaGraduationCap,
  FaUserShield,
} from "react-icons/fa";


import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";

import "../styles/sidebar.css";



function Sidebar({ isOpen, closeSidebar }) {


  const navigate = useNavigate();

  const location = useLocation();



  const user =
    JSON.parse(
      localStorage.getItem("user")
    );





  const goTo = (path) => {

    navigate(path);


    if(closeSidebar){

      closeSidebar();

    }

  };







  const logout = async()=>{


    try{

      await API.post("/auth/logout");


    }

    catch(error){

      console.log(error);

    }



    localStorage.removeItem("user");

    localStorage.removeItem("token");



    navigate("/",{

      replace:true

    });


    window.location.reload();


  };







  // ==========================
  // Admin Menu
  // ==========================


  const adminMenu = [


    {

      title:"Dashboard",

      icon:<FaHome />,

      path:"/admin/dashboard",

    },


    {

      title:"Students",

      icon:<FaUserGraduate />,

      path:"/admin/students",

    },


    {

      title:"Add Student",

      icon:<FaPlus />,

      path:"/admin/add-student",

    },


  ];







  // ==========================
  // Super Admin Extra Menu
  // ==========================


  const superAdminMenu = [


    ...adminMenu,


    {

      title:"Manage Admins",

      icon:<FaUserShield />,

      path:"/admin/manage-admins",

    }


  ];







  // ==========================
  // Student Menu
  // ==========================


  const studentMenu = [


    {

      title:"Dashboard",

      icon:<FaHome />,

      path:"/student/dashboard",

    },


    {

      title:"My Profile",

      icon:<FaUser />,

      path:"/student/profile",

    },


    {

      title:"Edit Profile",

      icon:<FaUserEdit />,

      path:"/student/edit-profile",

    },


    {

      title:"Change Password",

      icon:<FaKey />,

      path:"/student/change-password",

    },


    {

      title:"About",

      icon:<FaInfoCircle />,

      path:"/student/about",

    },


  ];








  let menu = studentMenu;



  if(user?.role === "admin"){

    menu = adminMenu;

  }



  if(user?.role === "superadmin"){

    menu = superAdminMenu;

  }









  return (

    <motion.aside

      className={`sidebar ${isOpen ? "show" : ""}`}

      initial={{x:-100}}

      animate={{x:0}}

      transition={{duration:0.35}}

    >



      <div>


        <div className="sidebar-logo">


          <div className="logo-icon">

            <FaGraduationCap />

          </div>



          <div>


            <div className="logo-title">

              EduPortal

            </div>


            <div className="logo-subtitle">

              Student Management

            </div>


          </div>


        </div>






        <div className="sidebar-menu">


          {menu.map((item)=>(


            <button

              key={item.path}

              onClick={()=>goTo(item.path)}

              className={`menu-item ${
                
                location.pathname === item.path

                ? "active"

                : ""

              }`}

            >


              <span className="menu-icon">

                {item.icon}

              </span>


              {item.title}


            </button>


          ))}


        </div>


      </div>







      <div className="sidebar-footer">


        <div className="user-card">


          <div className="user-avatar">


            {
              user?.name
              ?.charAt(0)
              ?.toUpperCase()
            }


          </div>




          <div>


            <div className="user-name">

              {user?.name}

            </div>



            <div className="user-role">

              {user?.role}

            </div>


          </div>


        </div>





        <button

          className="logout-btn"

          onClick={logout}

        >

          <FaSignOutAlt />

          &nbsp; Logout


        </button>




      </div>



    </motion.aside>

  );

}



export default Sidebar;