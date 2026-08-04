import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: "250px",
        minHeight: "100vh",
      }}
    >
      <h3 className="text-center mb-4">
        🎓 Student Portal
      </h3>

      <div className="d-grid gap-2">

        <Link
          className="btn btn-outline-light"
          to="/admin/dashboard"
        >
          🏠 Dashboard
        </Link>

        <Link
          className="btn btn-outline-light"
          to="/admin/students"
        >
          👨‍🎓 Students
        </Link>

        <Link
          className="btn btn-outline-light"
          to="/admin/add-student"
        >
          ➕ Add Student
        </Link>

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