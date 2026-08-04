import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    rollNumber: "",
    department: "",
    semester: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        rollNumber: formData.rollNumber,
        department: formData.department,
        semester: formData.semester,
        phone: formData.phone,
        address: formData.address,
      });

      toast.success(
        response.data.message || "Registration Successful!"
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Registration Failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-8">

          <div className="card shadow">

            <div className="card-header bg-success text-white">

              <h2 className="text-center">
                🎓 Student Registration
              </h2>

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
                      value={formData.name}
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
                      value={formData.email}
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
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Confirm Password</label>

                    <input
                      type="password"
                      className="form-control"
                      name="confirmPassword"
                      value={formData.confirmPassword}
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
                      value={formData.rollNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Department</label>

                    <select
                      className="form-select"
                      name="department"
                      value={formData.department}
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
                      value={formData.semester}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Semester</option>

                      {[1,2,3,4,5,6,7,8].map((sem) => (
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
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12 mb-3">
                    <label>Address</label>

                    <textarea
                      className="form-control"
                      rows="3"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                </div>

                <button
                  className="btn btn-success w-100"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </button>

              </form>

              <div className="text-center mt-4">

                Already have an account?

                <Link to="/login">
                  {" "}Login
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;