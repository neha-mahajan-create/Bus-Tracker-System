import axios from "axios";

const API = "https://bus-tracker-system.onrender.com/api/users";

export const getUsers = () =>
  axios.get(API);

export const searchUsers = (query) =>
  axios.get(`${API}/search?query=${query}`);