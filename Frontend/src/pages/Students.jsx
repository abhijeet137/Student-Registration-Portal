import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaUserGraduate,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import { toast } from "react-toastify";

import Layout from "../components/Layout";
import API from "../services/api";

import "../styles/students.css";

function Students() {

  const navigate = useNavigate();

  const [students, setStudents] = useState([]);

  const [filteredStudents, setFilteredStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  useEffect(() => {

    fetchStudents(currentPage);

  }, [currentPage]);

  useEffect(() => {

    const filtered =
      students.filter((student) =>

        student.name
          .toLowerCase()
          .includes(search.toLowerCase())

        ||

        student.email
          .toLowerCase()
          .includes(search.toLowerCase())

        ||

        student.rollNumber
          .toLowerCase()
          .includes(search.toLowerCase())

      );

    setFilteredStudents(filtered);

  }, [students, search]);

  const fetchStudents = async (
    page = 1
  ) => {

    try {

      setLoading(true);

      const response =
        await API.get(
          `/admin/students?page=${page}`
        );

      setStudents(
        response.data.students
      );

      setFilteredStudents(
        response.data.students
      );

      setCurrentPage(
        response.data.currentPage
      );

      setTotalPages(
        response.data.totalPages
      );

    }

    catch (error) {

      console.log(error);

      toast.error(

        error.response?.data?.message ||

        "Failed to load students"

      );

    }

    finally {

      setLoading(false);

    }

  };

  const deleteStudent = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this student?"
      );

    if (!confirmDelete) return;

    try {

      await API.delete(
        `/admin/students/${id}`
      );

      toast.success(
        "Student Deleted"
      );

      fetchStudents(currentPage);

    }

    catch (error) {

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

        <div className="dashboard-loading">

          <div className="loader"></div>

          <h3>
            Loading Students...
          </h3>

        </div>

      </Layout>

    );

  }

  return (

    <Layout>

      <motion.div

        initial={{
          opacity:0,
          y:20,
        }}

        animate={{
          opacity:1,
          y:0,
        }}

      >

        {/* Header */}

        <div className="students-header">

          <div>

            <h1>

              Students

            </h1>

            <p>

              Manage all registered students.

            </p>

          </div>

          <button

            className="primary-btn"

            onClick={()=>

              navigate("/admin/add-student")

            }

          >

            <FaPlus />

            Add Student

          </button>

        </div>

        {/* Search */}

        <div className="search-card">

          <div className="search-box">

            <FaSearch />

            <input

              type="text"

              placeholder="Search student..."

              value={search}

              onChange={(e)=>

                setSearch(
                  e.target.value
                )

              }

            />

          </div>

        </div>
                {/* Students Table */}

        <motion.div

          className="students-card"

          initial={{
            opacity:0,
          }}

          animate={{
            opacity:1,
          }}

        >

          <div className="table-wrapper">

            <table className="modern-table">

              <thead>

                <tr>

                  <th>
                    Student
                  </th>

                  <th>
                    Roll Number
                  </th>

                  <th>
                    Department
                  </th>

                  <th>
                    Semester
                  </th>

                  <th>
                    Email
                  </th>

                  <th>
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

              {filteredStudents.length > 0 ? (

                filteredStudents.map(
                  (student)=>(

                    <tr
                      key={
                        student._id
                      }
                    >

                      {/* Student */}

                      <td>

                        <div
                          className="student-profile"
                        >

                          <div
                            className="student-avatar"
                          >

                            {
                              student.name
                              ?.charAt(0)
                              .toUpperCase()
                            }

                          </div>


                          <div>

                            <h4>
                              {
                                student.name
                              }
                            </h4>

                            <span>
                              Student
                            </span>

                          </div>


                        </div>

                      </td>


                      {/* Roll Number */}

                      <td>

                        <span
                          className="roll-badge"
                        >

                          {
                            student.rollNumber
                          }

                        </span>

                      </td>


                      {/* Department */}

                      <td>

                        {
                          student.department
                        }

                      </td>


                      {/* Semester */}

                      <td>

                        <span
                          className="semester-badge"
                        >

                          Semester {
                            student.semester
                          }

                        </span>

                      </td>


                      {/* Email */}

                      <td>

                        {
                          student.email
                        }

                      </td>


                      {/* Actions */}

                      <td>

                        <div
                          className="action-buttons"
                        >

                          <button

                            className="edit-btn"

                            onClick={()=>

                              navigate(
                                `/admin/edit-student/${student._id}`
                              )

                            }

                          >

                            <FaEdit />

                          </button>


                          <button

                            className="delete-btn"

                            onClick={()=>

                              deleteStudent(
                                student._id
                              )

                            }

                          >

                            <FaTrash />

                          </button>


                        </div>


                      </td>


                    </tr>


                  )

                )

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="empty-table"
                  >

                    <FaUserGraduate />

                    <p>
                      No Students Found
                    </p>

                  </td>

                </tr>

              )}

              </tbody>


            </table>


          </div>


        </motion.div>
                {/* Pagination */}

        <div className="pagination-container">


          <button

            className="pagination-btn"

            disabled={
              currentPage === 1
            }

            onClick={() =>
              setCurrentPage(
                currentPage - 1
              )
            }

          >

            <FaChevronLeft />

            Previous

          </button>



          <div className="page-number">

            Page {currentPage} of {totalPages}

          </div>



          <button

            className="pagination-btn"

            disabled={
              currentPage === totalPages
            }

            onClick={() =>
              setCurrentPage(
                currentPage + 1
              )
            }

          >

            Next

            <FaChevronRight />

          </button>


        </div>


      </motion.div>


    </Layout>

  );

}
// last 

export default Students;
