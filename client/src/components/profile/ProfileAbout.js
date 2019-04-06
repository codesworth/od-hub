import React, { Component } from "react";
import Proptypes from "prop-types";
import isEmpty from "../../validation/is_Empty";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    //GET FIRST NAME
    const first = profile.user.name
      .trim()
      .split(" ")[0]
      .concat("'s");

    const skills = profile.skills.map((skill, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check">{skill}</i>
      </div>
    ));
    return (
      <div class="row">
        <div class="col-md-12">
          <div class="card card-body bg-light mb-3">
            <h3 class="text-center text-info">{first} Bio</h3>
            <p class="lead">
              {isEmpty(profile.bio) ? (
                <span>{first} does not have a bio</span>
              ) : (
                profile.bio
              )}
            </p>
            <hr />
            <h3 class="text-center text-info">Skill Set</h3>
            <div class="row">{skills}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileAbout;
