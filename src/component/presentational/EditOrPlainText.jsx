/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField/TextField';

const EditOrPlainText = (props) => {
  const {
    value, editId, user, inputError, onUserEdit, onChange, name, label,
  } = props;

  return (
    (editId === user.id)
      ? (
        <form onSubmit={(e) => {
          e.preventDefault();
          onUserEdit(user);
        }}
        >
          <TextField
            error={inputError}
            name={name}
            defaultValue={value}
            label={label}
            id="mui-theme-provider-input"
            onChange={
              (e) => {
                e.preventDefault();
                onChange(e, editId);
              }
            }
          />
        </form>
      ) : (
        value
      )
  );
};

EditOrPlainText.defaultProps = {
  inputError: false,
};

EditOrPlainText.propTypes = {
  value: PropTypes.string.isRequired,
  editId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  inputError: PropTypes.bool,
  onUserEdit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default EditOrPlainText;
