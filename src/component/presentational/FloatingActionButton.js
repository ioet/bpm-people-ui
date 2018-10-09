/* eslint-disable react/forbid-prop-types,react/jsx-tag-spacing */
import { Add, Clear } from '@material-ui/icons';
import Button from '@material-ui/core/Button/Button';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { FabStyles } from '../../styles';

const FloatingActionButton = (props) => {
  const { classes, create, createUser } = props;

  return (
    <Button
      variant="fab"
      className={classes.fab}
      color="secondary"
      onClick={(e) => {
        e.preventDefault();
        createUser(create);
      }}
    >
      {
        (create) ? (
          <Clear/>
        ) : (
          <Add/>
        )
      }
    </Button>
  );
};

FloatingActionButton.propTypes = {
  classes: PropTypes.object.isRequired,
  create: PropTypes.bool.isRequired,
  createUser: PropTypes.func.isRequired,
};

export default withStyles(FabStyles)(FloatingActionButton);
