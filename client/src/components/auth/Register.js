import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    console.log(user);
    axios
      .post("api/users/register", user)
      .then(x => console.log(x.data))
      .catch(err => this.setState({ errors: err.response.data }));
  };

  render() {
    const { name, email, password, password2, errors } = this.state;
    console.log(`Errors ${errors}`);
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames(
                      "form-control form-control-lgform-control form-control-lg",
                      {
                        "is-invalid": errors.name
                      }
                    )}
                    placeholder="Name"
                    name="name"
                    required
                    value={name}
                    onChange={this.onChange}
                  />
                  {errors.name && (
                    <div className="is-invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames(
                      "form-control form-control-lgform-control form-control-lg",
                      {
                        "is-invalid": errors.email
                      }
                    )}
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className="is-invalid-feedback">{errors.email}</div>
                  )}
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames(
                      "form-control form-control-lgform-control form-control-lg",
                      {
                        "is-invalid": errors.password
                      }
                    )}
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="is-invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames(
                      "form-control form-control-lgform-control form-control-lg",
                      {
                        "is-invalid": errors.password2
                      }
                    )}
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2}
                    onChange={this.onChange}
                  />
                  {errors.password2 && (
                    <div className="is-invalid-feedback">
                      {errors.password2}
                    </div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
