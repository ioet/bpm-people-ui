import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import withStyles from '@material-ui/core/styles/withStyles';
import { TooltipConst } from '../../constants';
import { MyIconButtonStyles } from '../../styles';

const MyIconButton = (props) => {
  const {
    classes, user, onClickCallback, icon, tooltip, hover, hoverId,
  } = props;
  const showItem = (hover && hoverId === user.id) ? classes.show : classes.hide;

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
            onClickCallback(user);
          }}
          className={showItem}
        >
          {icon}
        </IconButton>
      </Tooltip>
    </div>
  );
};

MyIconButton.defaultProps = {
  hoverId: '',
};

MyIconButton.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    authentication_identity: PropTypes.string.isRequired,
  }).isRequired,
  onClickCallback: PropTypes.func.isRequired,
  icon: PropTypes.element.isRequired,
  tooltip: PropTypes.string.isRequired,
  hover: PropTypes.bool.isRequired,
  hoverId: PropTypes.string,
};

export default withStyles(MyIconButtonStyles)(MyIconButton);
