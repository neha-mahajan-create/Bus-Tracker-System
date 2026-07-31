import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import Feedback from "./pages/Feedback";
import AdminFeedback from "./pages/AdminFeedback";
import BusManagement from "./pages/BusManagement";
import RouteManagement from "./pages/RouteManagement";
import UserManagement from "./pages/UserManagement";
import UserBuses from "./pages/userBuses";
import UserRoutes from "./pages/userRoutes";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import DriverLogin from "./pages/DriverLogin";
import DriverTracking from "./pages/DriverTracking";
function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/admin-login" element={<AdminLogin />} />

        <Route path="/services" element={<Services />} />

        <Route path="/contact" element={<Contact />} />

        <Route
        path="/admin-register" element={<AdminRegister />}
       />
       <Route
         path="/driver-tracking"
         element={<DriverTracking />}
        />
       <Route
        path="/driver-login"
        element={<DriverLogin />}
       />
        
        <Route
         path="/routes"
         element={<RouteManagement />}
        />

        <Route
        path="/users"
        element={<UserManagement />}
        />
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
         path="/admin"
          element={
           <ProtectedRoute>
          <AdminDashboard />
          </ProtectedRoute>
        }
       />

       <Route
       path="/admin-feedback"
        element={
        <ProtectedRoute>
         <AdminFeedback />
        </ProtectedRoute>
        }
       />

        {/* Temporary Dashboard Pages */}
        <Route
          path="/buses"
          element={
            <ProtectedRoute>
                <BusManagement />
            </ProtectedRoute>
          }
        />

        

        <Route
        path="/feedback"
        element={
          <ProtectedRoute>
         <Feedback />
        </ProtectedRoute>
        }
         />

        <Route
  path="/user-buses"
  element={
    <ProtectedRoute>
      <UserBuses />
    </ProtectedRoute>
  }
/>

<Route
  path="/user-routes"
  element={
    <ProtectedRoute>
      <UserRoutes />
    </ProtectedRoute>
  }
/>
        

      </Routes>
    </Router>
  );
}

export default App;