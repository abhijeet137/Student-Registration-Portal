import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Sidebar({ closeSidebar }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const goTo = (path) => {
    navigate(path);

    if (closeSidebar) {
      closeSidebar();
    }
  };

  const logout = async () => {
    try {
      await API.post("/auth/logout");
    } catch (error) {
      console.log(error);
    }

    localStorage.removeItem("user");

    if (closeSidebar) {
      closeSidebar();
    }

    navigate("/", { replace: true });

    window.location.reload();
  };

  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        minHeight: "100%",
      }}
    >
      {user?.role === "admin" && (
        <>
          <button
            className="btn btn-outline-light w-100 mb-2"
            onClick={() => goTo("/admin/dashboard")}
          >
            🏠 Dashboard
          </button>

          <button
            className="btn btn-outline-light w-100 mb-2"
            onClick={() => goTo("/admin/students")}
          >
            👨‍🎓 Students
          </button>

          <button
            className="btn btn-outline-light w-100 mb-2"
            onClick={() => goTo("/admin/add-student")}
          >
            ➕ Add Student
          </button>
        </>
      )}

      {user?.role === "student" && (
        <>
          <button
            className="btn btn-outline-light w-100 mb-2"
            onClick={() => goTo("/student/dashboard")}
          >
            🏠 Dashboard
          </button>

          <button
            className="btn btn-outline-light w-100 mb-2"
            onClick={() => goTo("/student/profile")}
          >
            👤 My Profile
          </button>

          <button
            className="btn btn-outline-light w-100 mb-2"
            onClick={() => goTo("/student/edit-profile")}
          >
            ✏ Edit Profile
          </button>

          <button
            className="btn btn-outline-light w-100 mb-2"
            onClick={() => goTo("/student/change-password")}
          >
            🔐 Change Password
          </button>

          <button
            className="btn btn-outline-light w-100 mb-2"
            onClick={() => goTo("/student/about")}
          >
            ℹ About Portal
          </button>
        </>
      )}

      <button
        className="btn btn-danger w-100 mt-3"
        onClick={logout}
      >
        🚪 Logout
      </button>
    </div>
  );
}

export default Sidebar;