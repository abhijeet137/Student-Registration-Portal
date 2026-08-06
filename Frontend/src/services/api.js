import axios from "axios";

const API = axios.create({
  baseURL: "https://student-registration-portal-2goy.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;