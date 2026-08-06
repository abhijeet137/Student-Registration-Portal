import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";

import Students from "./pages/students";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";

import EditProfile from "./pages/EditProfile";
import StudentProfile from "./pages/StudentProfile";
import ChangePassword from "./pages/ChangePassword";
import About from "./pages/About";

import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/students"
          element={
            <ProtectedRoute role="admin">
              <Students />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-student"
          element={
            <ProtectedRoute role="admin">
              <AddStudent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/edit-student/:id"
          element={
            <ProtectedRoute role="admin">
              <EditStudent />
            </ProtectedRoute>
          }
        />

        {/* Student Routes */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/profile"
          element={
            <ProtectedRoute role="student">
              <StudentProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/edit-profile"
          element={
            <ProtectedRoute role="student">
              <EditProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/change-password"
          element={
            <ProtectedRoute role="student">
              <ChangePassword />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/about"
          element={
            <ProtectedRoute role="student">
              <About />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;