import "../styles/dashboard.css";

function DashboardCard({
  title,
  value,
  icon,
  color,
  children,
}) {

  // Check if value is a number
  const isNumber =
    !isNaN(value) && value !== null && value !== undefined;

  return (

    <div
      className="dashboard-card"
      style={{ borderLeft: `5px solid ${color}` }}
    >

      <div>

        <h5>{title}</h5>

        {children ? (

          <div>{children}</div>

        ) : (

          <h2
            style={{
              fontSize: isNumber ? "32px" : "22px",
              fontWeight: "600",
              wordBreak: "break-word",
            }}
          >
            {value}
          </h2>

        )}

      </div>

      <div className="dashboard-icon">

        {icon}

      </div>

    </div>

  );

}

export default DashboardCard;