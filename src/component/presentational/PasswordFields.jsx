import React from 'react';
import PropTypes from 'prop-types';
import BpmTextFieldContainer from '../container/BpmTextFieldContainer';
import { CreateUserDialogConst, Variable } from '../../constants';

const PasswordFields = (props) => {
  const {
    password, passwordConfirm, handleClose,
  } = props;

  return (
    <div>
      <BpmTextFieldContainer
        name={Variable.PASSWORD}
        label={CreateUserDialogConst.PASSWORD}
        value={password}
        type="password"
      />
      <form onSubmit={(e) => {
        e.preventDefault();
        handleClose(true);
      }}
      >
        <BpmTextFieldContainer
          name={Variable.PASSWORD_CONFIRM}
          label={CreateUserDialogConst.CONFIRM_PASSWORD}
          value={passwordConfirm}
          helperText={CreateUserDialogConst.PASSWORD_HELP}
          type="password"
        />
      </form>
    </div>
  );
};

PasswordFields.defaultProps = {
  password: '',
  passwordConfirm: '',
};

PasswordFields.propTypes = {
  password: PropTypes.string,
  passwordConfirm: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
};

export default PasswordFields;
