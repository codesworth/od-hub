import axios from "axios";

const setAuthtoken = token => {
  if (token) {
    //Apply yo every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthtoken;
