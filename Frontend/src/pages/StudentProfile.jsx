import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import API from "../services/api";

function StudentProfile() {
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await API.get("/student/profile");

      setStudent(response.data.student);
    } catch (error) {
      console.log(error);
      alert("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mt-5">
          <h3>Loading Profile...</h3>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mt-4">

        <div className="card shadow">

          <div className="card-header bg-primary text-white">
            <h3>👤 My Profile</h3>
          </div>

          <div className="card-body">

            <table className="table table-bordered">

              <tbody>

                <tr>
                  <th width="30%">Name</th>
                  <td>{student.name}</td>
                </tr>

                <tr>
                  <th>Email</th>
                  <td>{student.email}</td>
                </tr>

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
                  <td>{student.phone}</td>
                </tr>

                <tr>
                  <th>Address</th>
                  <td>{student.address}</td>
                </tr>

              </tbody>

            </table>

            <Link
              to="/student/edit-profile"
              className="btn btn-warning"
            >
              ✏ Edit Profile
            </Link>

          </div>

        </div>

      </div>
    </Layout>
  );
}

export default StudentProfile;