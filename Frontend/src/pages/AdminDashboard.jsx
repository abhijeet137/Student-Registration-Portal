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
      const response = await API.get("/admin/dashboard");

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

        <div className="row g-3">

          <div className="col-12 col-sm-6 col-lg-3">

            <div className="card shadow bg-primary text-white h-100">

              <div className="card-body text-center">

                <h6>Total Students</h6>

                <h2>{stats.totalStudents}</h2>

              </div>

            </div>

          </div>

          <div className="col-12 col-sm-6 col-lg-3">

            <div className="card shadow bg-success text-white h-100">

              <div className="card-body text-center">

                <h6>Total Admins</h6>

                <h2>{stats.totalAdmins}</h2>

              </div>

            </div>

          </div>

          <div className="col-12 col-sm-6 col-lg-3">

            <div className="card shadow bg-warning h-100">

              <div className="card-body text-center">

                <h6>Departments</h6>

                <h2>{stats.departments}</h2>

              </div>

            </div>

          </div>

          <div className="col-12 col-sm-6 col-lg-3">

            <div className="card shadow bg-danger text-white h-100">

              <div className="card-body text-center">

                <h6>Semesters</h6>

                <h2>{stats.semesters}</h2>

              </div>

            </div>

          </div>

        </div>

        {/* Chart */}

        <div className="mt-4">

          <DashboardChart
            departmentStats={departmentStats}
          />

        </div>

        {/* Latest Students */}

        <div className="card shadow mt-4">

          <div className="card-header bg-dark text-white">

            <h5 className="mb-0">
              Latest Registered Students
            </h5>

          </div>

          <div className="card-body">

            <div className="table-responsive">

              <table className="table table-hover table-bordered align-middle">

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

        </div>

        {/* Quick Actions */}

        <div className="card shadow mt-4">

          <div className="card-header bg-secondary text-white">

            <h5 className="mb-0">
              Quick Actions
            </h5>

          </div>

          <div className="card-body">

            <div className="row g-2">

              <div className="col-12 col-md-4">

                <button
                  className="btn btn-success w-100"
                  onClick={() =>
                    navigate("/admin/add-student")
                  }
                >
                  ➕ Add Student
                </button>

              </div>

              <div className="col-12 col-md-4">

                <button
                  className="btn btn-primary w-100"
                  onClick={() =>
                    navigate("/admin/students")
                  }
                >
                  👨‍🎓 View Students
                </button>

              </div>

              <div className="col-12 col-md-4">

                <button
                  className="btn btn-danger w-100"
                  onClick={logout}
                >
                  🚪 Logout
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </Layout>
  );
}

export default AdminDashboard;