import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const MyTextField = (props) => {
  const {
    autoFocus, name, label, value, error, helperText, type, onChange,
  } = props;

  return (
    <TextField
      autoFocus={autoFocus}
      margin="dense"
      name={name}
      label={label}
      value={value}
      error={error}
      helperText={helperText}
      type={type}
      onChange={
        (e) => {
          e.preventDefault();
          onChange(e);
        }
      }
      fullWidth
    />
  );
};

MyTextField.defaultProps = {
  autoFocus: false,
  error: false,
  helperText: '',
  type: undefined,
};

MyTextField.propTypes = {
  autoFocus: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default MyTextField;
