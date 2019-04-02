import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextFeildGroup = ({
  name,
  placeholder,
  value,
  lable,
  error,
  info,
  type,
  onChange,
  disabled
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
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
        disabled={disabled}
      />
      {info && <small className="form-text-muted">{info}</small>}
      {error && <div className="is-invalid-feedback">{error}</div>}
    </div>
  );
};

TextFeildGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

TextFeildGroup.defaultProps = {
  type: "text"
};

export default TextFeildGroup;
