import axios from "axios";

const API = "http://localhost:5001/api/users";

export const getUsers = () =>
  axios.get(API);

export const searchUsers = (query) =>
  axios.get(`${API}/search?query=${query}`);