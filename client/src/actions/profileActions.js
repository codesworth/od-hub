import axios from "axios";
import {
  GET_ERRORS,
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT
} from "./types";

//GET CUrrent profilr

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfilelaoding());
  axios
    .get("/profile")
    .then(response =>
      dispatch({
        type: GET_PROFILE,
        payload: response.data
      })
    )
    .catch(error => {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    });
};

//Prodiel loading

export const setProfilelaoding = () => {
  return {
    type: PROFILE_LOADING
  };
};

//Clear Profile

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT
  };
};
