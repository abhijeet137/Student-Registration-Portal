import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        minHeight: "100vh",
      }}
    >
      <h3 className="text-center mb-4">
        🎓 Student Portal
      </h3>

      <div className="d-grid gap-2">

        {/* ================= ADMIN MENU ================= */}

        {user?.role === "admin" && (
          <>
            <Link className="btn btn-outline-light" to="/admin/dashboard">
              🏠 Dashboard
            </Link>

            <Link className="btn btn-outline-light" to="/admin/students">
              👨‍🎓 Students
            </Link>

            <Link className="btn btn-outline-light" to="/admin/add-student">
              ➕ Add Student
            </Link>
          </>
        )}

        {/* ================= STUDENT MENU ================= */}

        {user?.role === "student" && (
          <>
            <Link className="btn btn-outline-light" to="/student/dashboard">
              🏠 Dashboard
            </Link>

            <Link className="btn btn-outline-light" to="/student/profile">
              👤 My Profile
            </Link>

            <Link className="btn btn-outline-light" to="/student/edit-profile">
              ✏ Edit Profile
            </Link>

            <Link
              className="btn btn-outline-light"
              to="/student/change-password"
            >
              🔐 Change Password
            </Link>

            <Link className="btn btn-outline-light" to="/student/about">
              ℹ About Portal
            </Link>
          </>
        )}

        <button
          className="btn btn-danger mt-3"
          onClick={logout}
        >
          🚪 Logout
        </button>

      </div>
    </div>
  );
}

export default Sidebar;