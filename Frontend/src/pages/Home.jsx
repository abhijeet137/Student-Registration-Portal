import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* Hero Section */}

      <div
        className="text-white"
        style={{
          background: "linear-gradient(135deg,#0d6efd,#6610f2)",
          minHeight: "90vh",
        }}
      >
        <div className="container py-5">

          <div className="row align-items-center">

            <div className="col-lg-6">

              <h1 className="display-3 fw-bold">
                🎓 Student Registration Portal
              </h1>

              <p className="lead mt-4">
                A complete MERN Stack Student Management System
                designed for universities and colleges.
              </p>

              <div className="mt-4">

                <Link
                  to="/login"
                  className="btn btn-light btn-lg me-3"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="btn btn-outline-light btn-lg"
                >
                  Register
                </Link>

              </div>

            </div>

            <div className="col-lg-6 text-center mt-5 mt-lg-0">

              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
                alt="Student"
                className="img-fluid"
                style={{
                  maxHeight: "420px",
                }}
              />

            </div>

          </div>

        </div>

      </div>

      {/* Statistics */}

      <div className="container py-5">

        <div className="row g-4">

          <div className="col-md-3">
            <div className="card shadow text-center h-100">
              <div className="card-body">
                <h1>👨‍🎓</h1>
                <h3>1000+</h3>
                <p>Students</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow text-center h-100">
              <div className="card-body">
                <h1>🏫</h1>
                <h3>5</h3>
                <p>Departments</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow text-center h-100">
              <div className="card-body">
                <h1>📚</h1>
                <h3>8</h3>
                <p>Semesters</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow text-center h-100">
              <div className="card-body">
                <h1>🔐</h1>
                <h3>100%</h3>
                <p>Secure</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Features */}

      <div className="container pb-5">

        <h2 className="text-center fw-bold mb-5">
          Why Choose Our Portal?
        </h2>

        <div className="row g-4">

          <div className="col-lg-4">
            <div className="card shadow h-100 text-center">
              <div className="card-body">
                <h1>📚</h1>
                <h4>Student Management</h4>
                <p>
                  Add, edit, search and manage students
                  efficiently.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow h-100 text-center">
              <div className="card-body">
                <h1>🔒</h1>
                <h4>Secure Authentication</h4>
                <p>
                  JWT authentication keeps your data safe
                  and protected.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow h-100 text-center">
              <div className="card-body">
                <h1>📱</h1>
                <h4>Responsive Design</h4>
                <p>
                  Works perfectly on desktop, tablet and
                  mobile devices.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Technology */}

      <div className="bg-light py-5">

        <div className="container text-center">

          <h2 className="fw-bold mb-4">
            Technology Stack
          </h2>

          <div className="row g-4">

            <div className="col-6 col-md-3">
              <h1>⚛️</h1>
              <h5>React</h5>
            </div>

            <div className="col-6 col-md-3">
              <h1>🟢</h1>
              <h5>Node.js</h5>
            </div>

            <div className="col-6 col-md-3">
              <h1>🚀</h1>
              <h5>Express</h5>
            </div>

            <div className="col-6 col-md-3">
              <h1>🍃</h1>
              <h5>MongoDB</h5>
            </div>

          </div>

        </div>

      </div>

      {/* Footer */}

      <footer className="bg-dark text-white text-center py-4">

        <h5>Student Registration Portal</h5>

        <p className="mb-1">
          MERN Stack Minor Project
        </p>

        <small>
          © 2026 All Rights Reserved
        </small>

      </footer>
    </>
  );
}

export default Home;