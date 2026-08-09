import axios from "axios";

const API = "https://bus-tracker-system.onrender.com/api/journeys";

export const getRoutes = () =>
  axios.get(API);

export const searchRoutes = (query) =>
  axios.get(`${API}/search?query=${query}`);

export const addRoute = (data) =>
  axios.post(`${API}/add`, data);

export const updateRoute = (id, data) =>
  axios.put(`${API}/${id}`, data);

export const deleteRoute = (id) =>
  axios.delete(`${API}/${id}`);