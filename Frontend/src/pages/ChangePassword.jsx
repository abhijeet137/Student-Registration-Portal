import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaLock,
  FaKey,
  FaSave,
  FaArrowLeft,
} from "react-icons/fa";

import { toast } from "react-toastify";

import Layout from "../components/Layout";
import API from "../services/api";

import "../styles/changePassword.css";


function ChangePassword(){

  const navigate = useNavigate();



  const [formData,setFormData] =
    useState({

      currentPassword:"",
      newPassword:"",
      confirmPassword:"",

    });



  const [loading,setLoading] =
    useState(false);




  const handleChange=(e)=>{

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value,

    });

  };




  const handleSubmit=async(e)=>{

    e.preventDefault();



    if(
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ){

      toast.error(
        "Please fill all fields"
      );

      return;

    }



    if(
      formData.newPassword !==
      formData.confirmPassword
    ){

      toast.error(
        "Passwords do not match"
      );

      return;

    }



    try{


      setLoading(true);



      const response =
        await API.put(

          "/student/change-password",

          formData

        );



      toast.success(
        response.data.message
      );



      setFormData({

        currentPassword:"",
        newPassword:"",
        confirmPassword:"",

      });



      setTimeout(()=>{

        navigate(
          "/student/dashboard"
        );

      },1500);



    }

    catch(error){


      console.log(error);


      toast.error(

        error.response?.data?.message ||

        "Failed to change password"

      );


    }

    finally{

      setLoading(false);

    }


  };



  return (

    <Layout>


      <div className="password-page">


        <div className="password-header">


          <div>

            <h1>
              Change Password
            </h1>

            <p>
              Keep your account secure.
            </p>

          </div>



          <button

            className="password-back-btn"

            onClick={()=>navigate(
              "/student/dashboard"
            )}

          >

            <FaArrowLeft />

            Back

          </button>


        </div>
                {/* Password Card */}


        <div className="password-card">


          <div className="password-icon">


            <FaKey />


          </div>



          <h2>
            Update Password
          </h2>


          <p>
            Use a strong password to protect
            your account.
          </p>





          <form onSubmit={handleSubmit}>


            {/* Current Password */}


            <div className="password-input-group">


              <label>
                Current Password
              </label>


              <div className="password-input">


                <FaLock />


                <input

                  type="password"

                  name="currentPassword"

                  placeholder="Enter current password"

                  value={
                    formData.currentPassword
                  }

                  onChange={
                    handleChange
                  }

                  required

                />


              </div>


            </div>





            {/* New Password */}


            <div className="password-input-group">


              <label>
                New Password
              </label>


              <div className="password-input">


                <FaLock />


                <input

                  type="password"

                  name="newPassword"

                  placeholder="Enter new password"

                  value={
                    formData.newPassword
                  }

                  onChange={
                    handleChange
                  }

                  required

                />


              </div>


            </div>





            {/* Confirm Password */}


            <div className="password-input-group">


              <label>
                Confirm New Password
              </label>


              <div className="password-input">


                <FaLock />


                <input

                  type="password"

                  name="confirmPassword"

                  placeholder="Confirm new password"

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





            {/* Button */}


            <button

              type="submit"

              className="password-save-btn"

              disabled={loading}

            >


              <FaSave />


              {

                loading

                ? "Updating..."

                : "Update Password"

              }


            </button>



          </form>


        </div>



      </div>


    </Layout>

  );


}


export default ChangePassword;