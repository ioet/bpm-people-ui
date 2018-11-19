import React from 'react';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Button from '@material-ui/core/Button/Button';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide/Slide';
import PropTypes from 'prop-types';
import { PasswordDialogConst, Variable } from '../../constants';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const PasswordDialog = (props) => {
  const {
    open, inputError, password, passwordConfirm, handleClose, onChange,
  } = props;

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={(e) => {
        e.preventDefault();
        handleClose(false);
      }}
    >
      <DialogTitle>
        {PasswordDialogConst.TITLE}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {PasswordDialogConst.EXPLANATION}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          name={Variable.PASSWORD}
          label={PasswordDialogConst.PASSWORD}
          value={password}
          type="password"
          onChange={
            (e) => {
              e.preventDefault();
              onChange(e);
            }
          }
          fullWidth
        />
        <form onSubmit={(e) => {
          e.preventDefault();
          handleClose(true);
        }}
        >
          <TextField
            error={inputError}
            margin="dense"
            name={Variable.PASSWORD_CONFIRM}
            label={PasswordDialogConst.CONFIRM_PASSWORD}
            value={passwordConfirm}
            type="password"
            onChange={
              (e) => {
                e.preventDefault();
                onChange(e);
              }
            }
            fullWidth
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleClose(false);
          }}
          color="primary"
        >
          {PasswordDialogConst.CANCEL}
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleClose(true);
          }}
          color="primary"
        >
          {PasswordDialogConst.CREATE}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

PasswordDialog.defaultProps = {
  inputError: false,
  password: '',
  passwordConfirm: '',
};

PasswordDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  inputError: PropTypes.bool,
  password: PropTypes.string,
  passwordConfirm: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PasswordDialog;
