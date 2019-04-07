import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPost } from "../../actions/postActions";
import Spinner from "../common/Spinner";
class Post extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    console.log(this.props);
    this.props.getPost(this.props.match.params.id);
  }
  render() {
    return (
      <div>
        <h1>Posts</h1>
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
