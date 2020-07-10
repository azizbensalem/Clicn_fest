import axios from "axios";
import authHeader from "./AuthHeader";

const register = (firstName, lastName, username, email, password) => {
  return axios.post("http://localhost:56407/api/Users/adduser", {
      firstName: firstName,
      lastName: lastName,
      userName: username,
      email: email,
      password: password,
    });
};

const login = (username, password) => {
    return axios
      .post("http://localhost:56407/api/Users/authenticate", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
};

const logout = () => {
    localStorage.clear();
};

const getCurrentUser = () => {
   return axios.get('http://localhost:56407/api/Users/getcurrentuser', { headers: authHeader() })
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    })
};

export default {
    register,
    login,
    logout,
    getCurrentUser,
};