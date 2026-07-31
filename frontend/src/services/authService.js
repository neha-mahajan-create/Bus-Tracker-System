import axios from "axios";

const API = "http://localhost:5001/api/auth";

// Register
export const registerUser = (userData) => {
  return axios.post(`${API}/register`, userData);
};

// User Login
export const loginUser = (userData) => {
  return axios.post(`${API}/login`, userData);
};

// Admin Login
export const adminLogin = (userData) => {
  return axios.post(`${API}/admin-login`, userData);
};

export const registerAdmin = (userData) => {
    return axios.post(`${API}/admin-register`, userData);
};