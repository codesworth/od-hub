import axios from "axios";

import { ADD_POST, GET_ERRORS } from "./types";

//Add Post

export const addPost = postData => dispatch => {
  axios
    .post("/post", postData)
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
