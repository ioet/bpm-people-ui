import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField/TextField';

const EditOrPlainText = (props) => {
  const {
    value, editId, userId, inputError, onUserEdit, onChange, name, label, autoFocus,
  } = props;

  return (
    (editId === userId)
      ? (
        <form onSubmit={(e) => {
          e.preventDefault();
          onUserEdit();
        }}
        >
          <TextField
            autoFocus={autoFocus}
            error={inputError}
            name={name}
            defaultValue={value}
            label={label}
            onChange={
              (e) => {
                e.preventDefault();
                onChange(e);
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
  editId: undefined,
  autoFocus: false,
};

EditOrPlainText.propTypes = {
  value: PropTypes.string.isRequired,
  editId: PropTypes.string,
  userId: PropTypes.string.isRequired,
  inputError: PropTypes.bool,
  onUserEdit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool,
};

export default EditOrPlainText;
