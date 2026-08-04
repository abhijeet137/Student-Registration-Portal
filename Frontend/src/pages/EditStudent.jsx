import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import API from "../services/api";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

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
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const response = await API.get(`/admin/students/${id}`, {
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
          "Failed to load student"
      );

    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);

      const response = await API.put(
        `/admin/students/${id}`,
        student,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        response.data.message ||
          "Student Updated Successfully!"
      );

      setTimeout(() => {
        navigate("/admin/students");
      }, 1500);

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update student"
      );

    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mt-5">
          <h3 className="text-center">
            Loading Student...
          </h3>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>

      <div className="container mt-4">

        <div className="card shadow">

          <div className="card-header bg-warning">

            <h3>✏ Edit Student</h3>

          </div>

          <div className="card-body">

            <form onSubmit={handleSubmit}>

              <div className="row">

                <div className="col-md-6 mb-3">

                  <label>Name</label>

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

                    <option value="Computer Science">
                      Computer Science
                    </option>

                    <option value="Information Technology">
                      Information Technology
                    </option>

                    <option value="Electronics">
                      Electronics
                    </option>

                    <option value="Mechanical">
                      Mechanical
                    </option>

                    <option value="Civil">
                      Civil
                    </option>

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
                    {[1,2,3,4,5,6,7,8].map((sem)=>(
                      <option
                        key={sem}
                        value={sem}
                      >
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

                <div className="col-12 mb-3">

                  <label>Address</label>

                  <textarea
                    rows="3"
                    className="form-control"
                    name="address"
                    value={student.address}
                    onChange={handleChange}
                  />

                </div>

              </div>

              <button
                className="btn btn-warning me-2"
                disabled={updating}
              >
                {updating
                  ? "Updating..."
                  : "Update Student"}
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

export default EditStudent;