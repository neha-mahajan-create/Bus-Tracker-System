import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import { adminLogin } from "../services/authService";
import "../styles/auth.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await adminLogin(form);

      // Save JWT Token
      localStorage.setItem("token", response.data.token);

      // Optional: Save user details
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert("Login Successful");

      navigate("/admin");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <AuthLayout
      title="Administrater Login!"
      subtitle="Login to continue"
    >
      <Form onSubmit={handleSubmit}>
        <InputField
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />

        <Button
          type="submit"
          className="w-100 mt-2"
        >
           Admin Login
        </Button>
      </Form>

      <div className="text-center mt-3">
        Don't have an account?{" "}
        <Link to="/register">
          Register
        </Link>
      </div>
    </AuthLayout>
  );
}

export default AdminLogin;