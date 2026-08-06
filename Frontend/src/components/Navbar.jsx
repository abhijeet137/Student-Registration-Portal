import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const getHomeLink = () => {
    if (user?.role === "admin") return "/admin/dashboard";
    if (user?.role === "student") return "/student/dashboard";
    return "/";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">

      <div className="container">

        <Link
          className="navbar-brand fw-bold"
          to={getHomeLink()}
        >
          🎓 Student Portal
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">

              <Link
                className={`nav-link ${
                  location.pathname === getHomeLink()
                    ? "active fw-bold"
                    : ""
                }`}
                to={getHomeLink()}
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
                  >
                    Login
                  </Link>

                </li>

                <li className="nav-item">

                  <Link
                    className="nav-link"
                    to="/register"
                  >
                    Register
                  </Link>

                </li>
              </>
            ) : (
              <li className="nav-item">

                <span className="nav-link text-white">
                  👋 {user.name}
                </span>

              </li>
            )}

          </ul>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;