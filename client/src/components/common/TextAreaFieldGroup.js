import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TetxAreaFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange
}) => {
  return (
    <div className="form-group">
      <textarea
        className={classnames(
          "form-control form-control-lgform-control form-control-lg",
          {
            "is-invalid": { error }
          }
        )}
        placeholder={placeholder}
        name={name}
        required
        value={value}
        onChange={onChange}
      />
      {info && <small className="form-text-muted">{info}</small>}
      {error && <div className="is-invalid-feedback">{error}</div>}
    </div>
  );
};

TetxAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TetxAreaFieldGroup;
