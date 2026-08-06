import { useNavigate } from "react-router-dom";

function Sidebar({ closeSidebar }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const goTo = (path) => {
    navigate(path);

    if (closeSidebar) {
      closeSidebar();
    }
  };

  const logout = () => {
    localStorage.clear();

    if (closeSidebar) {
      closeSidebar();
    }

    navigate("/login");
  };

  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        minHeight: "100%",
      }}
    >
      <div className="d-grid gap-2">

        {user?.role === "admin" && (
          <>
            <button
              className="btn btn-outline-light"
              onClick={() => goTo("/admin/dashboard")}
            >
              🏠 Dashboard
            </button>

            <button
              className="btn btn-outline-light"
              onClick={() => goTo("/admin/students")}
            >
              👨‍🎓 Students
            </button>

            <button
              className="btn btn-outline-light"
              onClick={() => goTo("/admin/add-student")}
            >
              ➕ Add Student
            </button>
          </>
        )}

        {user?.role === "student" && (
          <>
            <button
              className="btn btn-outline-light"
              onClick={() => goTo("/student/dashboard")}
            >
              🏠 Dashboard
            </button>

            <button
              className="btn btn-outline-light"
              onClick={() => goTo("/student/profile")}
            >
              👤 My Profile
            </button>

            <button
              className="btn btn-outline-light"
              onClick={() => goTo("/student/edit-profile")}
            >
              ✏ Edit Profile
            </button>

            <button
              className="btn btn-outline-light"
              onClick={() => goTo("/student/change-password")}
            >
              🔐 Change Password
            </button>

            <button
              className="btn btn-outline-light"
              onClick={() => goTo("/student/about")}
            >
              ℹ About Portal
            </button>
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