import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


// Components
import ProtectedRoute from "./components/ProtectedRoute";


// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";


// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import Students from "./pages/Students";   // FIXED HERE
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";


// Student Pages
import StudentDashboard from "./pages/StudentDashboard";
import StudentProfile from "./pages/StudentProfile";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import About from "./pages/About";


// Error Page
import NotFound from "./pages/NotFound";



function App() {


  return (

    <BrowserRouter>


      <Routes>



        {/* PUBLIC ROUTES */}


        <Route
          path="/"
          element={<Home />}
        />


        <Route
          path="/login"
          element={<Login />}
        />


        <Route
          path="/register"
          element={<Register />}
        />





        {/* ADMIN ROUTES */}


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






        {/* STUDENT ROUTES */}



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


        <Route
          path="*"
          element={<NotFound />}
        />



      </Routes>


    </BrowserRouter>

  );

}


export default App;