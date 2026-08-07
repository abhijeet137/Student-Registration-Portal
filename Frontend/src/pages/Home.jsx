import { Link } from "react-router-dom";

import {
  FaGraduationCap,
  FaUserGraduate,
  FaBuilding,
  FaBook,
  FaLock,
  FaDatabase,
  FaCode,
  FaMobileAlt,
} from "react-icons/fa";

import "../styles/home.css";


function Home() {


  const stats = [

    {
      icon: <FaUserGraduate />,
      number: "1000+",
      title: "Students",
    },

    {
      icon: <FaBuilding />,
      number: "5",
      title: "Departments",
    },

    {
      icon: <FaBook />,
      number: "8",
      title: "Semesters",
    },

    {
      icon: <FaLock />,
      number: "100%",
      title: "Secure",
    },

  ];



  const features = [

    {
      icon: <FaUserGraduate />,
      title: "Student Management",
      text: "Add, edit, search and manage student records efficiently.",
    },


    {
      icon: <FaLock />,
      title: "Secure Authentication",
      text: "JWT authentication keeps your data safe and protected.",
    },


    {
      icon: <FaMobileAlt />,
      title: "Responsive Design",
      text: "Works perfectly on desktop, tablet and mobile devices.",
    },

  ];



  const technologies = [

    {
      icon: <FaCode />,
      name: "React.js",
    },


    {
      icon: <FaCode />,
      name: "Node.js",
    },


    {
      icon: <FaCode />,
      name: "Express.js",
    },


    {
      icon: <FaDatabase />,
      name: "MongoDB",
    },

  ];



  return (

    <div className="home-page">



      {/* HERO SECTION */}

      <section className="hero-section">


        <div className="hero-container">


          <div className="hero-content">


            <div className="hero-icon">

              <FaGraduationCap />

            </div>



            <h1>

              Student Registration Portal

            </h1>



            <p>

              A complete MERN Stack Student Management
              System designed for universities and colleges.

            </p>




            <div className="hero-buttons">


              <Link
                to="/login"
                className="home-primary-btn"
              >

                Login

              </Link>




              <Link
                to="/register"
                className="home-secondary-btn"
              >

                Register

              </Link>


            </div>


          </div>





          <div className="hero-box">


            <FaGraduationCap />


            <h3>

              Smart Education System

            </h3>


            <p>

              Manage students, academics and records
              easily from one platform.

            </p>


          </div>



        </div>


      </section>







      {/* STATISTICS */}


      <section className="stats-section">


        <div className="stats-grid">


          {stats.map((item,index)=>(


            <div
              className="stat-card"
              key={index}
            >


              <div className="stat-icon">

                {item.icon}

              </div>



              <h2>

                {item.number}

              </h2>



              <p>

                {item.title}

              </p>


            </div>


          ))}


        </div>


      </section>







      {/* FEATURES */}


      <section className="features-section">


        <h2>

          Why Choose Our Portal?

        </h2>




        <div className="features-grid">


          {features.map((item,index)=>(


            <div
              className="feature-card"
              key={index}
            >


              <div className="feature-icon">

                {item.icon}

              </div>



              <h3>

                {item.title}

              </h3>



              <p>

                {item.text}

              </p>



            </div>


          ))}


        </div>


      </section>







      {/* TECHNOLOGY */}


      <section className="technology-section">


        <h2>

          Technology Stack

        </h2>




        <div className="technology-grid">


          {technologies.map((item,index)=>(


            <div
              className="technology-card"
              key={index}
            >


              <div>

                {item.icon}

              </div>



              <h4>

                {item.name}

              </h4>


            </div>


          ))}


        </div>


      </section>







      {/* FOOTER */}


      <footer className="home-footer">


        <h3>

          🎓 Student Registration Portal

        </h3>



        <p>

          MERN Stack Student Management System

        </p>



        <small>

          © 2026 All Rights Reserved

        </small>


      </footer>



    </div>

  );

}


export default Home;