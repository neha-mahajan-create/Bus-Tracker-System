import axios from "axios";

const API = "https://bus-tracker-system.onrender.com/api/contact";

export const sendContactMessage = async (contactData) => {
  const response = await axios.post(API, contactData);
  return response.data;
};