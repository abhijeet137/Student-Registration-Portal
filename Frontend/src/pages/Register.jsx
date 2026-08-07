import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaBuilding,
  FaGraduationCap,
  FaPhone,
  FaMapMarkerAlt,
  FaUserPlus,
} from "react-icons/fa";

import { toast } from "react-toastify";

import API from "../services/api";

import "../styles/auth.css";


function Register(){

  const navigate = useNavigate();


  const [loading,setLoading] =
    useState(false);



  const [formData,setFormData] =
    useState({

      name:"",
      email:"",
      password:"",
      confirmPassword:"",
      department:"",
      semester:"",
      phone:"",
      address:"",

    });




  const handleChange=(e)=>{

    let {
      name,
      value
    } = e.target;



    if(name==="name"){

      value=value.replace(
        /[^A-Za-z\s'-]/g,
        ""
      );

    }



    if(name==="phone"){

      value=value.replace(
        /\D/g,
        ""
      );

      value=value.slice(
        0,
        10
      );

    }



    setFormData({

      ...formData,

      [name]:value,

    });


  };




  const handleSubmit=async(e)=>{

    e.preventDefault();



    if(
      formData.password !==
      formData.confirmPassword
    ){

      toast.error(
        "Passwords do not match!"
      );

      return;

    }



    if(
      !/^[A-Za-z\s'-]+$/.test(
        formData.name
      )
    ){

      toast.error(
        "Invalid name format"
      );

      return;

    }



    if(
      formData.phone &&
      !/^[6-9]\d{9}$/.test(
        formData.phone
      )
    ){

      toast.error(
        "Enter valid phone number"
      );

      return;

    }



    try{

      setLoading(true);
            const response =
        await API.post(
          "/auth/register",
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            department: formData.department,
            semester: formData.semester,
            phone: formData.phone,
            address: formData.address,
          }
        );


      toast.success(

        response.data.message ||

        "Registration Successful!"

      );


      setTimeout(()=>{

        navigate("/login");

      },1500);



    }

    catch(error){


      console.log(error);



      toast.error(

        error.response?.data?.message ||

        "Registration Failed"

      );


    }

    finally{

      setLoading(false);

    }


  };




  return (

    <div className="auth-page">


      <div className="auth-card register-card">



        {/* Logo */}


        <div className="auth-logo">


          <div className="logo-circle">


            <FaUserPlus />


          </div>


          <h1>

            Student Registration

          </h1>


          <p>

            Create your student portal account.

          </p>


        </div>





        <form onSubmit={handleSubmit}>



          <div className="register-grid">



            {/* Name */}


            <div className="auth-input-group">


              <label>
                Full Name
              </label>


              <div className="auth-input">


                <FaUser />


                <input

                  type="text"

                  name="name"

                  placeholder="Enter full name"

                  value={
                    formData.name
                  }

                  onChange={
                    handleChange
                  }

                  required

                />


              </div>


            </div>





            {/* Email */}


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

                  value={
                    formData.email
                  }

                  onChange={
                    handleChange
                  }

                  required

                />


              </div>


            </div>





            {/* Password */}


            <div className="auth-input-group">


              <label>
                Password
              </label>


              <div className="auth-input">


                <FaLock />


                <input

                  type="password"

                  name="password"

                  placeholder="Create password"

                  value={
                    formData.password
                  }

                  onChange={
                    handleChange
                  }

                  required

                />


              </div>


            </div>





            {/* Confirm Password */}


            <div className="auth-input-group">


              <label>
                Confirm Password
              </label>


              <div className="auth-input">


                <FaLock />


                <input

                  type="password"

                  name="confirmPassword"

                  placeholder="Confirm password"

                  value={
                    formData.confirmPassword
                  }

                  onChange={
                    handleChange
                  }

                  required

                />


              </div>


            </div>
                        {/* Department */}

            <div className="auth-input-group">


              <label>
                Department
              </label>


              <div className="auth-input">


                <FaBuilding />


                <select

                  name="department"

                  value={
                    formData.department
                  }

                  onChange={
                    handleChange
                  }

                  required

                >

                  <option value="">
                    Select Department
                  </option>


                  <option value="Computer Science">
                    Computer Science
                  </option>


                  <option value="Information Technology">
                    Information Technology
                  </option>


                  <option value="Electronics">
                    Electronics
                  </option>


                  <option value="Mechanical">
                    Mechanical
                  </option>


                  <option value="Civil">
                    Civil
                  </option>


                </select>


              </div>


            </div>





            {/* Semester */}


            <div className="auth-input-group">


              <label>
                Semester
              </label>


              <div className="auth-input">


                <FaGraduationCap />


                <select

                  name="semester"

                  value={
                    formData.semester
                  }

                  onChange={
                    handleChange
                  }

                  required

                >

                  <option value="">
                    Select Semester
                  </option>


                  {[1,2,3,4,5,6,7,8]
                  .map((sem)=>(

                    <option
                      key={sem}
                      value={sem}
                    >

                      Semester {sem}

                    </option>

                  ))}


                </select>


              </div>


            </div>





            {/* Phone */}


            <div className="auth-input-group">


              <label>
                Phone Number
              </label>


              <div className="auth-input">


                <FaPhone />


                <input

                  type="tel"

                  name="phone"

                  placeholder="Enter phone number"

                  value={
                    formData.phone
                  }

                  onChange={
                    handleChange
                  }

                  maxLength={10}

                  inputMode="numeric"

                />


              </div>


            </div>





            {/* Address */}


            <div className="auth-input-group full-auth-width">


              <label>
                Address
              </label>


              <div className="auth-input">


                <FaMapMarkerAlt />


                <textarea

                  rows="3"

                  name="address"

                  placeholder="Enter address"

                  value={
                    formData.address
                  }

                  onChange={
                    handleChange
                  }

                />


              </div>


            </div>


          </div>





          {/* Register Button */}


          <button

            type="submit"

            className="auth-btn"

            disabled={loading}

          >


            <FaUserPlus />


            {

              loading

              ? "Registering..."

              : "Create Account"

            }


          </button>





        </form>





        <div className="auth-footer">


          Already have an account?


          <Link to="/login">

            {" "}Login

          </Link>


        </div>




      </div>


    </div>


  );


}


export default Register;