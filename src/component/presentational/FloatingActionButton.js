/* eslint-disable react/forbid-prop-types,react/jsx-tag-spacing */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button/Button';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import { withStyles } from '@material-ui/core';
import { Add, Clear } from '@material-ui/icons';
import { FabStyles } from '../../styles';
import { FloatingActionButtonConst, TooltipConst } from '../../constants';

const FloatingActionButton = (props) => {
  const { classes, create, createUser } = props;

  return (
    <Tooltip
      title={
        (create) ? (
          FloatingActionButtonConst.TOOLTIP_DISCARD
        ) : (
          FloatingActionButtonConst.TOOLTIP_ADD
        )
      }
      placement="left-start"
      enterDelay={TooltipConst.ENTER_DELAY}
      leaveDelay={TooltipConst.LEAVE_DELAY}
    >
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
    </Tooltip>
  );
};

FloatingActionButton.propTypes = {
  classes: PropTypes.object.isRequired,
  create: PropTypes.bool.isRequired,
  createUser: PropTypes.func.isRequired,
};

export default withStyles(FabStyles)(FloatingActionButton);
