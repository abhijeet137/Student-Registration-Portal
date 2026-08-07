import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./styles/theme.css";


// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


// Toastify
import "react-toastify/dist/ReactToastify.css";

import {
  ToastContainer
} from "react-toastify";



ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>


    <App />


    <ToastContainer

      position="top-right"

      autoClose={3000}

      theme="colored"

      newestOnTop

    />


  </React.StrictMode>

);