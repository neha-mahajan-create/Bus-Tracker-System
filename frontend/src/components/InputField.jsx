import { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function InputField({
  label,
  type,
  placeholder,
  value,
  onChange,
  name,
}) {

  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <Form.Group className="mb-3">

      <Form.Label>{label}</Form.Label>

      <InputGroup>

        <Form.Control
          type={
            isPassword
              ? (showPassword ? "text" : "password")
              : type
          }
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
        />

        {
          isPassword && (
            <InputGroup.Text
              style={{cursor:"pointer"}}
              onClick={() => setShowPassword(!showPassword)}
            >
              {
                showPassword
                  ? <FaEyeSlash />
                  : <FaEye />
              }
            </InputGroup.Text>
          )
        }

      </InputGroup>

    </Form.Group>
  );
}

export default InputField;