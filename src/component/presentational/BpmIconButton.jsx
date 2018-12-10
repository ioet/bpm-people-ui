import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import withStyles from '@material-ui/core/styles/withStyles';
import { TooltipConst } from '../../constants';
import { BpmIconButtonStyles } from '../../styles';

const BpmIconButton = (props) => {
  const {
    classes, userId, onClickCallback, icon, tooltip, hover, hoverId,
  } = props;
  const showItem = (hover && hoverId === userId) ? classes.show : classes.hide;

  return (
    <div>
      <Tooltip
        title={tooltip}
        placement="left"
        enterDelay={TooltipConst.ENTER_DELAY}
        leaveDelay={TooltipConst.LEAVE_DELAY}
      >
        <IconButton
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            onClickCallback(userId);
          }}
          className={showItem}
        >
          {icon}
        </IconButton>
      </Tooltip>
    </div>
  );
};

BpmIconButton.defaultProps = {
  hoverId: '',
};

BpmIconButton.propTypes = {
  classes: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  onClickCallback: PropTypes.func.isRequired,
  icon: PropTypes.element.isRequired,
  tooltip: PropTypes.string.isRequired,
  hover: PropTypes.bool.isRequired,
  hoverId: PropTypes.string,
};

export default withStyles(BpmIconButtonStyles)(BpmIconButton);
