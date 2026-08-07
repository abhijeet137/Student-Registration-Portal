import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import API from "../services/api";


function ProtectedRoute({ children, role }) {


  const [loading, setLoading] =
    useState(true);


  const [authorized, setAuthorized] =
    useState(false);





  useEffect(() => {

    checkUser();

  }, []);







  const checkUser = async () => {


    try {


      const response =
        await API.get("/auth/me");



      const user =
        response.data.user;




      // Save latest user

      localStorage.setItem(

        "user",

        JSON.stringify(user)

      );






      // ==========================
      // Role Checking
      // ==========================


      if(role){



        // Super Admin has admin access

        if(

          role === "admin" &&

          user.role === "superadmin"

        ){

          setAuthorized(true);

        }



        // Exact role match

        else if(

          user.role === role

        ){

          setAuthorized(true);

        }



        else{

          setAuthorized(false);

        }



      }


      else{


        setAuthorized(true);


      }




    }


    catch(error){


      console.log(error);



      localStorage.removeItem("user");

      localStorage.removeItem("token");



      setAuthorized(false);


    }


    finally{


      setLoading(false);


    }


  };








  if(loading){


    return (

      <div

        className="d-flex justify-content-center align-items-center"

        style={{

          height:"100vh"

        }}

      >

        <h4>

          Loading...

        </h4>


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