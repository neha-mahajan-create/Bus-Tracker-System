import "../styles/services.css";

function ServiceCard({
  icon,
  title,
  description,
}) {
  return (
    <div className="service-card">

      <div className="service-icon">

        {icon}

      </div>

      <div className="service-divider"></div>

      <h3 className="service-title">

        {title}

      </h3>

      <p className="service-description">

        {description}

      </p>

      
    </div>
  );
}

export default ServiceCard;