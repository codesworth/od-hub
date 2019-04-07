import React, { Component } from "react";
import { connect } from "react-redux";
import PostFrom from "./PostForm";
import Spinner from "../common/Spinner";

class Posts extends Component {
  render() {
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostFrom />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Posts; //connect(null,{})()
