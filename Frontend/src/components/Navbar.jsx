import {
  FaBars,
  FaBell,
  FaMoon,
  FaSun,
  FaUserCircle
} from "react-icons/fa";

import { useState, useEffect } from "react";

import { motion } from "framer-motion";

import "../styles/navbar.css";



function Navbar({ openSidebar }) {


const user =
JSON.parse(
localStorage.getItem("user")
);



// ==========================
// Dark Mode
// ==========================

const [darkMode,setDarkMode] =
useState(

localStorage.getItem("darkMode") === "true"

);



useEffect(()=>{


if(darkMode){

document.body.classList.add(
"dark-mode"
);

}

else{

document.body.classList.remove(
"dark-mode"
);

}


localStorage.setItem(
"darkMode",
darkMode
);



},[darkMode]);






// ==========================
// Notifications
// ==========================


const [showNotification,setShowNotification] =
useState(false);



const notifications = [

{
id:1,
title:"Welcome",
message:"Welcome to Student Portal"
},


{
id:2,
title:"System Update",
message:"New features added"
},


{
id:3,
title:"Security",
message:"Your account is secure"
}


];





return (


<motion.header

className="navbar-custom"

initial={{y:-60}}

animate={{y:0}}

transition={{duration:0.4}}

>



{/* LEFT */}

<div className="navbar-left">


<button

className="menu-btn"

onClick={openSidebar}

>

<FaBars />

</button>





<div>


<h2 className="navbar-title">

Dashboard

</h2>



<p className="navbar-subtitle">

Welcome back 👋

</p>


</div>



</div>







{/* RIGHT */}


<div className="navbar-right">







{/* Notifications */}



<div className="notification-wrapper">


<button

className="icon-btn"

onClick={()=>setShowNotification(!showNotification)}

>

<FaBell />

</button>





{

showNotification && (


<div className="notification-box">


<h3>

Notifications

</h3>



{

notifications.map((item)=>(


<div

key={item.id}

className="notification-item"


>


<strong>

{item.title}

</strong>


<p>

{item.message}

</p>



</div>


))

}



</div>


)


}



</div>








{/* Dark Mode Button */}



<button

className="icon-btn"

onClick={()=>setDarkMode(!darkMode)}

>


{

darkMode

?

<FaSun />

:

<FaMoon />

}


</button>









{/* Profile */}


<div className="profile-box">


<FaUserCircle

className="profile-icon"

/>




<div>


<div className="profile-name">

{user?.name || "Administrator"}

</div>



<div className="profile-role">

{user?.role || "Admin"}

</div>


</div>



</div>







</div>



</motion.header>


);


}



export default Navbar;