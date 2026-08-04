import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import API from "../services/api";

function StudentDashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [student, setStudent] = useState({
    name: "",
    email: "",
    rollNumber: "",
    department: "",
    semester: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await API.get("/student/profile");

      if (response.data.success) {
        setStudent(response.data.student);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load profile"
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
        <div className="container text-center mt-5">
          <h3>Loading Dashboard...</h3>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>

      <div className="container-fluid">

        <h2 className="mb-4">
          👨‍🎓 Student Dashboard
        </h2>

        <div className="row g-4">

          {/* Profile Card */}

          <div className="col-12 col-lg-4">

            <div className="card shadow border-0 h-100">

              <div className="card-body text-center">

                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    student.name || "Student"
                  )}&background=0D6EFD&color=fff&size=180`}
                  alt="Profile"
                  className="rounded-circle img-fluid mb-3"
                  style={{
                    maxWidth: "150px",
                  }}
                />

                <h3>{student.name}</h3>

                <p className="text-muted">
                  {student.email}
                </p>

              </div>

            </div>

          </div>

          {/* Information */}

          <div className="col-12 col-lg-8">

            <div className="card shadow border-0 h-100">

              <div className="card-header bg-primary text-white">

                <h4 className="mb-0">
                  Student Information
                </h4>

              </div>

              <div className="card-body">

                <div className="table-responsive">

                  <table className="table table-bordered align-middle">

                    <tbody>

                      <tr>
                        <th>Roll Number</th>
                        <td>{student.rollNumber}</td>
                      </tr>

                      <tr>
                        <th>Department</th>
                        <td>{student.department}</td>
                      </tr>

                      <tr>
                        <th>Semester</th>
                        <td>{student.semester}</td>
                      </tr>

                      <tr>
                        <th>Phone</th>
                        <td>
                          {student.phone || "Not Available"}
                        </td>
                      </tr>

                      <tr>
                        <th>Address</th>
                        <td>
                          {student.address || "Not Available"}
                        </td>
                      </tr>

                    </tbody>

                  </table>

                </div>

                <div className="row g-2 mt-3">

                  <div className="col-12 col-md-6">

                    <button
                      className="btn btn-warning w-100"
                      onClick={() =>
                        navigate("/student/edit-profile")
                      }
                    >
                      ✏ Edit Profile
                    </button>

                  </div>

                  <div className="col-12 col-md-6">

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

        </div>

      </div>

    </Layout>
  );
}

export default StudentDashboard;