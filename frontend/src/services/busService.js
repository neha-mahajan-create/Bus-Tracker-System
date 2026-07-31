import axios from "axios";

const API = "http://localhost:5001/api/buses";

export const getBuses = () => axios.get(API);

export const searchBuses = (query) =>
  axios.get(`${API}/search?query=${query}`);

export const deleteBus = (id) =>
  axios.delete(`${API}/${id}`);

export const updateBus = (id, data) =>
  axios.put(`${API}/${id}`, data);

export const addBus = (data) =>
  axios.post(`${API}/add`, data);