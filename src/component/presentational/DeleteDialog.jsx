/* eslint-disable react/forbid-prop-types */
import React from 'react';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Button from '@material-ui/core/Button/Button';
import Slide from '@material-ui/core/Slide/Slide';
import PropTypes from 'prop-types';
import { DeleteDialogConst } from '../../constants';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const DeleteDialog = (props) => {
  const { open, handleClose, user } = props;

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        {DeleteDialogConst.TITLE}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {DeleteDialogConst.CONTENT_TEXT_1}
          <b>
            {user.name}
          </b>
          {DeleteDialogConst.CONTENT_TEXT_2}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleClose(false);
          }}
          color="primary"
        >
          {DeleteDialogConst.DISAGREE}
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleClose(true, user);
          }}
          color="primary"
        >
          {DeleteDialogConst.AGREE}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default DeleteDialog;
