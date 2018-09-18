import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';

const snackbarStyle = {
  bottom: '15px',
};

const styles = theme => ({
  close: {
    width: '40%',
    height: theme.spacing.unit * 4,
  },
});

function ErrorSnackbar(props) {
  const { classes } = props;
  return (
    <Snackbar
      style={snackbarStyle}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={props.open}
      autoHideDuration={3000}
      onClose={props.handleClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={(
        <span id="message-id">
          {props.message}
        </span>
      )}
    />
  );
}

export default withStyles(styles)(ErrorSnackbar);
