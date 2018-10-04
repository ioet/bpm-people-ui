/* eslint-disable react/prop-types */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import { ErrorSnackbarConst } from '../../constants';

const snackbarStyle = {
  bottom: '15px',
};

const styles = theme => ({
  close: {
    width: ErrorSnackbarConst.WIDTH,
    height: theme.spacing.unit * 4,
  },
});

const ErrorSnackbar = (props) => {
  const { open, handleClose, message } = props;

  return (<Snackbar
    style={snackbarStyle}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    open={open}
    autoHideDuration={ErrorSnackbarConst.AUTO_HIDE_DURATION}
    onClose={handleClose}
    ContentProps={{
      'aria-describedby': 'message-id',
    }}
    message={(
      <span id="message-id">
        {message}
      </span>
      )}
  />
  );
};

export default withStyles(styles)(ErrorSnackbar);
