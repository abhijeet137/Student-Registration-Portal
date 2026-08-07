import { FaBars, FaBell, FaMoon, FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import "../styles/navbar.css";

function Navbar({ openSidebar }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <motion.header
      className="navbar-custom"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Left */}

      <div className="navbar-left">

        <button
          className="menu-btn"
          onClick={openSidebar}
        >
          <FaBars />
        </button>

        <div>

          <h2 className="navbar-title">
            Dashboard
          </h2>

          <p className="navbar-subtitle">
            Welcome back 👋
          </p>

        </div>

      </div>

      {/* Right */}

      <div className="navbar-right">

        <button className="icon-btn">
          <FaBell />
        </button>

        <button className="icon-btn">
          <FaMoon />
        </button>

        <div className="profile-box">

          <FaUserCircle className="profile-icon" />

          <div>

            <div className="profile-name">
              {user?.name || "Administrator"}
            </div>

            <div className="profile-role">
              {user?.role || "Admin"}
            </div>

          </div>

        </div>

      </div>

    </motion.header>
  );
}

export default Navbar;