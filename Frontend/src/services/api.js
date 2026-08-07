import axios from "axios";


// ======================================
// Axios Instance
// ======================================

const API = axios.create({

  baseURL:
    "https://student-registration-portal-2goy.onrender.com/api",

  headers: {

    "Content-Type": "application/json",

  },

  // Required for cookies/JWT sessions

  withCredentials: true,

});





// ======================================
// Add JWT Token Automatically
// ======================================

API.interceptors.request.use(

  (config) => {


    const token =
      localStorage.getItem("token");



    if (token) {


      config.headers.Authorization =
        `Bearer ${token}`;


    }



    return config;


  },


  (error) => {


    return Promise.reject(error);


  }

);






// ======================================
// Global Error Handling
// ======================================

API.interceptors.response.use(


  (response) => {


    return response;


  },


  (error) => {


    if (

      error.response &&

      error.response.status === 401

    ) {


      localStorage.removeItem(
        "token"
      );


      localStorage.removeItem(
        "user"
      );


    }



    return Promise.reject(error);


  }


);





export default API;