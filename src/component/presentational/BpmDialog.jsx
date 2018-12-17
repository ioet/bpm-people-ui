import React from 'react';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Button from '@material-ui/core/Button/Button';
import Slide from '@material-ui/core/Slide/Slide';
import PropTypes from 'prop-types';
import { DialogConst } from '../../constants';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const BpmDialog = (props) => {
  const {
    open, handleClose, children, dialogTitle, positiveButtonLabel,
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
        {dialogTitle}
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>

      <DialogActions>
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleClose(false);
          }}
          color="primary"
        >
          {DialogConst.CANCEL}
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleClose(true);
          }}
          color="primary"
        >
          {positiveButtonLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

BpmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  dialogTitle: PropTypes.string.isRequired,
  positiveButtonLabel: PropTypes.string.isRequired,
};

export default BpmDialog;
