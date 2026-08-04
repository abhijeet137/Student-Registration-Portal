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

      const response = await API.post(
        "/admin/students",
        student
      );

      toast.success(
        response.data.message ||
        "Student Added Successfully!"
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

      <div className="container-fluid py-3">

        <div className="row justify-content-center">

          <div className="col-12 col-lg-10 col-xl-8">

            <div className="card shadow">

              <div className="card-header bg-success text-white">

                <h3 className="mb-0">
                  ➕ Add New Student
                </h3>

              </div>

              <div className="card-body">

                <form onSubmit={handleSubmit}>

                  <div className="row">

                    <div className="col-12 col-md-6 mb-3">
                      <label className="form-label">
                        Full Name
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={student.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                      <label className="form-label">
                        Email
                      </label>

                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={student.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                      <label className="form-label">
                        Password
                      </label>

                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={student.password}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                      <label className="form-label">
                        Roll Number
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="rollNumber"
                        value={student.rollNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                      <label className="form-label">
                        Department
                      </label>

                      <select
                        className="form-select"
                        name="department"
                        value={student.department}
                        onChange={handleChange}
                        required
                      >
                        <option value="">
                          Select Department
                        </option>

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

                    <div className="col-12 col-md-6 mb-3">

                      <label className="form-label">
                        Semester
                      </label>

                      <select
                        className="form-select"
                        name="semester"
                        value={student.semester}
                        onChange={handleChange}
                        required
                      >
                        <option value="">
                          Select Semester
                        </option>

                        {[1,2,3,4,5,6,7,8].map((sem) => (
                          <option
                            key={sem}
                            value={sem}
                          >
                            Semester {sem}
                          </option>
                        ))}

                      </select>

                    </div>

                    <div className="col-12 col-md-6 mb-3">

                      <label className="form-label">
                        Phone
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={student.phone}
                        onChange={handleChange}
                      />

                    </div>

                    <div className="col-12 col-md-6 mb-3">

                      <label className="form-label">
                        Address
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={student.address}
                        onChange={handleChange}
                      />

                    </div>

                  </div>

                  <div className="row mt-3">

                    <div className="col-12 col-md-6 mb-2">

                      <button
                        className="btn btn-success w-100"
                        disabled={loading}
                      >
                        {loading
                          ? "Adding..."
                          : "Add Student"}
                      </button>

                    </div>

                    <div className="col-12 col-md-6">

                      <button
                        type="button"
                        className="btn btn-secondary w-100"
                        onClick={() =>
                          navigate("/admin/students")
                        }
                      >
                        Cancel
                      </button>

                    </div>

                  </div>

                </form>

              </div>

            </div>

          </div>

        </div>

      </div>

    </Layout>
  );
}

export default AddStudent;