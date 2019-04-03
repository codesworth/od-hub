import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateROute = function PrivateRoute({
  component: Component,
  auth,
  ...rest
}) {
  return <div />;
};

PrivateROute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = {
  auth: state.auth
};

export default connect(mapStateToProps)(PrivateROute);
