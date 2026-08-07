import Layout from "../components/Layout";

import {
  FaGraduationCap,
  FaCode,
  FaServer,
  FaDatabase,
  FaShieldAlt,
  FaCloud,
  FaUserTie,
  FaInfoCircle,
} from "react-icons/fa";


import "../styles/about.css";


function About(){


  const details = [

    {
      icon:<FaGraduationCap />,
      title:"Project Name",
      value:"Student Registration Portal"
    },


    {
      icon:<FaInfoCircle />,
      title:"Version",
      value:"1.0"
    },


    {
      icon:<FaCode />,
      title:"Frontend",
      value:"React.js + Bootstrap + Axios"
    },


    {
      icon:<FaServer />,
      title:"Backend",
      value:"Node.js + Express.js"
    },


    {
      icon:<FaDatabase />,
      title:"Database",
      value:"MongoDB Atlas"
    },


    {
      icon:<FaShieldAlt />,
      title:"Authentication",
      value:"JWT (JSON Web Token)"
    },


    {
      icon:<FaCloud />,
      title:"Deployment",
      value:"Frontend - Vercel | Backend - Render"
    },


    {
      icon:<FaUserTie />,
      title:"Developer",
      value:"Abhijeet"
    }

  ];



  return (

    <Layout>


      <div className="about-page">


        {/* Header */}

        <div className="about-header">


          <h1>
            About Student Registration Portal
          </h1>


          <p>
            Complete information about the project.
          </p>


        </div>
                {/* Project Details */}


        <div className="about-grid">


          {
            details.map((item,index)=>(


              <div

                className="about-card"

                key={index}

              >


                <div className="about-icon">

                  {item.icon}

                </div>



                <div>


                  <span>

                    {item.title}

                  </span>



                  <h3>

                    {item.value}

                  </h3>


                </div>


              </div>


            ))
          }


        </div>





        {/* Description */}


        <div className="about-description">


          <div className="description-icon">


            <FaInfoCircle />


          </div>



          <div>


            <h2>

              About The Project

            </h2>



            <p>

              The Student Registration Portal is a
              full-stack web application that allows
              administrators to manage student records
              while enabling students to securely view
              and update their own profiles.


            </p>


            <p>

              The application uses React.js for the
              frontend, Express.js for the backend,
              MongoDB Atlas as the database, and JWT
              authentication for secure user access.

            </p>


          </div>


        </div>



      </div>


    </Layout>


  );


}


export default About;