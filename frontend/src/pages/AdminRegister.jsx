import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import { registerAdmin } from "../services/authService";

import "../styles/auth.css";

function AdminRegister() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    adminSecret: "",
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

      const response = await registerAdmin(form);

      alert(response.data.message);

      navigate("/admin-login");

    } catch (err) {

      alert(err.response?.data?.message || "Registration Failed");

    }

  };

  return (

    <AuthLayout
      title="Administrator Registration"
      subtitle="Create a New Administrator Account"
    >

      <Form onSubmit={handleSubmit}>

        <InputField
          label="Name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter Full Name"
        />

        <InputField
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter Email"
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter Password"
        />

        <InputField
          label="Admin Secret Key"
          type="password"
          name="adminSecret"
          value={form.adminSecret}
          onChange={handleChange}
          placeholder="Enter Secret Key"
        />

        <Button
          type="submit"
          className="w-100 mt-2"
        >
          Register Admin
        </Button>

      </Form>

      <div className="text-center mt-3">

        Already have an account?

        <Link to="/admin-login">
          {" "}Admin Login
        </Link>

      </div>

    </AuthLayout>

  );

}

export default AdminRegister;