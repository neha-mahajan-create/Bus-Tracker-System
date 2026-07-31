import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBus,
  FaRoute,
  FaCommentDots,
  FaSignOutAlt,
} from "react-icons/fa";
import "../styles/sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="sidebar">

      <h2 className="logo">
        🚌 BusTracker
      </h2>

      {/* Dashboard */}
      <NavLink to={user?.role === "admin" ? "/admin" : "/dashboard"}>
        <FaHome />
        Dashboard
      </NavLink>

      {/* Buses */}
<NavLink to={user?.role === "admin" ? "/buses" : "/user-buses"}>
  <FaBus />
  Buses
</NavLink>

{/* Routes */}
<NavLink to={user?.role === "admin" ? "/routes" : "/user-routes"}>
  <FaRoute />
  Routes
</NavLink>

      {/* Feedback Link */}
      {user?.role === "admin" ? (
        <NavLink to="/admin-feedback">
          <FaCommentDots />
          View Feedback
        </NavLink>
      ) : (
        <NavLink to="/feedback">
          <FaCommentDots />
          Feedback
        </NavLink>
      )}

      {/* Logout */}
      <button
        className="logout-btn"
        onClick={logout}
      >
        <FaSignOutAlt />
        Logout
      </button>

    </div>
  );
}

export default Sidebar;