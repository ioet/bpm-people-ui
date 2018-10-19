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
import { getEmptyUser } from '../utils/Utils';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const DeleteDialog = (props) => {
  const { open, handleClose, users } = props;

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={(e) => {
        e.preventDefault();
        handleClose();
      }}
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
            {(users.length > 1) ? users.length + DeleteDialogConst.CONTENT_TEXT_MULTI_USER : users[0].name}
          </b>
          {DeleteDialogConst.CONTENT_TEXT_2}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleClose();
          }}
          color="primary"
        >
          {DeleteDialogConst.DISAGREE}
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleClose(users);
          }}
          color="primary"
        >
          {DeleteDialogConst.AGREE}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteDialog.defaultProps = {
  users: [getEmptyUser()],
};

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    authentication_identity: PropTypes.string.isRequired,
  })),
};

export default DeleteDialog;
