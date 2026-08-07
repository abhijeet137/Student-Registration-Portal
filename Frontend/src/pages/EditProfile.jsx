import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

import "../styles/editProfile.css";


function EditProfile(){

  const navigate = useNavigate();


  const [loading,setLoading] =
    useState(true);


  const [saving,setSaving] =
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

    fetchProfile();

  },[]);



  const fetchProfile=async()=>{

    try{


      const response =
        await API.get(
          "/student/profile"
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

        "Failed to load profile"

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
    const handleSubmit = async(e)=>{

    e.preventDefault();



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


      setSaving(true);



      const response =
        await API.put(

          "/student/profile",

          {
            phone:
            student.phone,

            address:
            student.address,
          }

        );



      toast.success(

        response.data.message ||

        "Profile Updated Successfully"

      );



      setTimeout(()=>{

        navigate(
          "/student/dashboard"
        );

      },1200);



    }

    catch(error){

      console.log(error);


      toast.error(

        error.response?.data?.message ||

        "Failed to update profile"

      );


    }

    finally{

      setSaving(false);

    }


  };





  if(loading){

    return(

      <Layout>


        <div className="dashboard-loading">


          <div className="loader"></div>


          <h3>
            Loading Profile...
          </h3>


        </div>


      </Layout>

    );

  }




  return(


    <Layout>


      <div className="edit-profile-page">



        {/* Header */}


        <div className="edit-profile-header">


          <div>


            <h1>
              Edit Profile
            </h1>


            <p>
              Update your contact details.
            </p>


          </div>




          <button

            className="profile-back-btn"

            onClick={()=>navigate(
              "/student/dashboard"
            )}

          >

            <FaArrowLeft />

            Back

          </button>


        </div>





        {/* Card */}



        <div className="edit-profile-card">



          <form onSubmit={handleSubmit}>



            <div className="edit-profile-grid">





              {/* Name */}


              <div className="profile-input-group">


                <label>
                  Name
                </label>


                <div className="profile-input disabled">


                  <FaUser />


                  <input

                    type="text"

                    value={
                      student.name
                    }

                    disabled

                  />


                </div>


              </div>





              {/* Email */}


              <div className="profile-input-group">


                <label>
                  Email
                </label>


                <div className="profile-input disabled">


                  <FaEnvelope />


                  <input

                    type="email"

                    value={
                      student.email
                    }

                    disabled

                  />


                </div>


              </div>





              {/* Roll Number */}


              <div className="profile-input-group">


                <label>
                  Roll Number
                </label>


                <div className="profile-input disabled">


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


              <div className="profile-input-group">


                <label>
                  Department
                </label>


                <div className="profile-input disabled">


                  <FaBuilding />


                  <input

                    type="text"

                    value={
                      student.department
                    }

                    disabled

                  />


                </div>


              </div>              {/* Semester */}


              <div className="profile-input-group">


                <label>
                  Semester
                </label>


                <div className="profile-input disabled">


                  <FaGraduationCap />


                  <input

                    type="text"

                    value={
                      `Semester ${student.semester}`
                    }

                    disabled

                  />


                </div>


              </div>





              {/* Phone */}


              <div className="profile-input-group">


                <label>
                  Phone Number
                </label>


                <div className="profile-input">


                  <FaPhone />


                  <input

                    type="tel"

                    name="phone"

                    placeholder="Enter phone number"

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


              <div className="profile-input-group full-profile-input">


                <label>
                  Address
                </label>


                <div className="profile-input">


                  <FaMapMarkerAlt />


                  <textarea

                    rows="3"

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


            <div className="edit-profile-actions">


              <button

                type="submit"

                className="save-profile-btn"

                disabled={saving}

              >


                <FaSave />


                {

                  saving

                  ? "Updating..."

                  : "Save Changes"

                }


              </button>





              <button

                type="button"

                className="cancel-profile-btn"

                onClick={()=>navigate(
                  "/student/dashboard"
                )}

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


export default EditProfile;
