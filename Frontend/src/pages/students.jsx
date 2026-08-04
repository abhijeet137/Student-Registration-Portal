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

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchStudents(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const filtered = students.filter((student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredStudents(filtered);
  }, [students, search]);

  const fetchStudents = async (page = 1) => {
    setLoading(true);

    try {
      const response = await API.get(
        `/admin/students?page=${page}`
      );

      setStudents(response.data.students);
      setFilteredStudents(response.data.students);

      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);

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

      await API.delete(`/admin/students/${id}`);

      toast.success("Student Deleted Successfully");

      fetchStudents(currentPage);

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
        <div className="container mt-5 text-center">
          <h3>Loading Students...</h3>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>

      <div className="container-fluid">

        {/* Header */}

        <div className="row align-items-center mb-4">

          <div className="col-12 col-md-6 mb-3 mb-md-0">

            <h2 className="mb-0">
              👨‍🎓 Students List
            </h2>

          </div>

          <div className="col-12 col-md-6 text-md-end">

            <button
              className="btn btn-success w-100 w-md-auto"
              onClick={() =>
                navigate("/admin/add-student")
              }
            >
              ➕ Add Student
            </button>

          </div>

        </div>

        {/* Search */}

        <div className="card shadow">

          <div className="card-body">

            <div className="mb-3">

              <input
                type="text"
                className="form-control"
                placeholder="Search by Name, Email or Roll Number..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

            {/* Table */}

            <div className="table-responsive">

              <table className="table table-hover table-bordered align-middle">

                <thead className="table-dark">

                  <tr>

                    <th>Roll No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Semester</th>
                    <th style={{ minWidth: "170px" }}>
                      Actions
                    </th>

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

                          <div className="d-flex flex-column flex-md-row gap-2">

                            <button
                              className="btn btn-warning btn-sm w-100"
                              onClick={() =>
                                navigate(
                                  `/admin/edit-student/${student._id}`
                                )
                              }
                            >
                              ✏ Edit
                            </button>

                            <button
                              className="btn btn-danger btn-sm w-100"
                              onClick={() =>
                                deleteStudent(student._id)
                              }
                            >
                              🗑 Delete
                            </button>

                          </div>

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

            {/* Pagination */}

            <div className="row mt-4 align-items-center">

              <div className="col-12 col-md-4 mb-2">

                <button
                  className="btn btn-secondary w-100"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage(currentPage - 1)
                  }
                >
                  ⬅ Previous
                </button>

              </div>

              <div className="col-12 col-md-4 text-center mb-2">

                <strong>
                  Page {currentPage} of {totalPages}
                </strong>

              </div>

              <div className="col-12 col-md-4">

                <button
                  className="btn btn-secondary w-100"
                  disabled={
                    currentPage === totalPages
                  }
                  onClick={() =>
                    setCurrentPage(currentPage + 1)
                  }
                >
                  Next ➡
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </Layout>
  );
}

export default Students;