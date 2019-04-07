import axios from "axios";

import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST
} from "./types";

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

//Delete Post

export const deletePost = id => dispatch => {
  axios
    .delete(`/posts/${id}`)
    .then(x =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addLike = id => dispatch => {
  axios
    .post(`/posts/like/${id}`)
    .then(x => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const removeLike = id => dispatch => {
  axios
    .post(`/posts/unlike/${id}`)
    .then(x => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
