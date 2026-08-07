import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaIdCard,
  FaBuilding,
  FaGraduationCap,
  FaPhone,
  FaMapMarkerAlt,
  FaSave,
  FaArrowLeft,
} from "react-icons/fa";

import { toast } from "react-toastify";

import Layout from "../components/Layout";
import API from "../services/api";

import "../styles/editStudent.css";


function EditStudent(){

  const { id } = useParams();

  const navigate = useNavigate();


  const [loading,setLoading] =
    useState(true);


  const [updating,setUpdating] =
    useState(false);



  const [student,setStudent] =
    useState({

      name:"",
      email:"",
      rollNumber:"",
      department:"",
      semester:"",
      phone:"",
      address:"",

    });



  useEffect(()=>{

    fetchStudent();

  },[]);



  const fetchStudent = async()=>{

    try{

      const response =
        await API.get(
          `/admin/students/${id}`
        );


      if(response.data.success){

        setStudent(
          response.data.student
        );

      }


    }

    catch(error){

      console.log(error);


      toast.error(

        error.response?.data?.message ||

        "Failed to load student"

      );


    }

    finally{

      setLoading(false);

    }

  };



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


      setUpdating(true);
            const response =
        await API.put(
          `/admin/students/${id}`,
          {
            name: student.name,
            email: student.email,
            department: student.department,
            semester: student.semester,
            phone: student.phone,
            address: student.address,
          }
        );


      toast.success(
        response.data.message ||
        "Student Updated Successfully"
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

        "Failed to update student"

      );


    }

    finally{

      setUpdating(false);

    }

  };



  if(loading){

    return(

      <Layout>

        <div className="dashboard-loading">

          <div className="loader"></div>

          <h3>
            Loading Student...
          </h3>

        </div>

      </Layout>

    );

  }



  return(

    <Layout>


      <div className="edit-page">



        {/* Header */}


        <div className="edit-header">


          <div>

            <h1>
              Edit Student
            </h1>


            <p>
              Update student information
              and save changes.
            </p>

          </div>



          <button

            className="back-btn"

            onClick={()=>navigate(
              "/admin/students"
            )}

          >

            <FaArrowLeft />

            Back

          </button>


        </div>




        {/* Form Card */}


        <div className="edit-card">


          <form onSubmit={handleSubmit}>


            <div className="edit-grid">



              {/* Name */}

              <div className="edit-input-group">

                <label>
                  Full Name
                </label>


                <div className="edit-input">


                  <FaUser />


                  <input

                    type="text"

                    name="name"

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


              <div className="edit-input-group">


                <label>
                  Email
                </label>


                <div className="edit-input">


                  <FaEnvelope />


                  <input

                    type="email"

                    name="email"

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





              {/* Roll Number */}


              <div className="edit-input-group">


                <label>
                  Roll Number
                </label>


                <div className="edit-input readonly">


                  <FaIdCard />


                  <input

                    type="text"

                    value={
                      student.rollNumber
                    }

                    disabled

                  />


                </div>


              </div>





              {/* Department */}


              <div className="edit-input-group">


                <label>
                  Department
                </label>


                <div className="edit-input">


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

              <div className="edit-input-group">

                <label>
                  Semester
                </label>


                <div className="edit-input">


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


                    {[1,2,3,4,5,6,7,8].map(
                      (sem)=>(

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


              <div className="edit-input-group">


                <label>
                  Phone Number
                </label>


                <div className="edit-input">


                  <FaPhone />


                  <input

                    type="tel"

                    name="phone"

                    value={
                      student.phone
                    }

                    onChange={
                      handleChange
                    }

                    maxLength={10}

                    inputMode="numeric"

                    placeholder="Enter phone number"

                  />


                </div>


              </div>





              {/* Address */}


              <div className="edit-input-group full-width">


                <label>
                  Address
                </label>


                <div className="edit-input">


                  <FaMapMarkerAlt />


                  <textarea

                    name="address"

                    rows="3"

                    value={
                      student.address
                    }

                    onChange={
                      handleChange
                    }

                    placeholder="Enter address"

                  />


                </div>


              </div>



            </div>





            {/* Buttons */}


            <div className="edit-actions">


              <button

                type="submit"

                className="update-btn"

                disabled={updating}

              >


                <FaSave />


                {

                  updating

                  ? "Updating..."

                  : "Save Changes"

                }


              </button>




              <button

                type="button"

                className="cancel-edit-btn"

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


export default EditStudent;