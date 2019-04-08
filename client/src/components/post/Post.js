import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPost } from "../../actions/postActions";
import Spinner from "../common/Spinner";
import PostItem from "../posts/PostItem";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
class Post extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    console.log(this.props);
    this.props.getPost(this.props.match.params.id);
  }
  render() {
    const { post, loading } = this.props.post;
    let content;

    if (post === null || loading || Object.keys(post).length === 0) {
      content = <Spinner />;
    } else {
      content = (
        <div>
          <PostItem post={post} showActions={false} />
          <CommentForm postID={post._id} />
          <CommentFeed postID={post._id} comments={post.comments} />
        </div>
      );
    }
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="feed" className="btn btn-light mb-3">
                Back TO Feed
              </Link>
              {content}
            </div>
          </div>
        </div>
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
