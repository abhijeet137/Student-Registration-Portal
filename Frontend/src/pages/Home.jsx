import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container text-center mt-5">

      <h1 className="display-4 fw-bold">
        🎓 Student Registration Portal
      </h1>

      <p className="lead mt-3">
        Welcome to our MERN Stack Minor Project
      </p>

      <div className="mt-4">

        <Link to="/login" className="btn btn-primary me-3">
          Login
        </Link>

        <Link to="/register" className="btn btn-success">
          Register
        </Link>

      </div>

    </div>
  );
}

export default Home;