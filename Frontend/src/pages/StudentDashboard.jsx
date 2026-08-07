import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaUserGraduate,
  FaEnvelope,
  FaIdCard,
  FaBuilding,
  FaGraduationCap,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaSignOutAlt,
} from "react-icons/fa";

import { toast } from "react-toastify";

import Layout from "../components/Layout";
import API from "../services/api";

import "../styles/studentDashboard.css";


function StudentDashboard(){

  const navigate = useNavigate();


  const [loading,setLoading] =
    useState(true);



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



  const fetchProfile = async()=>{

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



  const logout=()=>{

    localStorage.clear();


    toast.success(
      "Logged out successfully!"
    );


    setTimeout(()=>{

      navigate("/login");

    },1000);


  };



  if(loading){

    return(

      <Layout>

        <div className="dashboard-loading">

          <div className="loader"></div>

          <h3>
            Loading Dashboard...
          </h3>

        </div>

      </Layout>

    );

  }


  return (

    <Layout>

      <div className="student-dashboard">


        {/* Welcome */}

        <div className="student-welcome">

          <h1>
            Welcome,
            {" "}
            {student.name}
            👋
          </h1>

          <p>
            Manage your profile and
            student information here.
          </p>

        </div>
                {/* Main Content */}

        <div className="student-grid">


          {/* Profile Card */}


          <div className="student-profile-card">


            <div className="profile-image">


              <img

                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  student.name || "Student"
                )}&background=2563EB&color=fff&size=200`}

                alt="Profile"

              />


            </div>



            <h2>

              {student.name}

            </h2>



            <p>

              <FaEnvelope />

              {student.email}

            </p>



            <div className="student-role">

              <FaUserGraduate />

              Student

            </div>



          </div>






          {/* Information Card */}


          <div className="student-info-card">


            <div className="student-card-title">

              <h2>

                Student Information

              </h2>

            </div>




            <div className="info-grid">



              {/* Roll Number */}


              <div className="info-box">


                <FaIdCard />


                <div>

                  <span>
                    Roll Number
                  </span>


                  <h4>
                    {student.rollNumber}
                  </h4>

                </div>


              </div>





              {/* Department */}


              <div className="info-box">


                <FaBuilding />


                <div>

                  <span>
                    Department
                  </span>


                  <h4>
                    {student.department}
                  </h4>

                </div>


              </div>





              {/* Semester */}


              <div className="info-box">


                <FaGraduationCap />


                <div>

                  <span>
                    Semester
                  </span>


                  <h4>
                    Semester {student.semester}
                  </h4>

                </div>


              </div>





              {/* Phone */}


              <div className="info-box">


                <FaPhone />


                <div>

                  <span>
                    Phone
                  </span>


                  <h4>

                    {
                      student.phone ||
                      "Not Available"
                    }

                  </h4>

                </div>


              </div>




              {/* Address */}


              <div className="info-box full-info">


                <FaMapMarkerAlt />


                <div>

                  <span>
                    Address
                  </span>


                  <h4>

                    {
                      student.address ||
                      "Not Available"
                    }

                  </h4>

                </div>


              </div>



            </div>
                        {/* Actions */}

            <div className="student-actions">


              <button

                className="student-edit-btn"

                onClick={() =>
                  navigate(
                    "/student/edit-profile"
                  )
                }

              >

                <FaEdit />

                Edit Profile

              </button>





              <button

                className="student-logout-btn"

                onClick={logout}

              >

                <FaSignOutAlt />

                Logout

              </button>


            </div>



          </div>


        </div>


      </div>


    </Layout>

  );


}


export default StudentDashboard;
