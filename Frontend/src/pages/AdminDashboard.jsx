import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import DashboardChart from "../components/DashboardChart";
import API from "../services/api";

function AdminDashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalStudents: 0,
    totalAdmins: 0,
    departments: 0,
    semesters: 0,
  });

  const [departmentStats, setDepartmentStats] = useState([]);
  const [latestStudents, setLatestStudents] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(response.data.stats);
      setDepartmentStats(response.data.departmentStats);
      setLatestStudents(response.data.latestStudents);

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load dashboard"
      );

    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();

    toast.success("Logged out successfully!");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mt-5 text-center">
          <h3>Loading Dashboard...</h3>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>

      <div className="container-fluid">

        <h2 className="mb-4">
          👨‍💼 Admin Dashboard
        </h2>

        {/* Statistics */}

        <div className="row">

          <div className="col-md-3 mb-4">

            <div className="card shadow bg-primary text-white">

              <div className="card-body text-center">

                <h5>Total Students</h5>

                <h1>{stats.totalStudents}</h1>

              </div>

            </div>

          </div>

          <div className="col-md-3 mb-4">

            <div className="card shadow bg-success text-white">

              <div className="card-body text-center">

                <h5>Total Admins</h5>

                <h1>{stats.totalAdmins}</h1>

              </div>

            </div>

          </div>

          <div className="col-md-3 mb-4">

            <div className="card shadow bg-warning">

              <div className="card-body text-center">

                <h5>Departments</h5>

                <h1>{stats.departments}</h1>

              </div>

            </div>

          </div>

          <div className="col-md-3 mb-4">

            <div className="card shadow bg-danger text-white">

              <div className="card-body text-center">

                <h5>Semesters</h5>

                <h1>{stats.semesters}</h1>

              </div>

            </div>

          </div>

        </div>

        {/* Chart */}

        <DashboardChart departmentStats={departmentStats} />

        {/* Latest Students */}

        <div className="card shadow mt-4">

          <div className="card-header bg-dark text-white">

            <h4>Latest Registered Students</h4>

          </div>

          <div className="card-body">

            <table className="table table-hover table-bordered">

              <thead className="table-dark">

                <tr>

                  <th>Roll No</th>

                  <th>Name</th>

                  <th>Department</th>

                  <th>Semester</th>

                </tr>

              </thead>

              <tbody>

                {latestStudents.length > 0 ? (

                  latestStudents.map((student) => (

                    <tr key={student._id}>

                      <td>{student.rollNumber}</td>

                      <td>{student.name}</td>

                      <td>{student.department}</td>

                      <td>{student.semester}</td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="4"
                      className="text-center"
                    >
                      No Students Found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="card shadow mt-4">

          <div className="card-header bg-secondary text-white">

            <h4>Quick Actions</h4>

          </div>

          <div className="card-body">

            <button
              className="btn btn-success me-3"
              onClick={() => navigate("/admin/add-student")}
            >
              ➕ Add Student
            </button>

            <button
              className="btn btn-primary me-3"
              onClick={() => navigate("/admin/students")}
            >
              👨‍🎓 View Students
            </button>

            <button
              className="btn btn-danger"
              onClick={logout}
            >
              🚪 Logout
            </button>

          </div>

        </div>

      </div>

    </Layout>
  );
}

export default AdminDashboard;