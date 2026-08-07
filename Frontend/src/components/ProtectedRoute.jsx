import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import API from "../services/api";



function ProtectedRoute({children, role}){


const [loading,setLoading] =
useState(true);


const [authorized,setAuthorized] =
useState(false);




useEffect(()=>{

checkUser();

},[]);





const checkUser = async()=>{


try{


const response =
await API.get("/auth/me");



const user =
response.data.user;



localStorage.setItem(

"user",

JSON.stringify(user)

);





// Role checking

if(role){


if(Array.isArray(role)){


if(role.includes(user.role)){


setAuthorized(true);


}

else{


setAuthorized(false);


}


}


else{


if(user.role === role){


setAuthorized(true);


}

else{


setAuthorized(false);


}


}


}

else{


setAuthorized(true);


}





}


catch(error){


console.log(error);



localStorage.removeItem("token");

localStorage.removeItem("user");


setAuthorized(false);


}



finally{


setLoading(false);


}



};






if(loading){


return (

<div

style={{

height:"100vh",

display:"flex",

justifyContent:"center",

alignItems:"center"

}}

>


<h3>

Loading...

</h3>


</div>

);


}





if(!authorized){


return (

<Navigate

to="/login"

replace

/>

);


}





return children;


}


export default ProtectedRoute;