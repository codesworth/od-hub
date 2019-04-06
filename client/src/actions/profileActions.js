import axios from "axios";
import {
  GET_ERRORS,
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT,
  SET_CURRENT_USER,
  GET_PROFILES
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

//getProfileByHandle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfilelaoding());
  axios
    .get(`profile/handle/${handle}`)
    .then(response =>
      dispatch({
        type: GET_PROFILE,
        payload: response.data
      })
    )
    .catch(error => {
      dispatch({
        type: GET_PROFILE,
        payload: null
      });
    });
};

//Prodiel loading

export const setProfilelaoding = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const getProfiles = () => dispatch => {
  dispatch(setProfilelaoding());

  axios
    .get("/profile/all")
    .then(x =>
      dispatch({
        type: GET_PROFILES,
        payload: x.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
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

//Add Experience

export const addExperience = (expData, history) => dispatch => {
  axios
    .post("/profile/experience", expData)
    .then(x => history.push("/dashboard"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Add Education

export const addEducation = (eduData, history) => dispatch => {
  console.log("Posting");
  axios
    .post("/profile/education", eduData)
    .then(x => history.push("/dashboard"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Delete Experience

export const deleteExperience = id => dispatch => {
  axios
    .delete(`profile/experience/${id}`)
    .then(x =>
      dispatch({
        type: GET_PROFILE,
        payload: x.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteEducation = id => dispatch => {
  axios
    .delete(`profile/education/${id}`)
    .then(x =>
      dispatch({
        type: GET_PROFILE,
        payload: x.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Delete Account and Profie

export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This cannot be undone")) {
    axios
      .delete("/profile")
      .then(x =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  }
};
