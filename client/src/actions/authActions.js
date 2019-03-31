import { GET_ERRORS } from "./types";
import axios from "axios";
import setAuthToken from "../Utils/SetAuthToken";

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("api/users/register", userData)
    .then(x => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login Current user

export const loginUser = userData => dispatch => {
  axios
    .post("/api/user/login", userData)
    .then(result => {
      //SSave to local storage
      const { token } = result.data;

      //Set Token to localStorage
      localStorage.setItem("jwt_token", token);

      //Set Token TO Auth Header

      setAuthToken(token);
    })
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};
