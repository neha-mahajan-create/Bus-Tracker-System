import { Card } from "react-bootstrap";

function FeatureCard({ icon, title, text }) {
  return (
    <Card className="shadow border-0 h-100">

      <Card.Body className="text-center">

        <h1>{icon}</h1>

        <h4>{title}</h4>

        <p>{text}</p>

      </Card.Body>

    </Card>
  );
}

export default FeatureCard;