import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../services/api";

function ProtectedRoute({ children, role }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const response = await API.get("/auth/me");

      const user = response.data.user;

      // Save latest user
      localStorage.setItem("user", JSON.stringify(user));

      if (role && user.role !== role) {
        setAuthorized(false);
      } else {
        setAuthorized(true);
      }
    } catch (error) {
      console.error(error);

      localStorage.removeItem("user");
      setAuthorized(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h3>Loading...</h3>
      </div>
    );
  }

  if (!authorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;