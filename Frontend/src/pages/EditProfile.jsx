import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import API from "../services/api";

function EditProfile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const response = await API.put(
        "/student/profile",
        {
          phone: student.phone,
          address: student.address,
        }
      );

      toast.success(
        response.data.message ||
        "Profile Updated Successfully!"
      );

      setTimeout(() => {
        navigate("/student/dashboard");
      }, 1500);

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to update profile"
      );

    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mt-5 text-center">
          <h3>Loading Profile...</h3>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>

      <div className="container-fluid py-3">

        <div className="row justify-content-center">

          <div className="col-12 col-lg-10 col-xl-8">

            <div className="card shadow">

              <div className="card-header bg-primary text-white">

                <h3 className="mb-0">
                  👤 Edit Profile
                </h3>

              </div>

              <div className="card-body">

                <form onSubmit={handleSubmit}>

                  <div className="row">

                    <div className="col-12 col-md-6 mb-3">

                      <label className="form-label">
                        Name
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        value={student.name}
                        disabled
                      />

                    </div>

                    <div className="col-12 col-md-6 mb-3">

                      <label className="form-label">
                        Email
                      </label>

                      <input
                        type="email"
                        className="form-control"
                        value={student.email}
                        disabled
                      />

                    </div>

                    <div className="col-12 col-md-6 mb-3">

                      <label className="form-label">
                        Roll Number
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        value={student.rollNumber}
                        disabled
                      />

                    </div>

                    <div className="col-12 col-md-6 mb-3">

                      <label className="form-label">
                        Department
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        value={student.department}
                        disabled
                      />

                    </div>

                    <div className="col-12 col-md-6 mb-3">

                      <label className="form-label">
                        Semester
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        value={student.semester}
                        disabled
                      />

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

                    <div className="col-12 mb-3">

                      <label className="form-label">
                        Address
                      </label>

                      <textarea
                        rows="3"
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
                        disabled={saving}
                      >
                        {saving
                          ? "Updating..."
                          : "Update Profile"}
                      </button>

                    </div>

                    <div className="col-12 col-md-6">

                      <button
                        type="button"
                        className="btn btn-secondary w-100"
                        onClick={() =>
                          navigate("/student/dashboard")
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

export default EditProfile;