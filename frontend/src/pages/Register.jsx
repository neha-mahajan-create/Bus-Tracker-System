import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import { registerUser } from "../services/authService";
import "../styles/auth.css";

function Register(){

const navigate=useNavigate();

const [form,setForm]=useState({
name:"",
email:"",
password:""
});

const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const handleSubmit=async(e)=>{

e.preventDefault();

try{

await registerUser(form);

alert("Registration Successful");

navigate("/login");

}

catch(err){

alert(err.response?.data?.message||"Registration Failed");

}

};

return(

<AuthLayout
title="Create Account"
subtitle="Register to continue"
>

<Form onSubmit={handleSubmit}>

<InputField
label="Full Name"
type="text"
name="name"
value={form.name}
onChange={handleChange}
placeholder="Enter Name"
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

<Button
type="submit"
className="w-100 mt-2"
>

Register

</Button>

</Form>

<div className="text-center mt-3">

Already have an account?

<Link to="/login">

 Login

</Link>

</div>

</AuthLayout>

);

}

export default Register;