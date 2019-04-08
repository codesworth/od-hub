import axios from "axios";

import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST,
  GET_POST,
  CLEAR_ERRORS
} from "./types";

//Add Post

export const addComment = (postID, newComment) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`api/posts/comment/${postID}`, newComment)
    .then(x =>
      dispatch({
        type: GET_POST,
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

export const addPost = postData => dispatch => {
  axios
    .post("api/posts", postData)
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
    .get("api/posts")
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

export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`api/posts/${id}`)
    .then(x =>
      dispatch({
        type: GET_POST,
        payload: x.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
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
    .delete(`api/posts/${id}`)
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
    .post(`api/posts/like/${id}`)
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
    .post(`api/posts/unlike/${id}`)
    .then(x => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteComment = (postID, commentID) => dispatch => {
  axios
    .delete(`api/posts/comment/${postID}/${commentID}`)
    .then(x =>
      dispatch({
        type: GET_POST,
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

//Clear Errrors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
