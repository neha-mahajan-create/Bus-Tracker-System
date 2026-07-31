import "../styles/topbar.css";

function Topbar() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="topbar">

      <h3>
        Welcome,
        {" "}
        {user?.name || "User"} 
      </h3>

    </div>
  );
}

export default Topbar;