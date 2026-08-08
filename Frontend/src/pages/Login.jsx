import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaGraduationCap,
  FaSignInAlt,
} from "react-icons/fa";

import { toast } from "react-toastify";

import API from "../services/api";

import "../styles/auth.css";



function Login() {


  const navigate = useNavigate();


  const [loading, setLoading] = useState(false);



  const [formData, setFormData] = useState({

    email: "",

    password: "",

  });





  const handleChange = (e) => {


    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });


  };






  const handleSubmit = async (e) => {


    e.preventDefault();



    try {


      setLoading(true);




      const response = await API.post(

        "/auth/login",

        formData

      );





      // Save token

      localStorage.setItem(

        "token",

        response.data.token

      );






      // Save user

      localStorage.setItem(

        "user",

        JSON.stringify(response.data.user)

      );







      const role = response.data.user.role;



      console.log(
        "LOGIN ROLE FROM API:",
        role
      );






      toast.success(

        "Login Successful!"

      );







      // ==========================
      // ROLE BASED REDIRECT
      // ==========================


      if (

        role === "superadmin" ||

        role === "admin"

      ) {


        console.log(
          "ADMIN LOGIN"
        );


        navigate(
          "/admin/dashboard",
          {
            replace:true
          }
        );


      }





      else if (

        role === "student"

      ) {



        console.log(
          "STUDENT LOGIN"
        );



        navigate(

          "/student/dashboard",

          {
            replace:true
          }

        );


      }





      else {


        console.log(
          "UNKNOWN ROLE:",
          role
        );



        toast.error(

          "Invalid User Role"

        );



        localStorage.removeItem(
          "token"
        );


        localStorage.removeItem(
          "user"
        );



      }







    }

    catch(error){


      console.log(error);



      toast.error(

        error.response?.data?.message ||

        "Login Failed"

      );


    }



    finally{


      setLoading(false);


    }



  };








  return (


    <div className="auth-page">


      <div className="auth-card">





        <div className="auth-logo">


          <div className="logo-circle">


            <FaGraduationCap />


          </div>




          <h1>

            Student Portal

          </h1>




          <p>

            Welcome back! Login to continue.

          </p>



        </div>







        <form onSubmit={handleSubmit}>






          <div className="auth-input-group">


            <label>

              Email Address

            </label>




            <div className="auth-input">


              <FaEnvelope />



              <input


                type="email"


                name="email"


                placeholder="Enter email"


                value={formData.email}


                onChange={handleChange}


                required


              />



            </div>



          </div>









          <div className="auth-input-group">


            <label>

              Password

            </label>





            <div className="auth-input">


              <FaLock />



              <input


                type="password"


                name="password"


                placeholder="Enter password"


                value={formData.password}


                onChange={handleChange}


                required


              />



            </div>



          </div>









          <button


            type="submit"


            className="auth-btn"


            disabled={loading}



          >



            <FaSignInAlt />



            {

              loading

              ?

              "Logging in..."

              :

              "Login"

            }



          </button>






        </form>





      </div>





    </div>


  );


}



export default Login;