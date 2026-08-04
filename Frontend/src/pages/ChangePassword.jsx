import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import API from "../services/api";

function ChangePassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      return toast.error("Please fill all fields");
    }

    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const response = await API.put(
        "/student/change-password",
        formData
      );

      toast.success(response.data.message);

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/student/dashboard");
      }, 1500);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to change password"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <Layout>

      <div className="container">

        <div
          className="card shadow mx-auto"
          style={{ maxWidth: "600px" }}
        >

          <div className="card-header bg-primary text-white">

            <h3>🔐 Change Password</h3>

          </div>

          <div className="card-body">

            <form onSubmit={handleSubmit}>

              <div className="mb-3">

                <label className="form-label">
                  Current Password
                </label>

                <input
                  type="password"
                  className="form-control"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                />

              </div>

              <div className="mb-3">

                <label className="form-label">
                  New Password
                </label>

                <input
                  type="password"
                  className="form-control"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                />

              </div>

              <div className="mb-4">

                <label className="form-label">
                  Confirm Password
                </label>

                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />

              </div>

              <button
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading
                  ? "Updating..."
                  : "Update Password"}
              </button>

            </form>

          </div>

        </div>

      </div>

    </Layout>
  );
}

export default ChangePassword;