import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserGraduate,
  FaUserShield,
  FaBuilding,
  FaLayerGroup,
  FaPlus,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import Layout from "../components/Layout";
import DashboardChart from "../components/DashboardChart";
import API from "../services/api";

import "../styles/dashboard.css";

function AdminDashboard() {

  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] =
    useState(true);

  const [stats, setStats] = useState({
    totalStudents: 0,
    totalAdmins: 0,
    departments: 0,
    semesters: 0,
  });

  const [departmentStats, setDepartmentStats] =
    useState([]);

  const [latestStudents, setLatestStudents] =
    useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {

    try {

      const response =
        await API.get("/admin/dashboard");

      setStats(response.data.stats);

      setDepartmentStats(
        response.data.departmentStats
      );

      setLatestStudents(
        response.data.latestStudents
      );

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load dashboard"
      );

    } finally {

      setLoading(false);

    }

  };

  const cards = [

    {
      title: "Students",
      value: stats.totalStudents,
      icon: <FaUserGraduate />,
      color: "#3B82F6",
    },

    {
      title: "Admins",
      value: stats.totalAdmins,
      icon: <FaUserShield />,
      color: "#22C55E",
    },

    {
      title: "Departments",
      value: stats.departments,
      icon: <FaBuilding />,
      color: "#F59E0B",
    },

    {
      title: "Semesters",
      value: stats.semesters,
      icon: <FaLayerGroup />,
      color: "#EF4444",
    },

  ];

  if (loading) {

    return (

      <Layout>

        <div className="dashboard-loading">

          <div className="loader"></div>

          <h3>Loading Dashboard...</h3>

        </div>

      </Layout>

    );

  }

  return (

    <Layout>

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: .4,
        }}
      >

        {/* Welcome Section */}

        <div className="welcome-card">

          <div>

            <h1>

              Welcome back,
              {" "}
              {user?.name}

              👋

            </h1>

            <p>

              Manage your students,
              departments,
              reports and registrations
              from one place.

            </p>

          </div>

        </div>

        {/* Statistics */}

        <div className="stats-grid">

          {cards.map((card, index) => (

            <motion.div

              key={index}

              whileHover={{
                y: -8,
              }}

              className="stat-card"

            >

              <div
                className="stat-icon"
                style={{
                  background:
                    card.color,
                }}
              >

                {card.icon}

              </div>

              <div>

                <h2>

                  {card.value}

                </h2>

                <span>

                  {card.title}

                </span>

              </div>

            </motion.div>

          ))}

        </div>
                {/* Chart & Recent Students */}

        <div className="dashboard-row">

          {/* Department Chart */}

          <motion.div
            className="dashboard-card chart-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .2 }}
          >

            <div className="card-header-custom">

              <h3>
                Department Statistics
              </h3>

            </div>

            <DashboardChart
              departmentStats={
                departmentStats
              }
            />

          </motion.div>

          {/* Latest Students */}

          <motion.div
            className="dashboard-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .3 }}
          >

            <div className="card-header-custom">

              <h3>
                Latest Students
              </h3>

            </div>

            <div className="latest-list">

              {latestStudents.length > 0 ? (

                latestStudents.map(
                  (student) => (

                    <div
                      key={student._id}
                      className="student-item"
                    >

                      <div
                        className="student-avatar"
                      >
                        {student.name
                          ?.charAt(0)
                          .toUpperCase()}
                      </div>

                      <div
                        className="student-info"
                      >

                        <h5>
                          {student.name}
                        </h5>

                        <span>
                          {
                            student.rollNumber
                          }
                        </span>

                      </div>

                      <div
                        className="student-badge"
                      >

                        {
                          student.department
                        }

                      </div>

                    </div>

                  )
                )

              ) : (

                <div
                  className="empty-state"
                >

                  No Students Found

                </div>

              )}

            </div>

          </motion.div>

        </div>

        {/* Quick Actions */}

        <motion.div

          className="dashboard-card"

          initial={{
            opacity: 0,
          }}

          animate={{
            opacity: 1,
          }}

          transition={{
            delay: .4,
          }}

        >

          <div
            className="card-header-custom"
          >

            <h3>

              Quick Actions

            </h3>

          </div>

          <div className="action-grid">

            <button

              className="action-btn"

              onClick={() =>
                navigate(
                  "/admin/add-student"
                )
              }

            >

              <FaPlus />

              <span>
                Add Student
              </span>

            </button>

            <button

              className="action-btn"

              onClick={() =>
                navigate(
                  "/admin/students"
                )
              }

            >

              <FaUsers />

              <span>
                Manage Students
              </span>

            </button>

            <button

              className="action-btn"

              onClick={() =>
                navigate(
                  "/admin/students"
                )
              }

            >

              <FaArrowRight />

              <span>
                View Reports
              </span>

            </button>

          </div>

        </motion.div>
                {/* Footer */}

        <div className="dashboard-footer">

          <p>

            © {new Date().getFullYear()} EduPortal •
            Student Registration Portal

          </p>

        </div>

      </motion.div>

    </Layout>

  );

}

export default AdminDashboard;
