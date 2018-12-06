import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button/Button';
import { withStyles } from '@material-ui/core';
import { NewPersonButtonStyles } from '../../styles';
import { NewPersonButtonConst } from '../../constants';

const NewPersonButton = (props) => {
  const {
    classes, createUser,
  } = props;

  return (
    <Button
      className={classes.button}
      variant="contained"
      color="secondary"
      onClick={(e) => {
        e.preventDefault();
        createUser();
      }}
    >
      {NewPersonButtonConst.ADD_NEW_PERSON}
    </Button>
  );
};

NewPersonButton.propTypes = {
  classes: PropTypes.object.isRequired,
  createUser: PropTypes.func.isRequired,
};

export default withStyles(NewPersonButtonStyles)(NewPersonButton);
