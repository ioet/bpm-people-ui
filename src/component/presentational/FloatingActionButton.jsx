import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button/Button';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import { withStyles } from '@material-ui/core';
import { FabStyles } from '../../styles';
import { TooltipConst } from '../../constants';

const FloatingActionButton = (props) => {
  const {
    classes, tooltip, icon, createUser,
  } = props;

  return (
    <Tooltip
      title={tooltip}
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
          createUser();
        }}
      >
        {icon}
      </Button>
    </Tooltip>
  );
};

FloatingActionButton.propTypes = {
  classes: PropTypes.object.isRequired,
  tooltip: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  createUser: PropTypes.func.isRequired,
};

export default withStyles(FabStyles)(FloatingActionButton);
