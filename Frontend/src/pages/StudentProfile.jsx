import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaIdCard,
  FaBuilding,
  FaGraduationCap,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
} from "react-icons/fa";

import Layout from "../components/Layout";
import API from "../services/api";

import "../styles/studentProfile.css";


function StudentProfile(){

  const [student,setStudent] =
    useState({});


  const [loading,setLoading] =
    useState(true);



  useEffect(()=>{

    fetchProfile();

  },[]);



  const fetchProfile=async()=>{

    try{


      const response =
        await API.get(
          "/student/profile"
        );


      setStudent(
        response.data.student
      );


    }

    catch(error){

      console.log(error);

      alert(
        "Failed to load profile"
      );


    }

    finally{

      setLoading(false);

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


      <div className="profile-page">


        <div className="profile-header">


          <h1>
            My Profile
          </h1>


          <p>
            View your personal student information.
          </p>


        </div>
                {/* Profile Content */}


        <div className="profile-card">



          {/* Avatar */}


          <div className="profile-avatar">


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


          <p className="profile-email">

            <FaEnvelope />

            {student.email}

          </p>





          {/* Information */}


          <div className="profile-info-grid">


            <div className="profile-info-box">

              <FaUser />

              <div>

                <span>
                  Name
                </span>

                <h4>
                  {student.name}
                </h4>

              </div>

            </div>




            <div className="profile-info-box">

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




            <div className="profile-info-box">

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




            <div className="profile-info-box">

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




            <div className="profile-info-box">

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




            <div className="profile-info-box full-profile-box">

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





          {/* Edit Button */}


          <Link

            to="/student/edit-profile"

            className="profile-edit-btn"

          >

            <FaEdit />

            Edit Profile

          </Link>




        </div>


      </div>


    </Layout>

  );

}


export default StudentProfile;