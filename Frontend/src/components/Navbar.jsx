import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleHome = () => {
    if (!user) {
      navigate("/");
      return;
    }

    if (user.role === "admin") {
      navigate("/admin/dashboard");
      return;
    }

    if (user.role === "student") {
      navigate("/student/dashboard");
      return;
    }

    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">

        {/* Logo */}
        <button
          className="navbar-brand btn btn-link text-white text-decoration-none fw-bold"
          onClick={handleHome}
        >
          🎓 Student Portal
        </button>

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

        {/* Navbar */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <button
                className="nav-link btn btn-link text-white text-decoration-none"
                onClick={handleHome}
              >
                🏠 Home
              </button>
            </li>

            {!user ? (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/login"
                        ? "active fw-bold"
                        : ""
                    }`}
                    to="/login"
                  >
                    🔑 Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/register"
                        ? "active fw-bold"
                        : ""
                    }`}
                    to="/register"
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
                    className="btn btn-outline-light ms-lg-2 mt-2 mt-lg-0"
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