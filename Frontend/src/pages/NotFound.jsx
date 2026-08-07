import { Link } from "react-router-dom";

import {
  FaExclamationTriangle,
  FaHome,
} from "react-icons/fa";

import "../styles/notFound.css";


function NotFound() {


  return (

    <div className="notfound-page">


      <div className="notfound-card">


        <div className="notfound-icon">

          <FaExclamationTriangle />

        </div>



        <h1>

          404

        </h1>



        <h2>

          Page Not Found

        </h2>



        <p>

          Sorry, the page you are looking for
          does not exist.

        </p>




        <Link
          to="/"
          className="home-back-btn"
        >

          <FaHome />

          Back To Home

        </Link>



      </div>


    </div>

  );


}


export default NotFound;