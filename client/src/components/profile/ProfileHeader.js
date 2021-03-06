import React, { Component } from "react";
import isEmpty from "../../validation/is_Empty";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={profile.user.avatar}
                  alt=""
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.name}</h1>
              <p className="lead text-center">
                {profile.status}{" "}
                {isEmpty(profile.company) ? null : (
                  <span>at {profile.company}</span>
                )}
              </p>
              {isEmpty(profile.location) ? null : <p>{profile.location}</p>}
              <p>
                {isEmpty(profile.website) ? null : (
                  <a
                    className="text-white p-2"
                    href={
                      profile.website.startsWith("http")
                        ? profile.website
                        : "http://".concat(profile.website)
                    }
                    target="_blank"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}
                {isEmpty(profile.social && profile.social.twitter) ? null : (
                  <a
                    className="text-white p-2"
                    href={
                      profile.social.twitter.startsWith("http")
                        ? profile.social.twitter
                        : "http://".concat(profile.social.twitter)
                    }
                    target="_blank"
                  >
                    <i className="fab fa-twitter fa-2x" />
                  </a>
                )}
                {isEmpty(profile.social && profile.social.facebook) ? null : (
                  <a
                    className="text-white p-2"
                    href={
                      profile.social.facebook.startsWith("http")
                        ? profile.social.facebook
                        : "http://".concat(profile.social.facebook)
                    }
                    target="_blank"
                  >
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                )}
                {isEmpty(profile.social && profile.social.linkedin) ? null : (
                  <a
                    className="text-white p-2"
                    href={
                      profile.social.linkedin.startsWith("http")
                        ? profile.social.linkedin
                        : "http://".concat(profile.social.linkedin)
                    }
                    target="_blank"
                  >
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                )}
                {isEmpty(profile.social && profile.social.youtube) ? null : (
                  <a
                    className="text-white p-2"
                    href={
                      profile.social.youtube.startsWith("http")
                        ? profile.social.youtube
                        : "http://".concat(profile.social.youtube)
                    }
                    target="_blank"
                  >
                    <i className="fab fa-youtube fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.instagram) ? null : (
                  <a
                    className="text-white p-2"
                    href={
                      profile.social.instagram.startsWith("http")
                        ? profile.social.instagram
                        : "http://".concat(profile.social.instagram)
                    }
                    target="_blank"
                  >
                    <i className="fab fa-instagram fa-2x" />
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
