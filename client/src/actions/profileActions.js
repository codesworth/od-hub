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

//Create Profile

export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/profile/", profileData)
    .then(x => history.push("/dashboard"))
    .catch(err => {
      console.log("This is the rror: " + err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Clear Profile

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT
  };
};
