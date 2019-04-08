const validator = require("validator");
const isEmpty = require("../validation/is_Empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (
    !validator.isLength(data.handle, {
      max: 40,
      min: 2
    })
  ) {
    errors.handle = "Handle should be between 2 and 40 charatcers";
  }

  if (validator.isEmpty(data.handle)) {
    errors.handle = "Handle is required";
  }

  if (validator.isEmpty(data.status)) {
    errors.status = "Status is required";
  }

  if (validator.isEmpty(data.skills)) {
    errors.skills = "Skills is required";
  }

  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = "Not a valid url";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid url";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid url";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid url";
    }
  }

  if (!isEmpty(data.linkedIn)) {
    if (!validator.isURL(data.linkedIn)) {
      errors.linkedIn = "Not a valid url";
    }
  }

  if (!isEmpty(data.insatgram)) {
    if (!validator.isURL(data.insatgram)) {
      errors.insatgram = "Not a valid url";
    }
  }

  return {
    errors,
    isvalid: isEmpty(errors)
  };
};
