import axios from "axios";

const API = axios.create({
  // Production Backend URL
  baseURL: "https://student-registration-portal-2goy.onrender.com/api",

  // Send HTTP-Only Cookies
  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

export default API;