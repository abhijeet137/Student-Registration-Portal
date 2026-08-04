import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import API from "../services/api";

function AddStudent() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [student, setStudent] = useState({
    name: "",
    email: "",
    password: "",
    rollNumber: "",
    department: "",
    semester: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await API.post(
        "/admin/students",
        student,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        response.data.message || "Student Added Successfully!"
      );

      setTimeout(() => {
        navigate("/admin/students");
      }, 1500);

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to add student"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mt-4">

        <div className="card shadow">

          <div className="card-header bg-success text-white">
            <h3>Add New Student</h3>
          </div>

          <div className="card-body">

            <form onSubmit={handleSubmit}>

              <div className="row">

                <div className="col-md-6 mb-3">
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={student.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={student.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={student.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Roll Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="rollNumber"
                    value={student.rollNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Department</label>
                  <select
                    className="form-select"
                    name="department"
                    value={student.department}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Civil">Civil</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label>Semester</label>
                  <select
                    className="form-select"
                    name="semester"
                    value={student.semester}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Semester</option>

                    {[1,2,3,4,5,6,7,8].map((sem)=>(
                      <option key={sem} value={sem}>
                        Semester {sem}
                      </option>
                    ))}

                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label>Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={student.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={student.address}
                    onChange={handleChange}
                  />
                </div>

              </div>

              <button
                className="btn btn-success me-2"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Student"}
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/admin/students")}
              >
                Cancel
              </button>

            </form>

          </div>

        </div>

      </div>
    </Layout>
  );
}

export default AddStudent;