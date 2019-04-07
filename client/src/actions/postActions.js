import axios from "axios";

import { ADD_POST, GET_ERRORS, GET_POSTS, POST_LOADING } from "./types";

//Add Post

export const addPost = postData => dispatch => {
  axios
    .post("/posts", postData)
    .then(x =>
      dispatch({
        type: ADD_POST,
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

export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/posts")
    .then(x =>
      dispatch({
        type: GET_POSTS,
        payload: x.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

//SET LOading stte

export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
