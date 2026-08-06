import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const getHomeLink = () => {
    if (user?.role === "admin") return "/admin/dashboard";
    if (user?.role === "student") return "/student/dashboard";
    return "/";
  };

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
    } catch (error) {
      console.log(error);
    }

    localStorage.removeItem("user");

    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand fw-bold" to={getHomeLink()}>
          🎓 Student Portal
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            {/* Home */}
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === getHomeLink()
                    ? "active fw-bold"
                    : ""
                }`}
                to={getHomeLink()}
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
              >
                🏠 Home
              </Link>
            </li>

            {!user ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/login"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                  >
                    🔑 Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/register"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                  >
                    📝 Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <span className="nav-link text-white">
                    👋 {user.name}
                  </span>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-outline-light ms-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;