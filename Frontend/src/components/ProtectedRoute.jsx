import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import API from "../services/api";


function ProtectedRoute({ children, role }) {

  const [loading, setLoading] = useState(true);

  const [authorized, setAuthorized] = useState(false);



  useEffect(() => {

    checkUser();

  }, []);




  const checkUser = async () => {

    try {


      const response = await API.get("/auth/me");


      const user = response.data.user;


      console.log("AUTH USER:", user);
      console.log("AUTH ROLE:", user.role);



      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );



      // No role restriction

      if (!role) {

        setAuthorized(true);

        return;

      }




      // Multiple roles

      if (Array.isArray(role)) {


        if (role.includes(user.role)) {

          setAuthorized(true);

        }

        else {

          setAuthorized(false);

        }


      }


      // Single role

      else {


        if (user.role === role) {

          setAuthorized(true);

        }

        else {

          setAuthorized(false);

        }


      }



    }

    catch(error) {


      console.log(error);


      localStorage.removeItem("token");

      localStorage.removeItem("user");


      setAuthorized(false);


    }


    finally {


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

        Loading...

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