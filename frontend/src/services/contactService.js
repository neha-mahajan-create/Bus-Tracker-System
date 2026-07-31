import axios from "axios";

const API = "http://localhost:5001/api/contact";

export const sendContactMessage = async (contactData) => {
  const response = await axios.post(API, contactData);
  return response.data;
};