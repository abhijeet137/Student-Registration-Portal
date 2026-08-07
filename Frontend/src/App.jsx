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
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import ManageAdmins from "./pages/ManageAdmins";


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


{/* ======================
    PUBLIC ROUTES
====================== */}


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





{/* ======================
    ADMIN + SUPERADMIN
====================== */}



<Route

path="/admin/dashboard"

element={

<ProtectedRoute role={["admin","superadmin"]}>

<AdminDashboard />

</ProtectedRoute>

}

/>





<Route

path="/admin/students"

element={

<ProtectedRoute role={["admin","superadmin"]}>

<Students />

</ProtectedRoute>

}

/>





<Route

path="/admin/add-student"

element={

<ProtectedRoute role={["admin","superadmin"]}>

<AddStudent />

</ProtectedRoute>

}

/>





<Route

path="/admin/edit-student/:id"

element={

<ProtectedRoute role={["admin","superadmin"]}>

<EditStudent />

</ProtectedRoute>

}

/>






{/* ONLY SUPERADMIN */}



<Route

path="/admin/manage-admins"

element={

<ProtectedRoute role={["superadmin"]}>

<ManageAdmins />

</ProtectedRoute>

}

/>







{/* ======================
    STUDENT ROUTES
====================== */}



<Route

path="/student/dashboard"

element={

<ProtectedRoute role={["student"]}>

<StudentDashboard />

</ProtectedRoute>

}

/>





<Route

path="/student/profile"

element={

<ProtectedRoute role={["student"]}>

<StudentProfile />

</ProtectedRoute>

}

/>





<Route

path="/student/edit-profile"

element={

<ProtectedRoute role={["student"]}>

<EditProfile />

</ProtectedRoute>

}

/>





<Route

path="/student/change-password"

element={

<ProtectedRoute role={["student"]}>

<ChangePassword />

</ProtectedRoute>

}

/>





<Route

path="/student/about"

element={

<ProtectedRoute role={["student"]}>

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