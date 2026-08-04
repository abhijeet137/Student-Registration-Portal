import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import API from "../services/api";

function Students() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    const filtered = students.filter((student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredStudents(filtered);
  }, [search, students]);

  const fetchStudents = async () => {
    try {
      const response = await API.get("/admin/students", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents(response.data.students);
      setFilteredStudents(response.data.students);

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to load students"
      );

    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/admin/students/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Student Deleted Successfully");

      fetchStudents();

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Delete Failed"
      );
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mt-5">
          <h3 className="text-center">
            Loading Students...
          </h3>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>

      <div className="container-fluid">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h2>👨‍🎓 Students List</h2>

          <button
            className="btn btn-success"
            onClick={() => navigate("/admin/add-student")}
          >
            ➕ Add Student
          </button>

        </div>

        <div className="card shadow">

          <div className="card-body">

            <div className="mb-3">

              <input
                type="text"
                className="form-control"
                placeholder="Search by Name, Email or Roll Number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

            <div className="table-responsive">

              <table className="table table-hover table-bordered">

                <thead className="table-dark">

                  <tr>

                    <th>Roll No</th>

                    <th>Name</th>

                    <th>Email</th>

                    <th>Department</th>

                    <th>Semester</th>

                    <th>Actions</th>

                  </tr>

                </thead>

                <tbody>

                  {filteredStudents.length > 0 ? (

                    filteredStudents.map((student) => (

                      <tr key={student._id}>

                        <td>{student.rollNumber}</td>

                        <td>{student.name}</td>

                        <td>{student.email}</td>

                        <td>{student.department}</td>

                        <td>{student.semester}</td>

                        <td>

                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() =>
                              navigate(`/admin/edit-student/${student._id}`)
                            }
                          >
                            ✏ Edit
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              deleteStudent(student._id)
                            }
                          >
                            🗑 Delete
                          </button>

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="6"
                        className="text-center"
                      >
                        No Students Found
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </Layout>
  );
}

export default Students;