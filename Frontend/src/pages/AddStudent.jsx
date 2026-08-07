import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaBuilding,
  FaPhone,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaPlus,
  FaArrowLeft,
} from "react-icons/fa";

import { toast } from "react-toastify";

import Layout from "../components/Layout";
import API from "../services/api";

import "../styles/form.css";


function AddStudent(){

  const navigate = useNavigate();


  const [loading,setLoading] =
    useState(false);


  const [student,setStudent] =
    useState({

      name:"",
      email:"",
      password:"",
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

      value=value.slice(0,10);

    }


    setStudent({

      ...student,

      [name]:value,

    });

  };



  const handleSubmit=async(e)=>{

    e.preventDefault();



    if(
      !/^[A-Za-z\s'-]+$/.test(
        student.name
      )
    ){

      toast.error(
        "Invalid name format"
      );

      return;

    }



    if(
      student.phone &&
      !/^[6-9]\d{9}$/.test(
        student.phone
      )
    ){

      toast.error(
        "Enter valid 10 digit phone number"
      );

      return;

    }


    try{


      setLoading(true);



      const response =
        await API.post(
          "/admin/students",
          student
        );



      toast.success(
        response.data.message ||
        "Student Added Successfully"
      );



      setTimeout(()=>{

        navigate(
          "/admin/students"
        );

      },1200);



    }

    catch(error){


      console.log(error);


      toast.error(

        error.response?.data?.message ||

        "Failed to add student"

      );


    }

    finally{

      setLoading(false);

    }


  };
    return (

    <Layout>

      <div className="form-page">


        {/* Header */}

        <div className="form-header">


          <div>

            <h1>
              Add New Student
            </h1>

            <p>
              Create a new student account
              in the portal.
            </p>

          </div>



          <button

            className="back-btn"

            onClick={() =>
              navigate("/admin/students")
            }

          >

            <FaArrowLeft />

            Back

          </button>


        </div>




        {/* Form Card */}


        <div className="form-card">


          <form onSubmit={handleSubmit}>


            <div className="form-grid">



              {/* Name */}

              <div className="input-group">

                <label>
                  Full Name
                </label>


                <div className="input-wrapper">

                  <FaUser />

                  <input

                    type="text"

                    name="name"

                    placeholder="Enter full name"

                    value={
                      student.name
                    }

                    onChange={
                      handleChange
                    }

                    required

                  />

                </div>


              </div>





              {/* Email */}


              <div className="input-group">


                <label>
                  Email Address
                </label>


                <div className="input-wrapper">

                  <FaEnvelope />


                  <input

                    type="email"

                    name="email"

                    placeholder="Enter email"

                    value={
                      student.email
                    }

                    onChange={
                      handleChange
                    }

                    required

                  />


                </div>


              </div>





              {/* Password */}


              <div className="input-group">


                <label>
                  Password
                </label>


                <div className="input-wrapper">


                  <FaLock />


                  <input

                    type="password"

                    name="password"

                    placeholder="Create password"

                    value={
                      student.password
                    }

                    onChange={
                      handleChange
                    }

                    required

                  />


                </div>


              </div>





              {/* Department */}


              <div className="input-group">


                <label>
                  Department
                </label>


                <div className="input-wrapper">


                  <FaBuilding />


                  <select

                    name="department"

                    value={
                      student.department
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


              <div className="input-group">


                <label>
                  Semester
                </label>


                <div className="input-wrapper">


                  <FaGraduationCap />


                  <select

                    name="semester"

                    value={
                      student.semester
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

              <div className="input-group">

                <label>
                  Phone Number
                </label>


                <div className="input-wrapper">

                  <FaPhone />

                  <input

                    type="tel"

                    name="phone"

                    placeholder="Enter 10 digit number"

                    value={
                      student.phone
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


              <div className="input-group">


                <label>
                  Address
                </label>


                <div className="input-wrapper">


                  <FaMapMarkerAlt />


                  <input

                    type="text"

                    name="address"

                    placeholder="Enter address"

                    value={
                      student.address
                    }

                    onChange={
                      handleChange
                    }

                  />


                </div>


              </div>



            </div>





            {/* Buttons */}


            <div className="form-actions">


              <button

                type="submit"

                className="submit-btn"

                disabled={loading}

              >


                <FaPlus />


                {

                  loading

                  ? "Adding Student..."

                  : "Add Student"

                }


              </button>





              <button

                type="button"

                className="cancel-btn"

                onClick={() =>
                  navigate(
                    "/admin/students"
                  )
                }

              >

                Cancel

              </button>


            </div>



          </form>


        </div>



      </div>


    </Layout>

  );

}


export default AddStudent;