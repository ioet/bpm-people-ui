import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button/Button';
import { withStyles } from '@material-ui/core';
import { BpmButtonStyles } from '../../styles';

const BpmButton = (props) => {
  const {
    classes, buttonLabel, buttonAction,
  } = props;

  return (
    <Button
      className={classes.button}
      variant="contained"
      color="secondary"
      onClick={(e) => {
        e.preventDefault();
        buttonAction();
      }}
    >
      {buttonLabel}
    </Button>
  );
};

BpmButton.propTypes = {
  classes: PropTypes.object.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  buttonAction: PropTypes.func.isRequired,
};

export default withStyles(BpmButtonStyles)(BpmButton);
