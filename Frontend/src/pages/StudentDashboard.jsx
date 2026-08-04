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
      const token = localStorage.getItem("token");

      const response = await API.get("/student/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
          👨‍🎓 Student Dashboard
        </h2>

        <div className="row">

          <div className="col-lg-4">

            <div className="card shadow border-0">

              <div className="card-body text-center">

                <img
                  src="https://ui-avatars.com/api/?name=Student&background=0D6EFD&color=fff"
                  alt="Profile"
                  className="rounded-circle mb-3"
                />

                <h3>{student.name}</h3>

                <p className="text-muted">
                  {student.email}
                </p>

              </div>

            </div>

          </div>

          <div className="col-lg-8">

            <div className="card shadow border-0">

              <div className="card-header bg-primary text-white">

                <h4>Student Information</h4>

              </div>

              <div className="card-body">

                <table className="table">

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
                      <td>{student.phone || "Not Available"}</td>
                    </tr>

                    <tr>
                      <th>Address</th>
                      <td>{student.address || "Not Available"}</td>
                    </tr>

                  </tbody>

                </table>

                <button
                  className="btn btn-warning me-2"
                  onClick={() => navigate("/student/edit-profile")}
                >
                  ✏ Edit Profile
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

        </div>

      </div>

    </Layout>
  );
}

export default StudentDashboard;