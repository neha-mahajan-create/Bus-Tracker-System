import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaUser, FaUserShield } from "react-icons/fa";

function RoleSelectionModal({
  show,
  handleClose,
  type,
}) {

  const navigate = useNavigate();

  const handleSelect = (role) => {

    handleClose();

    if (type === "login") {

      navigate(role === "user" ? "/login" : "/admin-login");

    } else {

      navigate(role === "user" ? "/register" : "/admin-register");

    }

  };

  return (

    <Modal
      show={show}
      onHide={handleClose}
      centered
    >

      <Modal.Header closeButton>

        <Modal.Title>

          {type === "login"
            ? "Login As"
            : "Register As"}

        </Modal.Title>

      </Modal.Header>

      <Modal.Body className="text-center">

        <Button
          variant="outline-primary"
          className="w-100 mb-3"
          onClick={() => handleSelect("user")}
        >

          <FaUser className="me-2" />

          User

        </Button>

        <Button
          variant="outline-danger"
          className="w-100"
          onClick={() => handleSelect("admin")}
        >

          <FaUserShield className="me-2" />

          Administrator

        </Button>

      </Modal.Body>

    </Modal>

  );

}

export default RoleSelectionModal;