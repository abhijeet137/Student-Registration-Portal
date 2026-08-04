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
    password: "",
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
        setStudent({
          ...response.data.student,
          password: "",
        });
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

      const token = localStorage.getItem("token");

      const response = await API.put(
        "/student/profile",
        {
          phone: student.phone,
          address: student.address,
          password: student.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
        <div className="container mt-5">
          <h3 className="text-center">
            Loading Profile...
          </h3>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>

      <div className="container mt-4">

        <div className="card shadow">

          <div className="card-header bg-primary text-white">

            <h3>👤 Edit Profile</h3>

          </div>

          <div className="card-body">

            <form onSubmit={handleSubmit}>

              <div className="row">

                <div className="col-md-6 mb-3">

                  <label>Name</label>

                  <input
                    type="text"
                    className="form-control"
                    value={student.name}
                    disabled
                  />

                </div>

                <div className="col-md-6 mb-3">

                  <label>Email</label>

                  <input
                    type="email"
                    className="form-control"
                    value={student.email}
                    disabled
                  />

                </div>

                <div className="col-md-6 mb-3">

                  <label>Roll Number</label>

                  <input
                    type="text"
                    className="form-control"
                    value={student.rollNumber}
                    disabled
                  />

                </div>

                <div className="col-md-6 mb-3">

                  <label>Department</label>

                  <input
                    type="text"
                    className="form-control"
                    value={student.department}
                    disabled
                  />

                </div>

                <div className="col-md-6 mb-3">

                  <label>Semester</label>

                  <input
                    type="text"
                    className="form-control"
                    value={student.semester}
                    disabled
                  />

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

                <div className="col-12 mb-3">

                  <label>New Password (Optional)</label>

                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={student.password}
                    onChange={handleChange}
                    placeholder="Leave blank to keep current password"
                  />

                </div>

              </div>

              <button
                className="btn btn-success me-2"
                disabled={saving}
              >
                {saving ? "Updating..." : "Update Profile"}
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/student/dashboard")}
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

export default EditProfile;