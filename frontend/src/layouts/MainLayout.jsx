import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import "../styles/dashboard.css";

function DashboardLayout({ children }) {

  return (

    <div className="dashboard-container">

      <Sidebar />

      <div className="dashboard-main">

        <Topbar />

        <div className="dashboard-content">

          {children}

        </div>

      </div>

    </div>

  );

}

export default DashboardLayout;