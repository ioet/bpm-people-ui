import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import PropTypes from 'prop-types';
import { ErrorSnackbarConst } from '../../constants';
import { SnackbarStyles } from '../../styles';

const ErrorSnackbar = (props) => {
  const {
    classes, open, handleClose, message,
  } = props;

  return (
    <Snackbar
      className={classes.snackbar}
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
        <span>
          {message}
        </span>
      )}
    />
  );
};

ErrorSnackbar.defaultProps = {
  message: '',
};

ErrorSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  message: PropTypes.string,
};

export default withStyles(SnackbarStyles)(ErrorSnackbar);
